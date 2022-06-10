const mainFrom = document.querySelector(".form");

const allInput = document.querySelectorAll("input")

const inputFisrtName = document.querySelector("#first-name");
const inputLastName = document.querySelector("#last-name");
const inputEmail = document.querySelector("#email");
const inputPhone = document.querySelector("#phone");


// Event focus 
allInput.forEach((item) => item.addEventListener('focus', function() {
    resetSettings(item);
}))

// Event submit form
mainFrom.addEventListener("submit", (event) => {
    const allFormText = mainFrom.querySelectorAll('.form-text');
    allFormText.forEach((item) => {
        item.remove();
    })
    
    validateName(event);

    validateEmail(event);

    validatePhone (event);
});

// Validate firstName and lastName
function validateName(e) {
    if (inputFisrtName.value.length <=2 || inputLastName.value.length <= 2) {

        inputFisrtName.classList.add("error");
        inputFisrtName.after(createMessageErorr('Слишком короткое имя'));

        inputLastName.classList.add("error");
        inputLastName.after(createMessageErorr('Слишком короткая фамилия'))
        e.preventDefault();
    }
}

// Validate Email
function validateEmail(e) {
    const emailValue = inputEmail.value;
    const pattern =  /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!emailValue.match(pattern)) {

        inputEmail.classList.add("error");
        inputEmail.after(createMessageErorr('Не правильная почта'));
        e.preventDefault();

    }
};

// Validate phone
const iti = window.intlTelInput(inputPhone, {
    utilsScript: 'node_modules/intl-tel-input/build/js/utils.js',
    onlyCountries: ["ru","ua","pl","kz"]
})

function validatePhone (e) {
    if (!inputPhone.value) {
        inputPhone.closest('.form-group').append(createMessageErorr('Не правильный телефон'))
          inputPhone.classList.add("error");
    }
    if (inputPhone.value.trim()) {
        if(!iti.isValidNumber() ) {
            inputPhone.closest('.form-group').append(createMessageErorr('Не правильный телефон'))

            inputPhone.classList.add("error");
            e.preventDefault();
        }
    }
}

// Create message error
function createMessageErorr (message) {
    const messageError = document.createElement("p");
    messageError.classList = "form-text"
    messageError.innerHTML = message;
    return messageError;
}

// Reset form
function resetSettings (item) {
    item.classList.remove('error')
    item.closest('.form-group').querySelector('.form-text').remove();
}


