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
    
        if (name === "" || (name.length<3)) {
        
            nameError.textContent = "Please enter your name properly. At least 3 letters.";
            isValid = false;
        }

        if (email === "" || !email.includes("@")) {
            emailError.textContent = "Please enter a valid email address.";
            isValid = false;
        }

        if (phone === "" || !/^\d{10}$/.test(phone)) {
            phoneError.textContent = "Please enter a valid 10-digit phone number.";
            isValid = false;
        }

        return isValid;
    }

    validateForms('#consultation-form');