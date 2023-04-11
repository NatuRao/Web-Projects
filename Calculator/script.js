function clearScreen() {
    document.getElementById('result').value="";
}

function display(value) {
    document.getElementById('result').value += value;
}

function backSpace() {
    let value = document.getElementById('result').value;
    document.getElementById('result').value = value.slice(0, -1);
}

function calculate() {
    let x = document.getElementById('result').value;
    let y = eval(x);
    document.getElementById('result').value = y;
}