const cellElements = document.querySelectorAll('[data-cell]'); //Selecionar atributo data-cell
const board = document.querySelector('[data-board]'); //Selecionar atributo data-board

//Variavel para Verificar Turno
let isCircleTurn;

//Variavel para Verificar Vitória
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
];

//Começar o Jogo
const startGame = () => {
    //For of - Adicionar em cada celula um EnvetListener
    for(const cell of cellElements) {
        cell.addEventListener("click", handClick, { once: true });
    }

    isCircleTurn = false;

    board.classList.add('x');

}

//Função para Verificar Vitória
const checkWin = (currentPlayer) => {
    return winningCombinations.some(combination => { //Verifica Condições
        return combination.every((index) => { //Testa todos os elementos/condições
            return cellElements[index].classList.contains(currentPlayer); //Verifica se contem determinada classe
        });
    });
} //Retorna "true" ou "false"

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
    const isWin = checkWin(classToAdd);
    if(isWin) {
        console.log("winner!");
    }
    //Verificar Empate

    //Mudar Símbolo X e O
    swapTurns();

}

//Inicar o Jogo
startGame();

