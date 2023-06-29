
function showNewsContainer() {
    window.location.href = "news.html";
}
let user = null;
async function login(event) {
    event.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const loginData = {
        username,
        password
    };

    try {
        const response = await fetch(`${API_URL}/users?username=${username}&password=${password}`);
        const data = await response.json();
        console.log(data);
        if (data.length > 0) {
            alert('Login successful! Welcome to Rev News');
            user = data[0];
            const country = user.country;
            localStorage.setItem("userInformation", JSON.stringify(data));
            showNewsContainer();
            fetchNews("general", country);
        } else {
            alert('Invalid credentials. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during login. Please try again later.');
    }
}
