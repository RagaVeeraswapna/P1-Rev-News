const API_URL = 'http://localhost:3000';

// function showLoginForm() {
//     window.location.href = "login.html";
// }

async function register(event) {
    event.preventDefault();
    const username = document.getElementById('regUsername').value;
    const password = document.getElementById('regPassword').value;
    const email = document.getElementById('regEmail').value;
    const phone_number = document.getElementById('regPhoneNumber').value;
    const country = document.getElementById('regCountry').value;
    const confirmPassword = document.getElementById('regConfirmPassword').value;

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
        alert('Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one digit, and one special character.');
        return;
    }

    // const phoneNumberRegex = /^\d{10}$/;
    // if (!phoneNumberRegex.test(phone_number)) {
    //     alert('Phone number should be a 10-digit number.');
    //     return;
    // }
    
    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
    }

    const registrationData = {
        username,
        email,
        phone_number,
        country,
        password
    };

    try {
        console.log(registrationData);
        const response = await fetch(`${API_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registrationData)
        });
        await response.json();
        window.location.href = "login.html";
        alert('Registration successful! Please login.');
        // showLoginForm();
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during registration. Please try again later.');
    }
}
