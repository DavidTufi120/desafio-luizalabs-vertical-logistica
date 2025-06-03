const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/api', (req, res) => {
    const data = req.body;
    res.json({ message: 'Dados recebidos com sucesso', data });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
}); 