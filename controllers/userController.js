// const userModel = require('../models/userModel');

// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// const SECRET_KEY = 'NOTESAPI';

// const signUp = async (req, res) => {
//   const { username, email, password } = req.body;

//   try {
//     const existingUser = await userModel.findOne({ email: email });

//     if (existingUser) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = await userModel.create({
//       email: email,
//       username: username,
//       password: hashedPassword,
//     });

//     const token = jwt.sign({ email: newUser.email, id: newUser._id }, SECRET_KEY);

//     res.status(201).json({
//       user: newUser,
//       token: token,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: 'Something went wrong' });
//   }
// };

// const signIn = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const existingUser = await userModel.findOne({ email: email });

//     if (!existingUser) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     const isPasswordMatch = await bcrypt.compare(
//       password,
//       existingUser.password
//     );

//     if (!isPasswordMatch) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     const token = jwt.sign(
//       { email: existingUser.email, id: existingUser._id },
//       SECRET_KEY
//     );

// //helloworld

//     res.status(200).json({
//       user: existingUser,
//       token: token,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: 'Something went wrong' });
//   }
// };

// module.exports = { signIn, signUp };

const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'NOTESAPI';

const signUp = async (req, res) => {
    const { email, password, username } = req.body;

    try {
      const user = await userModel.findOne({ email: email });
  
      if (!user) {
        return res.status(400).json({ message: 'User Not Found. Please register!' });
      }
  
      const isPasswordMatch = await bcrypt.compare(password, user.password);
  
      if (!isPasswordMatch) {
        return res.status(400).json({ message: 'Password is not valid' });
      }
  
      const token = jwt.sign({ id: user._id }, SECRET_KEY);
      res.send({ user, token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Something went wrong' });
    }
};

const signIn = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await userModel.findOne({ email: email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userCreate = new userModel({
      email: email,
      username: username,
      password: hashedPassword,
    });

    await userCreate.save();

    res.send({ userCreate });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports = { signIn, signUp };


