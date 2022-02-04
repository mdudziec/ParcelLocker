function collectPackage(){
    const modular =document.getElementById("modular")
    const overlay =document.getElementById("overlay")
    modular.innerHTML = `
    <h2><strong>Paczka odebrana!</strong</h2>
    <p>Zrobiłeś to w czasie 10 sekund! Czy mozemy zrobić dla Ciebie coś jeszcze?</p>
    <div class="modular__buttons">
    <button>To wszystko na dziś</button>
    <button>Odbierz kolejną paczkę</button>
    </div>`
    overlay.style["visibility"] ="visible";
    overlay.style["opacity"]="1";
}


function createNewButton(){
    const buttonContainer =document.getElementById("button")
    buttonContainer.innerHTML ="";
    buttonContainer.innerHTML =`<button id="buttons" disabled onclick="collectPackage()">Odbierz paczkę</button>`; //setting button state to disabled


}

function renderNewInputs(){
    const inputContainer = document.getElementById("inputs");
    inputContainer.innerHTML ="";
    createNewButton();
    const newPhoneInputDiv =document.createElement("div");
    newPhoneInputDiv.setAttribute("class", "container__inputs--phone");
    newPhoneInputDiv.innerHTML = `
    <label><strong>Numer telefonu</strong></label><br>
    <input id="phone-input" type="text" pattern="\d*" maxlength="11" placeholder="Numer telefonu"/><br>
    <p id="error-message-phone"></p>`;
    const newPasscodeDiv = document.createElement("div");
    newPasscodeDiv.setAttribute("class","container__inputs--passcode");
    newPasscodeDiv.innerHTML=`
    <label><strong>Kod odbioru</strong></label><br>
    <input id="code-input"type="text" pattern="\d*" maxlength="4" placeholder="Kod odbioru"/><br>
    <p id="error-message-code"></p>`;

    inputContainer.append(newPhoneInputDiv,newPasscodeDiv);


    let inputPhone = document.getElementById("phone-input");
    let inputCode =document.getElementById("code-input")
    let button = document.getElementById("buttons"); 
    let errorMsgPhone = document.getElementById("error-message-phone"); 
    let errorMsgCode = document.getElementById("error-message-code"); 

    inputPhone.addEventListener("keyup", (event)=>{
        setButtonStatus(validatePhoneLength() && validateCodeLength());
        showErrorMsgPhone(validatePhoneLength());
    })
    inputCode.addEventListener("keyup", (event)=>{
        setButtonStatus(validatePhoneLength() && validateCodeLength())
        showErrorMsgCode(validateCodeLength());
    })
    const regexPhone = /^(?:\d{3}|\(\d{3}\))([-\/\.])\d{3}\1\d{3}$/;
    const regexCode = /^(?:\d{4}|\(\d{4}\))/;

    function validatePhoneLength() {
        return inputPhone.value.length == 11
    }
    function validateCodeLength(){
        return inputCode.value.length == 4
    }
    function validatePhoneInput(inputPhone){
        const validatedPhone = regexPhone.exec(inputPhone.value);
        if(!validatedPhone){
            errorMsgPhone.textContent = `${inputPhone.value} isn't a phone number!`
            inputPhone.setAttribute("class", "inputs__phone--invalid")
        }else{
            errorMsgPhone.textContent="";
            inputPhone.removeAttribute("class", "inputs__phone--invalid")
        }
    }

    function validateCodeInput(inputCode){
        const validatedCode = regexCode.exec(inputCode.value);
        if(!validatedCode){
            errorMsgCode.textContent=`${inputCode.value} isn't code!`
            inputCode.setAttribute("class", "inputs__code--invalid")
        }
        else{
            errorMsgCode.textContent="";
            inputCode.removeAttribute("class", "inputs__code--invalid")
        }
    }


    function showErrorMsgPhone(status){
        if(status){
            validatePhoneInput(inputPhone);
        }
        else{
            errorMsgPhone.textContent="";
            inputPhone.removeAttribute("class", "inputs__phone--invalid")
        }
    }

    function showErrorMsgCode(status){
        if(status){
            validateCodeInput(inputCode);
        }
        else{
            errorMsgCode.textContent="";
            inputCode.removeAttribute("class", "inputs__code--invalid")
        }
    }


    function setButtonStatus(status){
        if(status){
            button.removeAttribute("disabled")
        }
        else{
            button.setAttribute("disabled", "true");
        }
    }

    
}

