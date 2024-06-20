const input= document.querySelector('.modal-input');

const buttonModal = document.querySelector('.button-modal');

const buttonInit = document.querySelector('.button');

const buttonClose = document.querySelector('.modal-close');

const modal = document.querySelector('.modal');
let numeroSecreto = 36

function show () {

 modal.classList.add('ativo');
}

function Close () {
    const modal = document.querySelector('.modal');
    modal.classList.remove('ativo');
}

function game ( ) {
  const userInput = input.value;
  const numero = parseInt(userInput)
  const message = document.querySelector('p'); 
   
  if(numeroSecreto === numero){
    console.log('acertou')
    message.style.fontSize = '1.9rem';
    message.style.color = 'green'
    message.textContent =  `Você acertou o numero secreto é ${numero} `;
  }else {
    console.log('errou')
    message.textContent ='você errou tente novamente!'
    message.classList.add('successo')
    message.style.fontSize = '1.9rem';
    message.style.color = 'red'
  }
 
  window.onload = close()
  modal.classList.remove('ativo');

}


