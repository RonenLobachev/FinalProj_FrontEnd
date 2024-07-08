    //Check if all infomation input correct.
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
    
        if ((name.length<3)) {
        
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

//Check if all infomation input correct.
function validatePaymentForm() {
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

    if (name == "" || name.length < 3) {
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

     // Saving to local storage
    if (isValid) {
        const paymentData = {
            name: name,
            cardNumber: cardNumber,
            expiry: expiry,
            cvv: cvv
        };
        localStorage.setItem('paymentData', JSON.stringify(paymentData));
        alert('Your information was saved.');
    }
    
    return isValid;
    
}
//Refill information from local storage to payment form.
function fillForm() {
    const paymentData = JSON.parse(localStorage.getItem('paymentData'));
    if (paymentData) {
        document.getElementById("name").value = paymentData.name;
        document.getElementById("cardNumber").value = paymentData.cardNumber;
        document.getElementById("expiry").value = paymentData.expiry;
        document.getElementById("cvv").value = paymentData.cvv;
    }
}
//Listen to form, if is shown to refill info.
document.getElementById('paymentForm').addEventListener('show.bs.modal', fillForm());