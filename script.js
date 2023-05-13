const btn = document.querySelectorAll('.btn');
const screen = document.querySelector('.scr');
const equal = document.querySelector('.equal');
const delete_btn = document.querySelector('.delete'); 
const clear = document.querySelector('.clear');

const defaultNum = 0;
const mathSymbols = ['+', '-', 'x', '÷'];
let buttonsPressed = [];
let side1 = [];
let side2 = [];
let result;
let operatorSymbol;
screen.innerHTML = "0";



const symbolIndex = (element) => {
  return buttonsPressed.includes(element) && mathSymbols.includes(element);
}
const symbolIndex2 = (element) => {
  return side2.includes(element) && mathSymbols.includes(element);
}

const operate = (symbol, element1, element2) => {
  if(symbol == "+"){
    return parseInt(element1) + parseInt(element2);
  }else if(symbol == "-"){
    return element1 - element2;
  }else if(symbol == "x"){
    return element1 * element2;
  }else if(symbol == "÷"){
    return element1 / element2;
  }
}

const clearAll = () => {
  buttonsPressed = [];
  side1 = [];
  side2 = [];
  operatorSymbol = undefined;
  screen.innerHTML = "0";
  console.clear();
}



btn.forEach(button => {
  button.addEventListener('click', () => {
    buttonsPressed.push(button.innerHTML);
    //checks if a operator is in buttonPressed
    const index = buttonsPressed.findIndex(symbolIndex);
    screen.innerHTML = buttonsPressed.join(' ');
    //checks if a operator is in buttonPressed
    if(index == -1){
      side1.push(button.innerHTML);

    }else{
      if(side1.length == 0){
        side1.push(defaultNum);
        buttonsPressed.unshift(defaultNum);
        screen.innerHTML = buttonsPressed.join(" ");
      }
      side2.push(button.innerHTML);
      const index2= buttonsPressed.findIndex(symbolIndex2);
      //checks if the operator is in side2 and removes it
      if(index2 != -1){
        operatorSymbol = side2.shift();
      }
    }
  })
});

equal.addEventListener('click', () => {
  if(side2.length == 0){
    side2.push(defaultNum);
    buttonsPressed.unshift(defaultNum);
    screen.innerHTML = buttonsPressed.join(" ");
  }
  result = operate(operatorSymbol, side1.join(''), side2.join(''));
  clearAll();
  side1.push(result);
  buttonsPressed.push(result);
  screen.innerHTML = result;
});

clear.addEventListener('click', () => {
  clearAll();
});

delete_btn.addEventListener('click', () => {
  const index = buttonsPressed.findIndex(symbolIndex);
  if(index == -1){
    side1.pop();
  }else{
    side2.pop()
  }
  buttonsPressed.pop();
  screen.innerHTML = buttonsPressed;
});
