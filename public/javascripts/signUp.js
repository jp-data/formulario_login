// const form = document.getElementById('form');
// const nameInput = document.getElementById('name')
// const email = document.getElementById('email');
// const password = document.getElementById('password')
// const passwordConfirmation = document.getElementById('password-confirmation')




// form.addEventListener('submit', (e) => {
//     e.preventDefault()
//     const result = checkInputs()
//     if (result) form()
// })

// password.addEventListener('focus', (e) => {
//     e.preventDefault()
//     passwordInstruction()
// })

// function checkInputs() {
//     const emailValue = email.value
//     const usernameValue = nameInput.value
//     const passwordValue = password.value
//     const passwordConfirmationValue = passwordConfirmation.value

//     //email
//     if (!emailValue.includes('@') || emailValue === "") {
//         setErrorFor(email, "Email inválido")
//         return false

//     } else {
//         setSuccesFor(email)
//     }
//     //nome
//     if (usernameValue === "") {
//         setErrorFor(nameInput, "Nome é obrigatório")
//         return false

//     } else {
//         setSuccesFor(nameInput)
//     }
//     //senhas
//     if (passwordValue == "") {
//         setErrorFor(password, "Senha é obrigatório")
//         return false

//     } else if (passwordConfirmationValue == "") {
//         setErrorFor(passwordConfirmation, "Confirmação de senha é obrigatório")
//         return false

//     } else if (passwordValue !== passwordConfirmationValue) {
//         setErrorFor(password, "Senhas não conferem")
//         setErrorFor(passwordConfirmation, "Senhas não conferem")
//         return false
        
//     } else {
//         setSuccesFor(password)
//         setSuccesFor(passwordConfirmation)
        
//     }
//     return true
// }


// function setErrorFor(input, message) {
//     const formControl = input.parentElement
//     const msgError = formControl.querySelector('small')
//     msgError.innerText = message
//     formControl.className = "dados error"
// }

// function setSuccesFor(input) {
//     const formControl = input.parentElement
//     formControl.className = "dados succes"

// }

// function passwordInstruction() {
//     passwordMsg = document.querySelector('#password-msg')
//     passwordMsg.innerText = 'Mínimo 6 caracteres'
//     passwordMsg.style.visibility = 'visible'
// }



