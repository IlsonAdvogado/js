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

// contato

document.querySelector('.contato-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const form = e.target;
    fetch(form.action, {
      method: 'POST',
      body: new FormData(form)
    })
    .then(response => {
      if (response.ok) {
        window.location.href = form.querySelector('input[name="_next"]').value;
      } else {
        alert('Ocorreu um erro ao enviar o formulário.');
      }
    })
    .catch(error => {
      alert('Ocorreu um erro ao enviar o formulário.');
    });
  });
