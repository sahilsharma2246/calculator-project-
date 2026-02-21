const display = document.getElementById('display');
let current = '';
let previous = '';
let operator = '';

function updateDisplay(value) {
  display.textContent = value || '0';
}

function handleNumber(num) {
  if (num === '.' && current.includes('.')) return;
  current += num;
  updateDisplay(current);
}

function handleOperator(op) {
  if (current === '' && previous === '') return;
  if (previous !== '') compute();
  operator = op;
  previous = current;
  current = '';
}

function compute() {
  if (previous === '' || current === '' || operator === '') return;
  const a = parseFloat(previous);
  const b = parseFloat(current);
  let result;

  switch (operator) {
    case 'add': result = a + b; break;
    case 'subtract': result = a - b; break;
    case 'multiply': result = a * b; break;
    case 'divide': result = a / b; break;
    default: return;
  }

  current = result.toString();
  operator = '';
  previous = '';
  updateDisplay(current);
}

function clear() {
  current = '';
  previous = '';
  operator = '';
  updateDisplay('0');
}

function backspace() {
  current = current.slice(0, -1);
  updateDisplay(current || '0');
}

document.querySelector('.buttons').addEventListener('click', e => {
  const btn = e.target;
  const action = btn.dataset.action;

  if (btn.tagName !== 'BUTTON') return;

  if (action === 'clear') clear();
  else if (action === 'backspace') backspace();
  else if (action === 'equals') compute();
  else if (['add','subtract','multiply','divide'].includes(action)) handleOperator(action);
  else if (action === 'decimal') handleNumber('.');
  else handleNumber(action);
});
