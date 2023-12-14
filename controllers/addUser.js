const Users = require('../models/user');
const bcrypt = require('bcrypt');




const addUser = async (req, res) => {

    function isDataValid(data) {
        if (data == undefined || data.length === 0) {
            return true;
        } else {
            return false;
        }
    }

    try {
        const Name = req.body.Name;
        const Email = req.body.Email;
        const Password = req.body.Password;

        if (isDataValid(Name) || isDataValid(Email) || isDataValid(Password)) {
            res.status(400).json({ err: 'Bad Parameters' })
        }

    
        // password Hashing
        const saltrounds = 10;
        bcrypt.hash(Password, saltrounds, async (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ msg: 'an error occurr while hashing the password' });
            }

            await Users.create({ Name, Email, Password: result });
            res.status(200).json({ msg: 'Successfully created a new user' });
        });

    } catch (error) {
        res.status(404).json({ msg: 'something went wrong' });
    }
};





    const getName = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await Users.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userName = user.Name;
    console.log('===================================================================================================',userName)

    res.status(200).json({ userName });
  } catch (error) {
    console.error('Error fetching user name:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};




module.exports = { addUser
}
