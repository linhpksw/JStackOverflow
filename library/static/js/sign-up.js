try {
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm-password');
    const fullName = document.getElementById('full-name');
    const dateOfBirth = document.getElementById('date-picker');
    const phone = document.getElementById('phone');

    const signUpBtn = document.getElementById('sign-up-btn');

    async function fetchUserInfo() {
        if (password.value != confirmPassword.value) {
            alert(`Those passwords didn't match. Try again.`);
        } else {
            const data = {
                email: email.value,
                password: password.value,
                name: fullName.value,
                date_of_birth: dateOfBirth.value.split('/').reverse().join('-'),
                phone_number: phone.value,
            };

            console.log(data);

            const opt = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify(data),
            };

            const URL = 'https://jstackoverflow.jsclub.me/sign_up';
            const response = await fetch(URL, opt);
            const jsonResponse = await response.json();

            if (jsonResponse.status == 'sign up successfully') {
                window.location.href = '/';
            } else {
                alert(jsonResponse.status);
            }
        }
    }

    signUpBtn.addEventListener('click', fetchUserInfo);
} catch (err) {
    console.log(err);
}
