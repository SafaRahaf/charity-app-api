const express = require('express');
const auth = require('../middlewares/auth');

const { getNotes, createNote, deleteNote, updateNote } = require('../controllers/noteController');

const noteRouter = express.Router();


noteRouter.get('/', auth, getNotes); 
noteRouter.post('/', auth, createNote); 
noteRouter.delete('/:id', auth, deleteNote); 
noteRouter.put('/:id', auth, updateNote); 

// Protected route
noteRouter.get('/profile', auth, (req, res) => {
  // Access the authenticated user's ID and role from req.userId and req.userRole
  res.json({ userId: req.userId, userRole: req.userRole });
});

module.exports = noteRouter;

// userRoutes.js