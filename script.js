const cellElements = document.querySelectorAll('[data-cell]'); //Selecionar atributo data-cell
const board = document.querySelector('[data-board]'); //Selecionar atributo data-board
const winningMessage = document.querySelector('[data-winning-message]'); //Selecionar atributo data-winning-message
const winningMessageTextElement = document.querySelector('[data-winning-message-text]'); //Selecionar atributo data-winning-message-text
const restartButton = document.querySelector('[data-restart-button]'); //Selecionar atributo data-restart-button

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
    
    isCircleTurn = false; //O Jogo inicializa com o X então isCircleTurn = false
    
    //For of - Adicionar em cada celula um EnvetListener
    for(const cell of cellElements) {
        cell.classList.remove('circle');
        cell.classList.remove('x');
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    }

    setBoardHoverClass();

    winningMessage.classList.remove('show-winning-message');
}

//Finalizar o Jogo
const endGame = (isDraw) => { //Recebe o isDraw como parametro
    if(isDraw) {
        winningMessageTextElement.innerText = "Empate!";
    } else {
        winningMessageTextElement.innerText = isCircleTurn ? "O Venceu!" : "X Venceu!";
    }

    winningMessage.classList.add('show-winning-message');
}

//Função para Verificar Vitória
const checkWin = (currentPlayer) => {
    return winningCombinations.some(combination => { //Verifica Condições
        return combination.every((index) => { //Testa todos os elementos/condições
            return cellElements[index].classList.contains(currentPlayer); //Verifica se contem determinada classe
        });
    });
} //Retorna "true" ou "false"

//Função para Verificar Empate
const checkDraw = () => {
    return [... cellElements].every(cell => {
        return cell.classList.contains('x') || cell.classList.contains('circle');
    });
} //Retorna "true" ou "false"

//Adicionar na celula clicada
const placeMark = (cell, classToAdd) => {
    cell.classList.add(classToAdd);
}

//Mudar hover da classe do board
const setBoardHoverClass = () => {
    board.classList.remove('circle');
    board.classList.remove('x');

    if(isCircleTurn) {
        board.classList.add('circle')
    } else {
        board.classList.add('x')
    }
}

//Mudar o Turno
const swapTurns = () => {
    isCircleTurn = !isCircleTurn;

    setBoardHoverClass();
}

//Identificar o click
const handleClick = (e) => {
    
    //Colocar marca "X" ou "O"
    const cell = e.target;
    const classToAdd = isCircleTurn ? 'circle': 'x';

    placeMark(cell, classToAdd);
    
    //Verificar Vitória
    const isWin = checkWin(classToAdd);
    
    //Verificar Empate
    const isDraw = checkDraw();
    
    //Verificações Empate ou Vitória
    if(isWin) {
        endGame(false);
    } else if (isDraw) {
        endGame(true);
    } else {
        swapTurns(); //Mudar Símbolo X e O
    }

}

//Inicar o Jogo
startGame();

//Reiniciar o Jogo
restartButton.addEventListener('click', startGame);