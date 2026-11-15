import { z } from 'zod';

// skema untuk pengeluaran baru / POST
export const createExpenseSchema = z.object({
    body: z.object({
        title: z
            .string({ error: 'Judul pengeluaran wajib diisi' })
            .trim()
            .min(2, 'Judul minimal terdiri dari 2 karakter')
            .max(100, 'Jumlah maksimal 100 karakter'),
        amount: z
            .number({ error: 'Nominal wajib diisi dan harus berupa angka'})
            .int('Nominal harus berupa bilangan bulat')
            .positive('Nominal pengeluaran harus lebih besar dari 0'),
        category: z
            .string({ error: 'Kategori wajib diisi' })
            .trim()
            .min(2, 'Kategori minimal terdiri dari 2 karakter')
            .max(50, 'Kategori maksimal 50 karakter'),
    }),
});

// Skema untuk memperbarui pengeluaran (PUT)
export const updateExpenseSchema = z.object({
    params: z.object({
        id: z.string().uuid('Format ID tidak valid'),
    }),
    body: createExpenseSchema.shape.body.partial().refine(
    (data) => Object.keys(data).length > 0,
    { message: 'Minimal satu field (title, amount, atau category) harus diisi untuk pembaruan' }
  ),
});

// Skema khusus validasi parameter ID untuk DELETE atau GET by ID
export const expenseIdParamSchema = z.object({
  params: z.object({
    id: z.string().uuid('Format ID tidak valid (harus UUID)'),
  }),
});

// Mengekstrak tipe TypeScript langsung dari skema Zod (DRY Principle)
export type CreateExpenseInput = z.infer<typeof createExpenseSchema>['body'];
export type UpdateExpenseInput = z.infer<typeof updateExpenseSchema>['body'];