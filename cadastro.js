const registerForm = document.getElementById('registerForm');
const registerMessage = document.getElementById('registerMessage');
const phoneInput = document.getElementById('registerPhone');

phoneInput.addEventListener('input', () => {
    let digits = phoneInput.value.replace(/\\D/g, '').slice(0, 11);
    if (digits.length > 10) {
        digits = digits.replace(/^(\\d{2})(\\d{5})(\\d{0,4}).*/, '($1) $2-$3');
    } else if (digits.length > 6) {
        digits = digits.replace(/^(\\d{2})(\\d{4})(\\d{0,4}).*/, '($1) $2-$3');
    } else if (digits.length > 2) {
        digits = digits.replace(/^(\\d{2})(\\d{0,5})/, '($1) $2');
    } else if (digits.length) {
        digits = digits.replace(/^(\\d*)/, '($1');
    }
    phoneInput.value = digits;
});

registerForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('registerName').value.trim();
    const phone = phoneInput.value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const password = document.getElementById('registerPassword').value;
    const passwordConfirm = document.getElementById('registerPasswordConfirm').value;

    if (name.length < 3) {
        showMessage('Digite seu nome completo.', 'error');
        return;
    }

    const phoneDigits = phone.replace(/\\D/g, '');
    if (phoneDigits.length < 10 || phoneDigits.length > 11) {
        showMessage('Digite um telefone válido com DDD.', 'error');
        return;
    }

    if (password.length < 8) {
        showMessage('A senha deve ter pelo menos 8 caracteres.', 'error');
        return;
    }

    if (password !== passwordConfirm) {
        showMessage('As senhas não coincidem.', 'error');
        return;
    }

    if (!document.getElementById('acceptTerms').checked) {
        showMessage('Leia e aceite os termos para continuar.', 'error');
        document.getElementById('acceptTerms').focus();
        return;
    }

    // A interface está pronta. O cadastro real deve ser conectado a uma API segura.
    // Não armazenamos senhas no navegador nem em localStorage.
    showMessage('Formulário validado! Para concluir o cadastro, conecte esta página ao sistema de autenticação do site.', 'success');
});

function showMessage(message, type) {
    registerMessage.textContent = message;
    registerMessage.className = `register-message ${type}`;
}
