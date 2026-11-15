import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { CreateExpenseInput, UpdateExpenseInput } from '../validations/expenseValidation';

const prisma = new PrismaClient();

// GET: Melihat semua pengeluaran
export const getExpenses = async (req: Request, res: Response): Promise<void> => {
    try {
        const allExpenses = await prisma.expense.findMany({
            orderBy: { date: 'desc' },
        });
        res.status(200).json(allExpenses);
    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan saat mengambil data" });
    }
}

// POST: Mencatat pengeluaran baru
export const addExpense = async (req: Request, res: Response): Promise<void> => {
    try{
        const { title, amount, category } = req.body as CreateExpenseInput;

        const newExpense = await prisma.expense.create({
            data: {
                title,
                amount,
                category,
            },
        });

        res.status(201).json({
            message: "Pengeluaran berhasil dicatat!",
            data: newExpense,
        });
    } catch (error) {
        res.status(500).json({ message: "Gagal menyimpan data pengeluaran" });
    }
};

// PUT: mengubah pengeluaran
export const updateExpense = async (req: Request, res: Response): Promise<void> => {
    try{
        const id = req.params.id as string;
        const { title, amount, category } = req.body as UpdateExpenseInput;
        
        const updateExpense = await prisma.expense.update({
            where: { id },
            data: {
                ...(title !== undefined && { title }),
                ...(amount !== undefined && { amount }),
                ...(category !== undefined && { category }),
            },
        });

        res.status(200).json({
            message: "Pengeluaran berhasil diperbarui!",
            data: updateExpense,
        });
    } catch (error) {
        res.status(404).json({ message: "Catatan pengeluaran tidak ditemukan atau gagal diperbarui!" });
    }
}

// DELETE: menghapus pengeluaran
export const deleteExpense = async (req: Request, res: Response): Promise<void> => {
    try{
        const id = req.params.id as string;

        await prisma.expense.delete({
            where: { id },
        });

        res.status(200).json({ message: "Pengeluaran berhasil dihapus!" });
    } catch (error) {
        res.status(404).json({ message: "Catatan pengeluaran tidak ditemukan atau gagal dihapus!" });
    }
}   
    