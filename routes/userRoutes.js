const express = require('express')
const {signIn, signUp} = require('../controllers/userController')
// const auth = require('../middlewares/auth');

const userRouter = express.Router()

userRouter.post('/signup', signUp )

userRouter.post('/signin', signIn)

// userRouter.get('/profile', auth, (req, res) => {
//     res.json({ userId: req.userId, userRole: req.userRole });
//   });

module.exports = userRouter