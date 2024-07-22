const buttonCrypt = document.querySelector('.button-crypt');
const buttonDescrypt = document.querySelector('.button-descrypt');
const buttonMessage = document.querySelector('.button-message');

function checkEmptyInput() {
  const inputField = document.querySelector('#message');
  if (inputField.value.trim() === '') {
    alert('Por favor, insira uma mensagem.');
    return true; // Retorna true se o campo estiver vazio
  }
  return false; // Retorna false se o campo não estiver vazio
}

function encrypt() {
  if (checkEmptyInput()) return; 
  let text = document.querySelector('#message').value;
  let matriz = 3;
  let encrypted = text.replace(/[a-z]/gi, function (char) {
    let charCode = char.charCodeAt(0);
    let base = charCode >= 65 && charCode <= 90 ? 65 : 97;
    return String.fromCharCode(((charCode - base + matriz + 26) % 26) + base);
  });
  const div = document.querySelector('.area-encrypted-content');
  const title = document.querySelector('h1');
  title.innerText = 'Mensagem Criptografada';
  title.style.color = "#FFF";
  div.appendChild(title);
  document.querySelector('.area-encrypted-title').innerText = encrypted;
  return encrypted;
}

buttonCrypt.addEventListener('click', encrypt);

function showCrypt(event) {
  event.preventDefault();
  if (checkEmptyInput()) return; 
  let encryptedText = encrypt();
  const inputField = document.querySelector('#message');
  inputField.style.textAlign = "center";
  inputField.style.margin = "center";
  inputField.style.fontSize= "1.4rem";
  inputField.style.fontWeight = "550";
  inputField.value = encryptedText;
}
buttonMessage.addEventListener('click', showCrypt);

function descrypt() {
  if (checkEmptyInput()) return; 
  let outputText = document.querySelector('.area-encrypted-title').innerText;
  let matriz = 3;
  let decrypted = outputText.replace(/[a-z]/gi, function (char) {
    let charCode = char.charCodeAt(0);
    let base = charCode >= 65 && charCode <= 90 ? 65 : 97;
    return String.fromCharCode(((charCode - base - matriz + 26) % 26) + base);
  });
  const div = document.querySelector('.area-encrypted-content');
  const title = document.querySelector('h1');
  title.innerText = 'Mensagem Descriptografada';
  title.className = 'title-crypt';
  title.style.color = "#FFF";
  div.appendChild(title);
  document.querySelector('.area-encrypted-title').innerText = decrypted;
  return decrypted;
}

function showDescrypt(event) {
  event.preventDefault();
  if (checkEmptyInput()) return; 
  let decryptedText = descrypt();
  const inputField = document.querySelector('#message');
  inputField.style.textAlign = "center";
  inputField.style.margin = "center";
  inputField.style.fontWeight = "550";
  inputField.value = decryptedText;
}
buttonDescrypt.addEventListener('click', showDescrypt);


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