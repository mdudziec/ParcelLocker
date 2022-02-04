function goToHomePage() {
  const modal = document.getElementById("modal-content");
  const overlay = document.getElementById("overlay");
  const inputContainer = document.getElementById("inputs");
  const containerButtonDiv = document.getElementById("button");

  modal.innerHTML = "";

  overlay.style["visibility"] = "hidden";
  overlay.style["opacity"] = "0";

  inputContainer.innerHTML = "";
  containerButtonDiv.innerHTML = "";
  containerButtonDiv.innerHTML = `<button onclick="renderNewInputs()">Zaczynamy!</button>`;
}

function collectNextPackage() {
  const modal = document.getElementById("modal-content");
  const overlay = document.getElementById("overlay");
  let inputPhone = document.getElementById("phone-input");
  let inputCode = document.getElementById("code-input");
  let buttonContainer = document.getElementById("button");
  overlay.style["visibility"] = "hidden";
  overlay.style["opacity"] = "0";
  inputPhone.value = "";
  inputCode.value = "";
  buttonContainer.value="";
  createNewButton()

  modal.innerHTML = "";

}

function collectPackage() {

  const modal = document.getElementById("modal-content");
  
  document.getElementById("loader").style.display = "none";
//   const overlay = document.getElementById("overlay");
    modal.innerHTML = `
    <h2><strong>Paczka odebrana!</strong</h2><br>
    <p class="modal__info">Zrobiłeś to w czasie 10 sekund! Czy mozemy zrobić dla Ciebie coś jeszcze?</p>
    <div class="modal__buttons">
    <button class="modal__button" onclick="goToHomePage()">To wszystko na dziś</button>
    <button class="modal__button" onclick="collectNextPackage()">Odbierz kolejną paczkę</button>
    </div>`;
//   overlay.style["visibility"] = "visible";
//   overlay.style["opacity"] = "1";
}

function loader(){
    const overlay = document.getElementById("overlay");
    document.getElementById("loader").style.display = "flex"
    overlay.style["visibility"] = "visible";
    overlay.style["opacity"] = "1";
    const  promise= new Promise((resolve) =>{
        window.setTimeout(
            function() {
                // We fulfill the promise !
                resolve(collectPackage());
            }, Math.random() * 2000 + 1000);

    })
}



function createNewButton() {
  const buttonContainer = document.getElementById("button");
  buttonContainer.innerHTML = "";
  buttonContainer.innerHTML = `<button id="button-collect" disabled onclick="loader()">Odbierz paczkę</button>`; //setting button state to disabled
}

function renderNewInputs() {
  const inputContainer = document.getElementById("inputs");
  inputContainer.innerHTML = "";
  createNewButton();
  const newPhoneInputDiv = document.createElement("div");
  newPhoneInputDiv.setAttribute("class", "container__inputs--phone");
  newPhoneInputDiv.innerHTML = `
    <label><strong>Numer telefonu</strong></label><br>
    <input id="phone-input" type="text" pattern="\d*" maxlength="11" placeholder="Np.: 999-000-999"/><br>
    <p id="error-message-phone"></p>`;
  const newPasscodeDiv = document.createElement("div");
  newPasscodeDiv.setAttribute("class", "container__inputs--passcode");
  newPasscodeDiv.innerHTML = `
    <label><strong>Kod odbioru</strong></label><br>
    <input id="code-input"type="text" pattern="\d*" maxlength="4" placeholder="Np.: 1234"/><br>
    <p id="error-message-code"></p>`;

  inputContainer.append(newPhoneInputDiv, newPasscodeDiv);

  let inputPhone = document.getElementById("phone-input");
  let inputCode = document.getElementById("code-input");
  let button = document.getElementById("button-collect");
  let errorMsgPhone = document.getElementById("error-message-phone");
  let errorMsgCode = document.getElementById("error-message-code");

  inputPhone.addEventListener("keyup", (event) => {
    setButtonStatus(validatePhoneLength() && validateCodeLength());
    showErrorMsgPhone(validatePhoneLength());
  });
  inputCode.addEventListener("keyup", (event) => {
    setButtonStatus(validatePhoneLength() && validateCodeLength());
    showErrorMsgCode(validateCodeLength());
  });
  const regexPhone = /^(?:\d{3}|\(\d{3}\))([-\/\.])\d{3}\1\d{3}$/;
  const regexCode = /^(?:\d{4}|\(\d{4}\))/;

  function validatePhoneLength() {
    return inputPhone.value.length >= 9 ||inputPhone.value.length == 11;
  }
  function validateCodeLength() {
    return inputCode.value.length == 4;
  }
  function validatePhoneInput(inputPhone) {
    const validatedPhone = regexPhone.exec(inputPhone.value);
    if (!validatedPhone) {
      errorMsgPhone.textContent = `${inputPhone.value} isn't a phone number format!`;
      inputPhone.setAttribute("class", "inputs__phone--invalid");
    } else {
      errorMsgPhone.textContent = "";
      inputPhone.removeAttribute("class", "inputs__phone--invalid");
    }
  }

  function validateCodeInput(inputCode) {
    const validatedCode = regexCode.exec(inputCode.value);
    if (!validatedCode) {
      errorMsgCode.textContent = `${inputCode.value} isn't code!`;
      inputCode.setAttribute("class", "inputs__code--invalid");
    } else {
      errorMsgCode.textContent = "";
      inputCode.removeAttribute("class", "inputs__code--invalid");
    }
    return validatedCode;
  }

  function showErrorMsgPhone(status) {
    if (status) {
      validatePhoneInput(inputPhone);
    } else {
      errorMsgPhone.textContent = "";
      inputPhone.removeAttribute("class", "inputs__phone--invalid");
    }
  }

  function showErrorMsgCode(status) {
    if (status) {
      validateCodeInput(inputCode);
    } else {
      errorMsgCode.textContent = "";
      inputCode.removeAttribute("class", "inputs__code--invalid");
    }
  }

  function setButtonStatus(status) {
    let button = document.getElementById("button-collect");
    const validatedPhone = regexPhone.exec(inputPhone.value);
    const validatedCode = regexCode.exec(inputCode.value);
    if (status && validatedCode !== null & validatedPhone !== null) {
      button.removeAttribute("disabled");
    } else {
      button.setAttribute("disabled", "true");
    }
  }
}
