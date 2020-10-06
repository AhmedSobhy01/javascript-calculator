class Calculator {
    constructor() {
        this.lastKeyEqual = false;
        this.clear();
    }
    clear() {
        this.prevOperand = "";
        this.currentOperand = "";
        this.updateDisplay();
    }
    del() {
        if (this.lastKeyEqual) {
            this.clear();
            this.lastKeyEqual = false;
            return;
        }
        if (this.currentOperand == "0.") {
            this.currentOperand = "";
            this.updateDisplay();
            return;
        }
        this.currentOperand = this.currentOperand.substring(0, this.currentOperand.length - 1);
        this.updateDisplay();
    }
    appendNo(number) {
        if (this.lastKeyEqual) {
            this.clear();
            this.lastKeyEqual = false;
        }
        if (number == "." && this.currentOperand.includes(".")) return;
        if (this.currentOperand == "" && number == ".") {
            this.currentOperand = "0.";
            this.updateDisplay();
            return;
        }
        this.currentOperand += number.toString();
        this.updateDisplay();
    }
    appendOper(operator) {
        if (this.prevOperand == "" && this.currentOperand == "") return;
        if (this.lastKeyEqual) {
            this.prevOperand = "";
            this.lastKeyEqual = false;
        }
        if (this.currentOperand == "" || isNaN(this.currentOperand)) {
            this.prevOperand = this.prevOperand.substring(0, this.prevOperand.length - 1) + operator;
            this.updateDisplay();
            return;
        }
        this.prevOperand += ` ${parseFloat(this.currentOperand)} ${operator}`;
        this.currentOperand = "";
        this.updateDisplay();
    }
    compute() {
        this.lastKeyEqual = true;
        if (this.currentOperand == "" || isNaN(this.currentOperand)) {
            this.prevOperand = this.prevOperand.substring(0, this.prevOperand.length - 2);
        } else {
            this.prevOperand += ` ${parseFloat(this.currentOperand)}`;
        }
        let eq = this.prevOperand.replace(/\s+/g, "").replace(/×/g, "*").replace(/÷/g, "/");
        this.currentOperand = eval(eq).toString();
        this.updateDisplay();
    }
    updateDisplay() {
        prevOperand.innerHTML = this.prevOperand.replace(/\*/g, "×").replace(/\//g, "÷");
        let parts = this.currentOperand.split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",").toString();
        currentOperand.innerHTML = parts.join(".").toString();
    }
}

const prevOperand = document.querySelector("[data-prevoperand]"),
    currentOperand = document.querySelector("[data-currentoperand]"),
    numbers = document.querySelectorAll("[data-number]"),
    operators = document.querySelectorAll("[data-operator]"),
    equalBtn = document.querySelector("[data-equal]"),
    clearBtn = document.querySelector("[data-clear]"),
    delBtn = document.querySelector("[data-del]");

const calc = new Calculator();

// Main Clicks Listenters
delBtn.addEventListener("click", () => calc.del());
clearBtn.addEventListener("click", () => calc.clear());
equalBtn.addEventListener("click", () => calc.compute());
numbers.forEach((num) => num.addEventListener("click", () => calc.appendNo(num.textContent)));
operators.forEach((oper) => oper.addEventListener("click", () => calc.appendOper(oper.textContent)));

// Main Keyboard Listener
document.addEventListener("keydown", (e) => {
    let x = document.querySelector(`[data-keycode="${e.keyCode}"]`) || document.querySelector(`[data-keycode-alt="${e.keyCode}"]`);
    x ? x.click() : false;
});
