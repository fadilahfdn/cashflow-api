import { Router } from 'express';
import { getExpenses, addExpense, updateExpence, deleteExpense } from '../controllers/expenseController';

const router = Router();

router.get('/', getExpenses);
router.post('/', addExpense);
router.put('/:id', updateExpence);
router.delete('/:id', deleteExpense);

export default router;