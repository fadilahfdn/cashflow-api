import { Router } from 'express';
import { getExpenses, addExpense } from '../controllers/expenseController';

const router = Router();

router.get('/', getExpenses);
router.post('/', addExpense);

export default router;