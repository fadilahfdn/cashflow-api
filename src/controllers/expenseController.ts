import { Request, Response } from 'express';
import { expenses, Expense } from '../models/expense'

// GET: Melihat semua pengeluaran
export const getExpenses = (req: Request, res: Response) => {
    res.status(200).json(expenses);
}

// POST: Mencatat pengeluaran baru
export const addExpense = (req: Request, res: Response) => {
    const { title, amount, category } = req.body;

    const newExpense: Expense = {
        id: Date.now().toString(),
        title: title,
        amount: amount,
        category: category,
        date: new Date()
    };

    expenses.push(newExpense);

    res.status(201).json({
        message: "Pengeluaran berhasil dicatat!",
        data: newExpense
    });
};