import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET: Melihat semua pengeluaran
export const getExpenses = async (req: Request, res: Response): Promise<void> => {
    try {
        const allExpenses = await prisma.expense.findMany();
        res.status(200).json(allExpenses);
    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan saat mengambil data" });
    }
}

// POST: Mencatat pengeluaran baru
export const addExpense = async (req: Request, res: Response): Promise<void> => {
    try{
        const { title, amount, category } = req.body;

        const newExpense = await prisma.expense.create({
            data: {
                title: title,
                amount: amount,
                category: category
            }
        });

        res.status(201).json({
            message: "Pengeluaran berhasil dicatat!",
            data: newExpense
        });
    } catch (error) {
        res.status(500).json({ message: "Gagal menyimpan data pengeluaran" });
    }
};

// PUT: mengubah pengeluaran
export const updateExpense = async (req: Request, res: Response): Promise<void> => {
    try{
        const { id } = req.params;
        const { title, amount, category } = req.body;
        
        const updateExpense = await prisma.expense.update({
            where: { id: id as string },
            data: {
                title: title,
                amount: amount,
                category: category
            }
        });

        res.status(200).json({
            message: "Pengeluaran berhasil diperbarui!",
            data: updateExpense
        });
    } catch (error) {
        res.status(404).json({ message: "Catatan pengeluaran tidak ditemukan atau gagal diperbarui!" });
    }
}

// DELETE: menghapus pengeluaran
export const deleteExpense = async (req: Request, res: Response): Promise<void> => {
    try{
        const { id } = req.params;

        await prisma.expense.delete({
            where: { id: id as string }
        });

        res.status(200).json({ message: "Pengeluaran berhasil dihapus!" });
    } catch (error) {
        res.status(404).json({ message: "Catatan pengeluaran tidak ditemukan atau gagal dihapus!" });
    }
}   
    