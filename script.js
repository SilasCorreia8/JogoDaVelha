const cellElements = document.querySelectorAll('[data-cell]'); //Selecionar atributo data-cell
const board = document.querySelector('[data-board]'); //Selecionar atributo data-board

let isCircleTurn;

//Começar o Jogo
const startGame = () => {
    //For of - Adicionar em cada celula um EnvetListener
    for(const cell of cellElements) {
        cell.addEventListener("click", handClick, { once: true });
    }

    isCircleTurn = false;

    board.classList.add('x');

}

//Adicionar na celula clicada
const placeMark = (cell, classToAdd) => {
    cell.classList.add(classToAdd);
}

//Mudar o Turno
const swapTurns = () => {
    isCircleTurn = !isCircleTurn;

    board.classList.remove('circle');
    board.classList.remove('x');

    if(isCircleTurn) {
        board.classList.add('circle')
    } else {
        board.classList.add('x')
    }
}

//Identificar o click
const handClick = (e) => {
    
    //Colocar marca "X" ou "O"
    const cell = e.target;
    const classToAdd = isCircleTurn ? 'circle': 'x';

    placeMark(cell, classToAdd);

    //Verificar Vitória

    //Verificar Empate

    //Mudar Símbolo X e O
    swapTurns();

}

//Inicar o Jogo
startGame();

