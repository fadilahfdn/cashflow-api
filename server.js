// memanggil framework Express
const express = require('express');
const app = express();

// mengambil port dari sistem host (Render/AWS) atau default
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.json({message: "Selamat datang di API Dompet Mahasigma!"});
});

app.listen(PORT, () =>{
    console.log(`[Server]: Server berjalan di port ${PORT}`);
});