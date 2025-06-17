
class CalculatorUI {
    constructor() {
        this.display = document.getElementById('result');
        this.currentInput = '';
        
    }

    initEventListeners() {
        // Event listeners para botões
        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('click', (e) => {
                this.handleButtonClick(e.target);
            });
        });

        // Event listener para teclado
        document.addEventListener('keydown', (e) => {
            this.handleKeyPress(e);
        });
    }

    handleButtonClick(button) {
        const value = button.textContent;
        
        if (button.classList.contains('number') || button.classList.contains('operator')) {
            this.appendToDisplay(value);
        } else if (button.classList.contains('equals')) {
            this.calculate();
        } else if (button.classList.contains('clear')) {
            if (value === 'C') {
                this.clearDisplay();
            } else if (value === '⌫') {
                this.backspace();
            }
        }
    }

    handleKeyPress(e) {
        const key = e.key;
        
        if ('0123456789+-*/.'.includes(key)) {
            this.appendToDisplay(key === '*' ? '×' : key);
        } else if (key === 'Enter' || key === '=') {
            e.preventDefault();
            this.calculate();
        } else if (key === 'Escape') {
            this.clearDisplay();
        } else if (key === 'Backspace') {
            this.backspace();
        }
    }

    appendToDisplay(value) {
        this.currentInput += value;
        this.display.value = this.currentInput;
    }

    clearDisplay() {
        this.currentInput = '';
        this.display.value = '';
    }

    backspace() {
        this.currentInput = this.currentInput.slice(0, -1);
        this.display.value = this.currentInput;
    }

    async calculate() {
        if (!this.currentInput) return;

        try {
            // Converte símbolos para operadores válidos
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
                this.loadHistory();
            } else {
                this.display.value = 'Erro';
                setTimeout(() => this.clearDisplay(), 2000);
            }
        } catch (error) {
            this.display.value = 'Erro';
            setTimeout(() => this.clearDisplay(), 2000);
        }
    }
}

// Inicializa a calculadora quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    new CalculatorUI();
});
