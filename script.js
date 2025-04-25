
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

        // Email
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Configurações do FormSubmit com SEU EMAIL
            const form = this;
            form.action = 'https://formsubmit.co/garotosdeprograma020@gmail.com';
            
            // Configurações extras (personalizáveis)
            const formSettings = {
                '_subject': 'Nova mensagem do site - Garotos de Programa',
                '_template': 'box',
                '_autoresponse': 'Obrigado por sua mensagem! Entraremos em contato em breve.',
                '_next': window.location.href + '?enviado=true#contactForm',
                '_captcha': 'false'
            };
            
            // Adiciona campos ocultos dinamicamente
            for (const key in formSettings) {
                let input = document.createElement('input');
                input.type = 'hidden';
                input.name = key;
                input.value = formSettings[key];
                form.appendChild(input);
            }
            
            // Feedback visual
            const statusDiv = document.getElementById('formStatus');
            statusDiv.style.display = 'block';
            statusDiv.textContent = 'Enviando sua mensagem...';
            statusDiv.style.backgroundColor = '#fff3cd';
            statusDiv.style.color = '#856404';
            
            // Desativa o botão
            const submitBtn = form.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            
            // Envia o formulário
            fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
            })
            .then(response => {
                if (response.ok) {
                    statusDiv.textContent = '✅ Mensagem enviada com sucesso!';
                    statusDiv.style.backgroundColor = '#d4edda';
                    statusDiv.style.color = '#155724';
                    form.reset();
                    
                    // Rolagem suave para o formulário
                    setTimeout(() => {
                        document.querySelector('#contactForm').scrollIntoView({
                            behavior: 'smooth'
                        });
                    }, 500);
                } else {
                    throw new Error('Erro no envio');
                }
            })
            .catch(error => {
                statusDiv.textContent = '❌ Erro ao enviar. Por favor, tente novamente.';
                statusDiv.style.backgroundColor = '#f8d7da';
                statusDiv.style.color = '#721c24';
                console.error('Erro:', error);
            })
            .finally(() => {
                submitBtn.disabled = false;
                
                // Remove campos ocultos após 5 segundos
                setTimeout(() => {
                    document.querySelectorAll('input[type="hidden"]').forEach(input => {
                        if (input.name.startsWith('_')) {
                            input.remove();
                        }
                    });
                }, 5000);
            });
        });
    
        // Máscara para celular com validação
        document.getElementById('celular').addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            // Limita a 11 dígitos
            if (value.length > 11) value = value.substring(0, 11);
            
            // Aplica a máscara (XX) XXXXX-XXXX
            let formattedValue = '';
            if (value.length > 0) {
                formattedValue = '(' + value.substring(0, 2);
                if (value.length > 2) {
                    formattedValue += ') ' + value.substring(2, 7);
                }
                if (value.length > 7) {
                    formattedValue += '-' + value.substring(7, 11);
                }
            }
            
            e.target.value = formattedValue;
        });
    
        // Validação extra antes do envio
        document.getElementById('contactForm').addEventListener('submit', function() {
            const celular = document.getElementById('celular').value.replace(/\D/g, '');
            if (celular.length < 11) {
                alert('Por favor, insira um número de celular válido com DDD (11 dígitos)');
                return false;
            }
            return true;
        });
