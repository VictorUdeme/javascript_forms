const username1 = document.querySelector('#username');
const email1 = document.querySelector('#email');
const password1 = document.querySelector('#password');
const confirmPassword1 = document.querySelector('#confirm-password');

const form = document.querySelector('#signup');

form.addEventListener('submit', function(e) {
    // this prevents data from submitting
    e.preventDefault()
});

// const isRequired = value => value === '' ? false : true

function isRequired(value){
    if (value === ''){
        return false
    } else {
        return true;
    }
}

function isBetween(length, min, max) {
    if(length < min || length > max){
        return false
    } else {
        return true;
    }
}

// checking the validity if the email

function isValidEmail(email) {
    const emailPattern = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

    // Test the email against the pattern
    return emailPattern.test(email);
}

// chekcking if password is strong
// Define a regular expression pattern for a valid password
// the password required is at least 8 characters
function isPasswordSecure(password) {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/;

    // Test the password against the pattern
    return passwordPattern.test(password);
}



// this function shows an error message if the input field is invalid
function showError(input, message) {
    // get parent element of the input field
    const formField = input.parentElement;
    
    // removing the success class and then adding the error class
    formField.classList.remove('success');
    formField.classList.add('error');

    // show the err message. this uses the small element inside the form-field element
    // we used formfield.querySelector instead of document
    const error = formField.querySelector('small');
    error.textContent = message;
}

// this function shows a success message after validating a successful input field

function showSuccess(input){
    // get the form field element(parent)
    const formField = input.parentElement;

    // remove the error class
    formField.classList.remove('error');
    formField.classList.add('success');

    // hide the error message
    const error = formField.querySelector('small');
    error.textContent = '';
}

// This func Validates the username input field

function checkUsername(){
    let valid = false;
    const min = 3,
        max = 25;
    const username = username1.value.trim();
    if (!isRequired(username)) {
        showError(username1, 'Username cannot be blank. ');
    } else if(!isBetween(username.length, min, max)) {
        showError(username1, `username must be between ${min} and ${max} characters. `)
    } else {
        showSuccess(username1);
        valid = true;
    }
    return valid;
}

// This function validates the email field

function checkEmail() {
    let valid = false;
    const email = email1.value.trim();
    if(!isRequired(email)) {
        showError(email1, 'Email cannot be blank. ');
    } else if(!isValidEmail(email)) {
        showError(email1, 'Email is not valid. ')
    } else {
        showSuccess(email1);
        valid = true;
    }
    return valid;
}

// this function validate the password field
// it checks if the value provided in the field matches the required format;

function checkPassword(){
    let valid = false;
    const password = password1.valid.trim();

    if (!isRequired(password)) {
        showError(password1, 'Password cannot be blank');
    } else if (!isPasswordSecure(password)) {
        showError(password1, 'password must have atleast 8 characters that include 1lowercase character, 1 uppercase characters, 1 number, and 1 special character ion (!@#$%^&*)');
    } else {
        showSuccess(password1);
        valid = true;
    }
    return valid;
};

// This functions validate the 'confirm password field
// It checks if the values in the confirm password field matches the password field

function checkConfirmPassword(){
    let valid = false;
    
    // check confirm password
    const confirmPassword = confirmPassword1.value.trim();
    const password = password1.value.trim();

    if(!isRequired(confirmPassword)) {
        showError(confirmPassword1, 'Please enter the password again');
    } else if(password !== confirmPassword) {
        showError(confirmPassword1, 'Confirm password does not match');
    } else {
        showSuccess(confirmPassword);
        valid = true
    }
    return valid;
};

// Modifying the submit event handler

form.addEventListener('submit', function(e){
    // this prevents the form from submitting without passing 2ru the validation
    e.preventDefault();

    // Validate all the forms

    let isUsernameValid = checkUsername();
    let isEmailValid = checkEmail();
    let isPasswordValid = checkPassword();
    let isConfirmPasswordValid = checkConfirmPassword();

    let isFormValid = isUsernameValid &&isEmailValid && isPasswordValid &&isConfirmPasswordValid;

    // sumbits to the server if the form is valid
    if(isFormValid){
        
    }
});

//  this adds an instant feedback feature 
// providing an event ti the 'input' event of each field and then validates it
form.addEventListener('input', function(e){
    switch (e.target.id) {
        case 'username':
            checkUsername();
            break;
        case 'email':
            checkEmail();
            break;
        case 'password':
            checkPassword();
            break;
        case 'confirm-password':
            checkConfirmPassword();
            break;

    }
});






