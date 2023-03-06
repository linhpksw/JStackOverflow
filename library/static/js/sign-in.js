try {
    const email = document.getElementById('email');

    const password = document.getElementById('password');

    const signInBtn = document.getElementById('sign-in-btn');

    console.log(email);
    console.log(password);

    const fetchUserCredential = async () => {
        const data = {
            email: email.value,
            password: password.value,
        };

        const opt = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Referrer-Policy': 'unsafe-url',
            },
            body: JSON.stringify(data),
        };

        const URL = 'https://jstackoverflow.jsclub.me/login';

        const response = await fetch(URL, opt);

        console.log(response);

        // const jsonResponse = await response.json();

        // console.log(jsonResponse);
    };

    signInBtn.addEventListener('click', fetchUserCredential);
} catch (err) {
    console.log(err);
}
