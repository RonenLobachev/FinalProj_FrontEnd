// Validation for the consultation form
function validateForm() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;

    const nameError = document.getElementById("name-error");
    const emailError = document.getElementById("email-error");
    const phoneError = document.getElementById("phone-error");

    nameError.textContent = "";
    emailError.textContent = "";
    phoneError.textContent = "";

    let isValid = true;

    if (name.length < 3) {
        nameError.textContent = "Please enter your name properly. At least 3 letters.";
        isValid = false;
    }

    if (!email.includes("@")) {
        emailError.textContent = "Please enter a valid email address.";
        isValid = false;
    }

    const phonePattern = /^\d{10}$/;
    if (!phonePattern.test(phone)) {
        phoneError.textContent = "Please enter a valid 10-digit phone number.";
        isValid = false;
    }

    return isValid;
}

// Validation for the payment form and order submission
function validatePaymentForm() {
    console.log("In cart validation");
    let isValid = true;

    const name = document.getElementById("name").value;
    const cardNumber = document.getElementById("cardNumber").value;
    const expiry = document.getElementById("expiry").value;
    const cvv = document.getElementById("cvv").value;

    const nameError = document.getElementById("name-error");
    const cardNumberError = document.getElementById("cardNumber-error");
    const expiryError = document.getElementById("expiry-error");
    const cvvError = document.getElementById("cvv-error");

    nameError.textContent = "";
    cardNumberError.textContent = "";
    expiryError.textContent = "";
    cvvError.textContent = "";

    if (name === "" || name.length < 3) {
        nameError.textContent = "Please enter your name properly. At least 3 letters.";
        isValid = false;
    }

    const cardNumberPattern = /^\d{16}$/;
    if (!cardNumberPattern.test(cardNumber)) {
        cardNumberError.textContent = "Please enter a valid card number (16 digits).";
        isValid = false;
    }

    const expiryPattern = /^(0[1-9]|1[0-2])\/\d{4}$/;
    if (!expiryPattern.test(expiry)) {
        expiryError.textContent = "Please enter a valid expiry date (MM/YYYY).";
        isValid = false;
    }

    const cvvPattern = /^\d{3}$/;
    if (!cvvPattern.test(cvv)) {
        cvvError.textContent = "Please enter a valid CVV/CVC (3 digits).";
        isValid = false;
    }
     
    // If validation passes, submit the order
    if (isValid) {        
        submitOrder();
    }

    return isValid;
}


