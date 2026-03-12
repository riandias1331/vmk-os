const express = require('express');
const { getUsers, getUserById, deleteUser } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/')
  .get(protect, getUsers);

router.route('/:id')
  .get(protect, getUserById)
  .delete(protect, deleteUser);

module.exports = router;