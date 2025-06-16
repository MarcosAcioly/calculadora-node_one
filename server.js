const express = require('express');
const path = require('path');
const app = express();

const PORT = 3000;

app.use(express.static('.'));

// Rota para a pagina da Calculadora 
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'calculator.html'));
})

app.listen(PORT, () => {
    console.log(`Calculadora http://localhost:${PORT}`);
})