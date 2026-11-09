import express from 'express';
import expenseRoutes from './routes/expenseRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // penerjemah format JSON dari FE

app.use('/api/expenses', expenseRoutes);

app.get('/', (req, res) => {
    res.json({message: "Selamat datang di API Dompet Mahasigma!"});
});

app.listen(PORT, () =>{
    console.log(`[Server]: Server berjalan di port ${PORT}`);
});