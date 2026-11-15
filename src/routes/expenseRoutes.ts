import { Router } from 'express';
import { getExpenses, addExpense, updateExpense, deleteExpense, } from '../controllers/expenseController';
import { validateRequest } from '../middlewares/validateRequest';
import { createExpenseSchema, updateExpenseSchema, expenseIdParamSchema, } from '../validations/expenseValidation'; 

const router = Router();

router.get('/', getExpenses);
router.post('/', validateRequest(createExpenseSchema), addExpense);
router.put('/:id', validateRequest(updateExpenseSchema), updateExpense);
router.delete('/:id', validateRequest(expenseIdParamSchema), deleteExpense);

export default router;