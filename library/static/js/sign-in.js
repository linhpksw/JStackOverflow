const email = document.getElementById('email').value;
console.log(email);
const password = document.getElementById('password').value;

const signInBtn = document.getElementById('sign-in-btn');

try {
    const fetchUserCredential = async () => {
        const data = {
            email: email,
            password: password,
        };

        const opt = {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify(data),
        };

        const URL = 'https://jstackoverflow.jsclub.me/login';

        const response = await fetch(URL, opt);

        const jsonResponse = await response.json();

        console.log(jsonResponse);
    };

    signInBtn.addEventListener('click', fetchUserCredential);
} catch (err) {
    console.log(err);
}
