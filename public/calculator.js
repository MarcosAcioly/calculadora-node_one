
class Calculator {
    constructor() {
        this.display = document.getElementById('result');
        this.currentInput = '';
        this.init();
    }

    init() {
        this.display.value = '0';
        this.addKeyboardSupport();
    }

    addKeyboardSupport() {
        document.addEventListener('keydown', (e) => {
            if ('0123456789+-*/.'.includes(e.key)) {
                this.appendToDisplay(e.key === '*' ? '×' : e.key);
            } else if (e.key === 'Enter' || e.key === '=') {
                e.preventDefault();
                this.calculate();
            } else if (e.key === 'Escape') {
                this.clearDisplay();
            } else if (e.key === 'Backspace') {
                this.backspace();
            }
        });
    }

    appendToDisplay(value) {
        if (this.display.value === '0' && value !== '.') {
            this.display.value = value;
        } else {
            this.display.value += value;
        }
        this.currentInput = this.display.value;
    }

    clearDisplay() {
        this.display.value = '0';
        this.currentInput = '';
    }

    backspace() {
        if (this.display.value.length > 1) {
            this.display.value = this.display.value.slice(0, -1);
        } else {
            this.display.value = '0';
        }
        this.currentInput = this.display.value;
    }

    async calculate() {
        if (!this.currentInput || this.currentInput === '0') return;

        try {
            const expression = this.currentInput.replace(/×/g, '*').replace(/÷/g, '/');
            
            const response = await fetch('/api/calculate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ expression })
            });

            const data = await response.json();

            if (data.success) {
                this.display.value = data.result;
                this.currentInput = data.result.toString();
            } else {
                this.display.value = 'Erro';
                setTimeout(() => this.clearDisplay(), 2000);
            }
        } catch (error) {
            this.display.value = 'Erro';
            setTimeout(() => this.clearDisplay(), 2000);
        }
    }

    async apiCall(endpoint, data) {
        try {
            const response = await fetch(`/api/${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            return result;
        } catch (error) {
            throw new Error('Erro na requisição');
        }
    }

    async checkPrime() {
        try {
            const num = parseFloat(this.display.value);
            const data = await this.apiCall('is-prime', { num });
            this.display.value = data.result ? 'É primo' : 'Não é primo';
        } catch (error) {
            this.display.value = 'Erro';
        }
    }

    async findDivisors() {
        try {
            const num = parseFloat(this.display.value);
            const data = await this.apiCall('find-divisors', { num });
            this.display.value = data.result.join(', ');
        } catch (error) {
            this.display.value = 'Erro';
        }
    }

    async calculateGCD() {
        try {
            const numbers = this.display.value.split(',');
            if (numbers.length !== 2) {
                this.display.value = 'Use: a,b';
                return;
            }
            const [a, b] = numbers.map(n => parseFloat(n.trim()));
            const data = await this.apiCall('gcd', { a, b });
            this.display.value = data.result;
        } catch (error) {
            this.display.value = 'Erro';
        }
    }

    async calculateLCM() {
        try {
            const numbers = this.display.value.split(',');
            if (numbers.length !== 2) {
                this.display.value = 'Use: a,b';
                return;
            }
            const [a, b] = numbers.map(n => parseFloat(n.trim()));
            const data = await this.apiCall('lcm', { a, b });
            this.display.value = data.result;
        } catch (error) {
            this.display.value = 'Erro';
        }
    }

    async simplifyFraction() {
        try {
            const parts = this.display.value.split('/');
            if (parts.length !== 2) {
                this.display.value = 'Use: num/den';
                return;
            }
            const [numerator, denominator] = parts.map(n => parseFloat(n.trim()));
            const data = await this.apiCall('simplify-fraction', { numerator, denominator });
            this.display.value = `${data.result.numerator}/${data.result.denominator}`;
        } catch (error) {
            this.display.value = 'Erro';
        }
    }

    async decimalToFraction() {
        try {
            const decimal = parseFloat(this.display.value);
            const data = await this.apiCall('decimal-to-fraction', { decimal });
            this.display.value = `${data.result.numerator}/${data.result.denominator}`;
        } catch (error) {
            this.display.value = 'Erro';
        }
    }
}

// Funções globais para compatibilidade com HTML
let calculator;

function appendToDisplay(value) {
    calculator.appendToDisplay(value);
}

function clearDisplay() {
    calculator.clearDisplay();
}

function backspace() {
    calculator.backspace();
}

function calculate() {
    calculator.calculate();
}

function checkPrime() {
    calculator.checkPrime();
}

function findDivisors() {
    calculator.findDivisors();
}

function calculateGCD() {
    calculator.calculateGCD();
}

function calculateLCM() {
    calculator.calculateLCM();
}

function simplifyFraction() {
    calculator.simplifyFraction();
}

function decimalToFraction() {
    calculator.decimalToFraction();
}

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    calculator = new Calculator();
});
