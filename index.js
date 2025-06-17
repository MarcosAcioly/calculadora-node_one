const express = require('express');
const path = require('path');
const MathOperations = require('./src/mathOperations');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API ROUTES

// Recomendado: Substituir 'eval' por um parser matemático mais seguro (ex: mathjs)
app.post('/api/calculate', (req, res) => {
    try {
        const { expression } = req.body;
        if (!/^[\d+\-*/().\s]+$/.test(expression)) {
            throw new Error('Expressão inválida.');
        }

        const result = Function('"use strict"; return (' + expression + ')')(); // Menos perigoso que eval
        res.json({ success: true, result });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

app.post('/api/divide', (req, res) => {
    try {
        const { a, b } = req.body;
        const result = MathOperations.divide(Number(a), Number(b));
        res.json({ result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.post('/api/modulo', (req, res) => {
    try {
        const { a, b } = req.body;
        const result = MathOperations.modulo(Number(a), Number(b));
        res.json({ result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.post('/api/integer-division', (req, res) => {
    try {
        const { a, b } = req.body;
        const result = MathOperations.integerDivision(Number(a), Number(b));
        res.json({ result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.post('/api/divide-precision', (req, res) => {
    try {
        const { a, b, precision } = req.body;
        const result = MathOperations.divideWithPrecision(Number(a), Number(b), Number(precision));
        res.json({ result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.post('/api/is-prime', (req, res) => {
    try {
        const { num } = req.body;
        const result = MathOperations.isPrime(Number(num));
        res.json({ result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.post('/api/find-divisors', (req, res) => {
    try {
        const { num } = req.body;
        const result = MathOperations.findDivisors(Number(num));
        res.json({ result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.post('/api/gcd', (req, res) => {
    try {
        const { a, b } = req.body;
        const result = MathOperations.gcd(Number(a), Number(b));
        res.json({ result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.post('/api/lcm', (req, res) => {
    try {
        const { a, b } = req.body;
        const result = MathOperations.lcm(Number(a), Number(b));
        res.json({ result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.post('/api/simplify-fraction', (req, res) => {
    try {
        const { numerator, denominator } = req.body;
        const result = MathOperations.simplifyFraction(Number(numerator), Number(denominator));
        res.json({ result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.post('/api/decimal-to-fraction', (req, res) => {
    try {
        const { decimal, precision } = req.body;
        const result = MathOperations.decimalToFraction(Number(decimal), Number(precision));
        res.json({ result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Rota de saúde
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Inicia servidor
app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Calculadora rodando em http://localhost:${PORT}`);
});
