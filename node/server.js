const express = require('express');
const path = require('path');
const MathOperations = require('./mathOperations');

const app = express();
const port = 3000;

// Middleware para logging
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Middleware para tratamento de erros
app.use((err, req, res, next) => {
    console.error('Erro:', err);
    res.status(500).json({ error: 'Erro interno do servidor' });
});

app.use(express.json());
app.use(express.static(path.join(__dirname, '..')));

// Rota para a página principal
app.get('/', (req, res) => {
    try {
        const filePath = path.join(__dirname, '..', 'calculator.html');
        console.log('Tentando servir arquivo:', filePath);
        res.sendFile(filePath, (err) => {
            if (err) {
                console.error('Erro ao servir arquivo:', err);
                res.status(500).send('Erro ao carregar a página');
            }
        });
    } catch (error) {
        console.error('Erro na rota principal:', error);
        res.status(500).send('Erro ao carregar a página');
    }
});

// Rota para divisão básica
app.post('/api/divide', (req, res) => {
    try {
        console.log('Requisição de divisão:', req.body);
        const { a, b } = req.body;
        if (a === undefined || b === undefined) {
            throw new Error('Parâmetros inválidos');
        }
        const result = MathOperations.divide(Number(a), Number(b));
        res.json({ result });
    } catch (error) {
        console.error('Erro na divisão:', error);
        res.status(400).json({ error: error.message });
    }
});

// Rota para divisão com resto
app.post('/api/modulo', (req, res) => {
    try {
        console.log('Requisição de módulo:', req.body);
        const { a, b } = req.body;
        if (a === undefined || b === undefined) {
            throw new Error('Parâmetros inválidos');
        }
        const result = MathOperations.modulo(Number(a), Number(b));
        res.json({ result });
    } catch (error) {
        console.error('Erro no módulo:', error);
        res.status(400).json({ error: error.message });
    }
});

// Rota para divisão inteira
app.post('/api/integer-division', (req, res) => {
    try {
        console.log('Requisição de divisão inteira:', req.body);
        const { a, b } = req.body;
        if (a === undefined || b === undefined) {
            throw new Error('Parâmetros inválidos');
        }
        const result = MathOperations.integerDivision(Number(a), Number(b));
        res.json({ result });
    } catch (error) {
        console.error('Erro na divisão inteira:', error);
        res.status(400).json({ error: error.message });
    }
});

// Rota para divisão com precisão
app.post('/api/divide-precision', (req, res) => {
    try {
        console.log('Requisição de divisão com precisão:', req.body);
        const { a, b, precision } = req.body;
        if (a === undefined || b === undefined) {
            throw new Error('Parâmetros inválidos');
        }
        const result = MathOperations.divideWithPrecision(Number(a), Number(b), Number(precision));
        res.json({ result });
    } catch (error) {
        console.error('Erro na divisão com precisão:', error);
        res.status(400).json({ error: error.message });
    }
});

// Rota para verificar se um número é primo
app.post('/api/is-prime', (req, res) => {
    try {
        console.log('Requisição de verificação de primo:', req.body);
        const { num } = req.body;
        if (num === undefined) {
            throw new Error('Parâmetro inválido');
        }
        const result = MathOperations.isPrime(Number(num));
        res.json({ result });
    } catch (error) {
        console.error('Erro na verificação de primo:', error);
        res.status(400).json({ error: error.message });
    }
});

// Rota para encontrar divisores
app.post('/api/find-divisors', (req, res) => {
    try {
        console.log('Requisição de divisores:', req.body);
        const { num } = req.body;
        if (num === undefined) {
            throw new Error('Parâmetro inválido');
        }
        const result = MathOperations.findDivisors(Number(num));
        res.json({ result });
    } catch (error) {
        console.error('Erro ao encontrar divisores:', error);
        res.status(400).json({ error: error.message });
    }
});

// Rota para MDC
app.post('/api/gcd', (req, res) => {
    try {
        console.log('Requisição de MDC:', req.body);
        const { a, b } = req.body;
        if (a === undefined || b === undefined) {
            throw new Error('Parâmetros inválidos');
        }
        const result = MathOperations.gcd(Number(a), Number(b));
        res.json({ result });
    } catch (error) {
        console.error('Erro no MDC:', error);
        res.status(400).json({ error: error.message });
    }
});

// Rota para MMC
app.post('/api/lcm', (req, res) => {
    try {
        console.log('Requisição de MMC:', req.body);
        const { a, b } = req.body;
        if (a === undefined || b === undefined) {
            throw new Error('Parâmetros inválidos');
        }
        const result = MathOperations.lcm(Number(a), Number(b));
        res.json({ result });
    } catch (error) {
        console.error('Erro no MMC:', error);
        res.status(400).json({ error: error.message });
    }
});

// Rota para simplificar fração
app.post('/api/simplify-fraction', (req, res) => {
    try {
        console.log('Requisição de simplificação de fração:', req.body);
        const { numerator, denominator } = req.body;
        if (numerator === undefined || denominator === undefined) {
            throw new Error('Parâmetros inválidos');
        }
        const result = MathOperations.simplifyFraction(Number(numerator), Number(denominator));
        res.json({ result });
    } catch (error) {
        console.error('Erro na simplificação de fração:', error);
        res.status(400).json({ error: error.message });
    }
});

// Rota para converter decimal para fração
app.post('/api/decimal-to-fraction', (req, res) => {
    try {
        console.log('Requisição de conversão decimal para fração:', req.body);
        const { decimal, precision } = req.body;
        if (decimal === undefined) {
            throw new Error('Parâmetro inválido');
        }
        const result = MathOperations.decimalToFraction(Number(decimal), Number(precision));
        res.json({ result });
    } catch (error) {
        console.error('Erro na conversão decimal para fração:', error);
        res.status(400).json({ error: error.message });
    }
});

// Rota para adcao
app.post('/api/adcao', (req, res) => { // <-- AQUI! Adicione a barra (/)
    try {
        console.log('Requisição de adição:', req.body);
        const { a, b } = req.body;

        // Validação de entrada
        if (a === undefined || b === undefined) {
            throw new Error('Parâmetros "a" e "b" são obrigatórios.');
        }

        const numA = Number(a);
        const numB = Number(b);

        // Chamar a função adcao da classe MathOperations
        const result = MathOperations.adcao(numA, numB);
        res.json({ result });
    } catch (error) {
        console.error('Erro na adição:', error);
        res.status(400).json({ error: error.message }); 
    }
});
// Rota para verificar se o servidor está funcionando
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
    console.log('Diretório atual:', __dirname);
    console.log('Arquivo HTML:', path.join(__dirname, '..', 'calculator.html'));
});
