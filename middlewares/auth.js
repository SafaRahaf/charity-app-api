const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const SECRET_KEY = 'NOTESAPI';

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    // let token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'Authentication failed' });
    } 

    //  if (token) {
    //    token = token.split(' ')[1]
    //    let user = jwt.verify(token, SECRET_KEY)
    //    req.userId = user.id;}}else...
     
    const decodedData = jwt.verify(token, SECRET_KEY);
    const user = await userModel.findById(decodedData.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    req.userId = user._id;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports = auth;