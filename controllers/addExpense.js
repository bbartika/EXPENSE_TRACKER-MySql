const Expense=require('../models/expense');
const Users=require('../models/user');
const sequelize= require('../connections/database');

const addExpense=async(req,res)=>{
    const t=await    sequelize.transaction();  // create a new database transaction 
    function isValidData(data) {
        if (data == undefined || data.length === 0)
            return true;
        else {
            return false;
        }
        
    }
    
    try{
        const amount = req.body.Amount;                   // from here i extracts  all properties 
        const description = req.body.Description;
        const category = req.body.Category;

        if (isValidData(amount) || isValidData(description) || isValidData(category)) {
            await t.rollback();
            return res.status(400).json({ msg :'add parameters' })
        }

        const expenseValues=await Expense.create({         // here i create a new expense record in my database
            amount : amount ,
            description : description,
            category : category,
            UserId: req.user.id 
        },{transaction:t})     //  these operations should be executed within the transaction 

        const totalExpenses = req.user.totalExpenses + Number(amount);
        const [updatedRowCount] = await Users.update( 
            { totalExpenses: totalExpenses },
            { where: { id: req.user.id } ,transaction:t}
          );
          if (updatedRowCount !== 1) {
            throw new Error('user update failed');
          }
          await t.commit(); //that will be making all the changes permanent in the database.
    
    

        res.status(200).json({Success: expenseValues});      
    }
    catch(err)
    {
        console.log(err);
        await t.rollback();   //roll back the transaction if err occur
        res.status(500).json({failed: "Error Occurred"});
    }
}

module.exports={addExpense}
