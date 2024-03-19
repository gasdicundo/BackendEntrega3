function submitUserData() {
    const data = {
        email: document.getElementById('email-input').value.toUpperCase(),
        password: document.getElementById('password-input').value
    };

    fetch('/api/auth/resetPassword', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(responseData => {
        if (responseData.status === 'Success') {
            window.location.href = '/login';
        } else {
            console.log("Error al restablecer la contraseña.");
            showAlert("¡Oops!", "Correo electrónico incorrecto.");
        }
    })
    .catch(error => console.error('Error:', error));
}

const signUpButton = document.getElementById('signup-button');

signUpButton.addEventListener('click', () => {
    window.location.href = '/signup';
});

function showAlert(title, text) {
    Swal.fire({
        icon: "error",
        title: title,
        text: text
    });
}

