import express from 'express';
import { getAllUsers, getAllUsersByFilter, getUserById, loginUser, registerUser,deleteUserById, updateCustomer  } from '../Controllers/Customer.controller.js';

const router = express.Router();

router.post('/register',registerUser);
router.post('/login', loginUser);
router.get('/users',getAllUsers);
router.get('/users/:id',getUserById);
router.get('/search',getAllUsersByFilter);
router.delete('/users/:id', deleteUserById);
router.put("/:id",updateCustomer);

export default router;