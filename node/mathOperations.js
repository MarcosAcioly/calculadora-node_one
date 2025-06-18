// Funções avançadas de divisão
class MathOperations {
    // Divisão básica
    static divide(a, b) {
        if (b === 0) {
            throw new Error('Divisão por zero não é permitida');
        }
        return a / b;
    }

    // Divisão com resto (módulo)
    static modulo(a, b) {
        if (b === 0) {
            throw new Error('Divisão por zero não é permitida');
        }
        return a % b;
    }

    // Divisão inteira (quociente)
    static integerDivision(a, b) {
        if (b === 0) {
            throw new Error('Divisão por zero não é permitida');
        }
        return Math.floor(a / b);
    }

    // Divisão com precisão decimal
    static divideWithPrecision(a, b, precision = 2) {
        if (b === 0) {
            throw new Error('Divisão por zero não é permitida');
        }
        const result = a / b;
        return Number(result.toFixed(precision));
    }

    // Divisão com verificação de números primos
    static isPrime(num) {
        if (num <= 1) return false;
        if (num <= 3) return true;
        if (num % 2 === 0 || num % 3 === 0) return false;
        
        for (let i = 5; i * i <= num; i += 6) {
            if (num % i === 0 || num % (i + 2) === 0) return false;
        }
        return true;
    }

    // Encontrar todos os divisores de um número
    static findDivisors(num) {
        if (num === 0) return [];
        const divisors = [];
        const absNum = Math.abs(num);
        
        for (let i = 1; i <= absNum; i++) {
            if (absNum % i === 0) {
                divisors.push(i);
            }
        }
        return divisors;
    }

    // Máximo Divisor Comum (MDC)
    static gcd(a, b) {
        a = Math.abs(a);
        b = Math.abs(b);
        while (b) {
            const temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }

    // Mínimo Múltiplo Comum (MMC)
    static lcm(a, b) {
        return Math.abs(a * b) / this.gcd(a, b);
    }

    // Simplificar fração
    static simplifyFraction(numerator, denominator) {
        if (denominator === 0) {
            throw new Error('Denominador não pode ser zero');
        }
        const gcd = this.gcd(numerator, denominator);
        return {
            numerator: numerator / gcd,
            denominator: denominator / gcd
        };
    }

    // Converter decimal para fração
    static decimalToFraction(decimal, precision = 0.0001) {
        let numerator = 1;
        let denominator = 1;
        let fraction = numerator / denominator;
        
        while (Math.abs(fraction - decimal) > precision) {
            if (fraction < decimal) {
                numerator++;
            } else {
                denominator++;
            }
            fraction = numerator / denominator;
        }
        
        return this.simplifyFraction(numerator, denominator);
    }

    static adcao(a, b){
        if(a < 0 && b < 0){
            alert('Apenas valores positivos')
        } 
        return a + b;
    }
}

module.exports = MathOperations; 