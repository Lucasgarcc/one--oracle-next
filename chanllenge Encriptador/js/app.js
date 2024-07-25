const buttonCrypt = document.querySelector('.button-crypt');
const buttonDescrypt = document.querySelector('.button-descrypt');
const buttonMessage = document.querySelector('.button-message');

function blockUppercase(event) {
  const tecla = event.key;
  const alertElement = document.querySelector('.main-box-alert');
  const inputField = document.querySelector('#message');
  const trimmedValue = inputField.value.trim();

  if (tecla === tecla.toUpperCase() && tecla !== tecla.toLowerCase()) {
    alertElement.style.color = 'red';
    event.preventDefault(); // Impede a inserção da letra maiúscula
  } else if (tecla === tecla.toUpperCase() && trimmedValue === '') {
    // Exibe o alerta apenas se o campo estiver vazio
    alert('Por favor, insira uma mensagem.');
  } else {
    alertElement.style.color = 'var(--terceira-color)';
  }
}

document.querySelector('#message').addEventListener('keydown', blockUppercase);


function checkInput() {
  const inputField = document.querySelector('#message');
  const trimmedValue = inputField.value.trim();
  
  // Verifica se o valor, após remover espaços, é uma string vazia
  if (trimmedValue === '') {

    if (!inputField.dataset.alertShown) {
      alert('Por favor, insira uma mensagem.');
      inputField.dataset.alertShown = 'true'; // Marca que o alerta foi exibido
    }
    return true; // Retorna true se o campo estiver vazio
  } else {
    // Se o campo não estiver vazio, reseta o estado do alerta
    inputField.dataset.alertShown = 'false';
    return false; // Retorna false se o campo não estiver vazio
  }
}

// Função para criptografar a mensagem
function encrypt() {
  if (checkInput()) return; 
  
  let textElement = document.querySelector('#message');
  let text = textElement.value;
  let encrypted = text.replace(/e/gi, "enter")
                      .replace(/i/gi, "imes")
                      .replace(/a/gi, "ai")
                      .replace(/o/gi, "ober")
                      .replace(/u/gi, "ufat");

  const div = document.querySelector('.area-encrypted-content');
  const title = document.querySelector('h1');
  title.innerText = 'Mensagem Criptografada';
  title.style.color = "var(--color-text)";
  title.style.fontSize = "1.4rem";
  title.style.margin = "0 auto";
  
  div.appendChild(title);
  document.querySelector('.area-encrypted-title').innerText = encrypted;
  
  textElement.value = '';  

  return encrypted;
}

buttonCrypt.addEventListener('click', encrypt);


function showCrypt(event) {
  if (checkInput()) return; 
  event.preventDefault();
  let encryptedText = encrypt();
  const inputField = document.querySelector('.area-encrypted-title');
  inputField.style.textAlign = "center";
  inputField.style.margin = "0 auto";
  inputField.style.fontSize= "1.4rem";
  inputField.style.fontWeight = "550";
  inputField.innerText = encryptedText; 
}


function decrypt() {
  let textElement = document.querySelector('.area-encrypted-title');
  let text = textElement.innerText;
  let decrypted = text.replace(/enter/gi, "e")
                      .replace(/imes/gi, "i")
                      .replace(/ai/gi, "a")
                      .replace(/ober/gi, "o")
                      .replace(/ufat/gi, "u");

  return decrypted;
}


function showDescrypt() {
  let decryptedText = decrypt();
  
  const title = document.querySelector('h1');
  title.innerText = 'Mensagem Descriptografada';
  title.style.color = "var(--color-text)";
  title.style.fontSize = "1.3rem";
  title.style.textAlign = "center";
  title.style.width = "150px";
  title.style.margin = "0 auto";
  
  const div = document.querySelector('.area-encrypted-content');
  div.appendChild(title);

  const inputField = document.querySelector('.area-encrypted-title');
  inputField.style.textAlign = "center";
  inputField.style.margin = "0 auto";
  inputField.style.fontSize= "1.4rem";
  inputField.style.fontWeight = "550";
  inputField.innerText = decryptedText;  
  decryptedText.value = '';

}

buttonDescrypt.addEventListener('click', showDescrypt);

function sendMessage() {
  let decryptedText = decrypt();

  const inputField = document.querySelector('#message');
  inputField.style.textAlign = "center";
  inputField.style.margin = "0 auto";
  inputField.style.fontSize= "1.4rem";
  inputField.style.fontWeight = "550";
  inputField.value = decryptedText;
  decryptedText.value = '';
}


buttonDescrypt.addEventListener('click', showDescrypt);

buttonMessage.addEventListener('click', sendMessage);


/* Animation */

document.addEventListener('mousemove', (e) => {
  const eyesContainer = document.querySelector('.eyes');
  const eyes = document.querySelectorAll('.eyes > div');
  
  if(!eyesContainer || eyes.length !== 2) return;
  
  const containerRect = eyesContainer.getBoundingClientRect();
  const containerCenterX = containerRect.left + containerRect.width / 2;
  const containerCenterY = containerRect.top + containerRect.height / 2;

  const angle = Math.atan2(e.clientY - containerCenterY, e.clientX - containerCenterX);
  const distance = Math.min(
    eyes[0].offsetWidth / 4,
    Math.sqrt(Math.pow(e.clientX - containerCenterX, 2) + Math.pow(e.clientY - containerCenterY, 2))
  );

  const moveX = Math.cos(angle) * distance;
  const moveY = Math.sin(angle) * distance;
  
  eyes.forEach(eye => {
    const eyeBall = eye.querySelector('i');
    eyeBall.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });
});


const wrapper = document.getElementById('wrapper');
const eyes = document.querySelectorAll('.eye');

const updateEyeMouseTracking = (targetX, targetY) => {
  eyes.forEach(eye => {
    const pupil = eye.querySelector('.pupil');
    const eyeRect = eye.getBoundingClientRect();
    const eyeX = eyeRect.left + eyeRect.width / 2;
    const eyeY = eyeRect.top + eyeRect.height / 2;

    const angle = Math.atan2(targetY - eyeY, targetX - eyeX);
    const distance = Math.min(
      eye.offsetWidth / 4,
      Math.sqrt(Math.pow(targetX - eyeX, 2) + Math.pow(targetY - eyeY, 2))
    );

    const moveX = Math.cos(angle) * distance;
    const moveY = Math.sin(angle) * distance;

    pupil.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });
};

const handleMouseMove = (e) => {
  updateEyeMouseTracking(e.clientX, e.clientY);
};

const handleTouchMove = (e) => {
  const touch = e.touches[0];
  updateEyeMouseTracking(touch.clientX, touch.clientY);
};

const handleScroll = () => {
  const scrollX = window.scrollX + window.innerWidth / 2;
  const scrollY = window.scrollY + window.innerHeight / 2;
  updateEyeMouseTracking(scrollX, scrollY);
};

const blinkEyes = () => {
  eyes.forEach(eye => {
    eye.classList.add('blinking');
  });

  setTimeout(() => {
    eyes.forEach(eye => {
      eye.classList.remove('blinking');
    });
  }, 200); // Duração do piscar
};

wrapper.addEventListener('mousemove', handleMouseMove);
window.addEventListener('touchmove', handleTouchMove);
window.addEventListener('scroll', handleScroll);

// Piscar a cada 3 a 5 segundos
setInterval(blinkEyes, Math.random() * 2000 + 3000);



/*==================== DARK LIGHT THEME ====================*/ 
const themeButton = document.querySelector('#theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'uil-sun';

const selecedThem = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');


const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun'

selecedThem ? document.body.classList[selecedThem === 'dark' ? 'add' : 'remove'](darkTheme) : themeButton.classList[selecedThem === 'uil-moon' ? 'add' : 'remove']

themeButton.addEventListener('click', () => {
 
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);

 
  localStorage.setItem('selected-theme', getCurrentTheme());
  localStorage.setItem('selected-icon', getCurrentIcon());
})
