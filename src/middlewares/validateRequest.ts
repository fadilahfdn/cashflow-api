import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';

export const validateRequest = (schema: z.ZodType) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Memvalidasi dan membersihkan data dari 3 pintu masuk Express
      const parsed = (await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      })) as {
        body?: Request['body'];
        query?: Request['query'];
        params?: Request['params'];
      };

      // Menimpa request mentah dengan data yang sudah bersih (misal: hasil .trim())
      if (parsed.body) req.body = parsed.body;
      if (parsed.query) req.query = parsed.query;
      if (parsed.params) req.params = parsed.params;

      // Lolos inspeksi: berikan izin lanjut ke Controller
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = error.issues.map((err) => ({
          field: err.path.slice(1).join('.'),
          message: err.message,
        }));

        res.status(400).json({
          status: 'fail',
          message: 'Validasi input gagal',
          errors: formattedErrors,
        });
        return;
      }

      res.status(500).json({
        status: 'error',
        message: 'Terjadi kesalahan internal pada server saat validasi',
      });
    }
  };
};