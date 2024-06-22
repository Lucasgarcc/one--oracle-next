const input= document.querySelector('.modal-input');

const buttonModal = document.querySelector('.button-modal');

const buttonInit = document.querySelector('.button');

const buttonClose = document.querySelector('.modal-close');

const modal = document.querySelector('.modal');

let numeroSecreto =  5



function show () {
 modal.classList.add('ativo');
}

function Close () {
  const modal = document.querySelector('.modal');
  modal.classList.remove('ativo');
}

function game ( ) {
  const userInput = input.value;
  const numero = parseInt(userInput);
  const message = document.querySelector('p'); 
  let tentativas = 0
  // Inicializa o contador de tentativas se não existir
  if (!game.tentativas) {
   tentativas = game.tentativas = 0; 
  }
  
  game.tentativas++; // Incrementa o contador a cada tentativa
  if(numeroSecreto === numero) {
    console.log('acertou');
    message.style.fontSize = '1.9rem';
    message.style.color = 'green';
    message.textContent =  `Você acertou! O número secreto é ${numero}. tentativas: ${game.tentativas}`;
  }else if (numero > numeroSecreto ) {
      message.style.fontSize = '1.9rem';
      message.style.color = 'orange';
      message.textContent = `Você está perto, o número é um pouco menor que ${numero}, com tentativas: ${game.tentativas} `;
      modal.classList.remove('ativo');
    }else {
    console.log('errou');
    message.textContent =`Você errou, tente novamente! Tentativas: ${game.tentativas}`;
    message.style.fontSize = '1.9rem';
    message.style.color = 'red';
  }
  tentativas++;
  modal.classList.remove('ativo');
  input.value = ''; // Limpa o campo de input após a tentativa
}

buttonModal.addEventListener('click', game)

buttonClose.addEventListener('click', Close)

buttonInit.addEventListener('click', show)

