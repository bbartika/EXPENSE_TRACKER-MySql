const filesDownloaded=require('../model/filesDownloaded')


const s3Services=require('../services/s3services')



exports.downloadExpenses=async(req,res)=>{
    try{
        const user=req.user
    
        const expenses=await user.getExpenses()
        const stringifiedExpenses=JSON.stringify(expenses)
        const fileName=`Expense${user.id}/${new Date()}.txt`

       const fileURL= await s3Services.uploadToS3(stringifiedExpenses,fileName)

       await filesDownloaded.create({URL:fileURL,date:new Date(),userId:user.id})

       res.status(200).json({fileURL})

    }catch(err){
        res.status(500).json({fileURL:'',err:err})

    }
}
exports.getURLS=async(req,res)=>{
    try{
        console.log("hellooooooooooooooo")
        const user=req.user
        // console.log(user)
        const downloadedFiles=await  filesDownloaded.findAll({where:{userId:user.id}})
        res.status(200).json({downloadedFiles})

    }catch(err){
        res.status(500).json({err:err})
    }

}
