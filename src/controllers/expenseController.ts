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

// PUT: mengubah pengeluaran
export const updateExpence = (req: Request, res: Response): void => {
    const { id } = req.params;
    const { title, amount, category } = req.body;
    const index = expenses.findIndex(exp => exp.id === id);

    if (index === -1) {
        res.status(404).json({ message: "Catatan pengeluaran tidak ditemukan!"});
    }

    expenses[index] = {
        ...expenses[index], // pertahankan data lama (tgl dan Id)
        title: title || expenses[index].title,
        amount: amount || expenses[index].amount,
        category: category || expenses[index].category
    }

    res.status(200).json({
        message: "Pengeluaran berhasil diperbarui!",
        data: expenses[index]
    });
}

// DELETE: menghapus pengeluaran
export const deleteExpense = (req: Request, res: Response): void => {
    const { id } = req.params;
    const index = expenses.findIndex(exp => exp.id === id);

    if (index === -1) {
        res.status(404).json({ message: "Catatan pengeluaran tidak ditemukan!" });
        return;
    }

    expenses.splice(index, 1); // membuang catatan
    res.status(200).json({ message: "Pengeluaran berhasil dihapus!" });
}