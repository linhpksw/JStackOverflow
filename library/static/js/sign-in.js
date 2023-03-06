try {
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const signInBtn = document.getElementById('sign-in-btn');

    async function fetchUserCredential(e) {
        e.preventDefault();

        const data = {
            email: email.value,
            password: password.value,
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

        if (jsonResponse.status == 'sign in successfully') {
            window.location.href = '/home';
        } else {
            alert(jsonResponse.status);
        }
    }

    signInBtn.addEventListener('click', fetchUserCredential(e));
} catch (err) {
    console.log(err);
}
