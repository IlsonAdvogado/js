
// Suavizar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
    e.preventDefault();
        
    document.querySelector(this.getAttribute('href')).scrollIntoView({
    behavior: 'smooth'
        });
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.contato-form');
    if (form) {
        form.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
        form.reset();
        });
    }
});

        // EmailJS
    emailjs.init('020ilson');
        
    document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
            
        const submitBtn = document.getElementById('submitBtn');
        const successMessage = document.getElementById('successMessage');
        const errorMessage = document.getElementById('errorMessage');
            
        // Esconde mensagens anteriores
        successMessage.style.display = 'none';
        errorMessage.style.display = 'none';
            
        // Validação adicional
        if (!this.checkValidity()) {
            alert('Por favor, preencha todos os campos corretamente.');
            return;
        }
            
        // Desativa o botão durante o envio
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';
            
        // Envie o email usando EmailJS
        emailjs.sendForm('default_service', 'template_020ilson', this)
            .then(function(response) {
                console.log('E-mail enviado com sucesso!', response);
                successMessage.style.display = 'block';
                document.getElementById('contactForm').reset();
            }, function(error) {
                console.error('Falha no envio:', error);
                errorMessage.style.display = 'block';
            })
            .finally(function() {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Enviar Mensagem';
            });
        });
