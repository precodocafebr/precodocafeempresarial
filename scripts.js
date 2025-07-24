// Aguarda o carregamento completo da página
document.addEventListener('DOMContentLoaded', function() {
    
    // Navegação suave para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Destaque do menu ativo durante o scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    function highlightActiveNavLink() {
        let currentSection = '';
        
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', highlightActiveNavLink);

    // Validação e envio do formulário de contato
    const contactForm = document.querySelector('form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validação simples
            const nome = document.getElementById('nome').value.trim();
            const email = document.getElementById('email').value.trim();
            const mensagem = document.getElementById('mensagem').value.trim();
            
            if (!nome || !email || !mensagem) {
                showMessage('Por favor, preencha todos os campos obrigatórios.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showMessage('Por favor, insira um email válido.', 'error');
                return;
            }
            
            // Simula envio do formulário
            showMessage('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
            contactForm.reset();
        });
    }

    // Função para validar email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Função para mostrar mensagens
    function showMessage(message, type) {
        // Remove mensagem anterior se existir
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Cria nova mensagem
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.textContent = message;
        
        // Insere antes do botão de envio
        const submitBtn = document.querySelector('.btn-submit');
        submitBtn.parentNode.insertBefore(messageDiv, submitBtn);

        // Remove a mensagem após 5 segundos
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 5000);
    }

    // Animação de entrada para seções
    function animateOnScroll() {
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible) {
                section.classList.add('animate-in');
            }
        });
    }

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Executa uma vez no carregamento

    // Efeito de hover nos cartões de serviços
    const serviceCards = document.querySelectorAll('.services-grid > div');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    // Menu mobile (hamburger) - caso necessário no futuro
    function createMobileMenu() {
        const nav = document.querySelector('nav');
        const navList = document.querySelector('nav ul');
        
        if (window.innerWidth <= 768) {
            if (!document.querySelector('.menu-toggle')) {
                const menuToggle = document.createElement('button');
                menuToggle.className = 'menu-toggle';
                menuToggle.innerHTML = '☰';
                menuToggle.setAttribute('aria-label', 'Menu');
                
                nav.insertBefore(menuToggle, navList);
                
                menuToggle.addEventListener('click', function() {
                    navList.classList.toggle('active');
                    this.innerHTML = navList.classList.contains('active') ? '✕' : '☰';
                });
            }
        }
    }

    // Aplica menu mobile no resize
    window.addEventListener('resize', createMobileMenu);
    createMobileMenu();

    // Efeito de digitação no título principal
    function typeWriter(element, text, speed = 100) {
        if (!element) return;
        
        element.innerHTML = '';
        let i = 0;
        
        function typing() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(typing, speed);
            }
        }
        
        typing();
    }

    // Aplica efeito de digitação no título principal após um delay
    setTimeout(() => {
        const mainTitle = document.querySelector('#home h1');
        if (mainTitle) {
            const originalText = mainTitle.textContent;
            typeWriter(mainTitle, originalText, 80);
        }
    }, 1000);

    console.log('🌟 Site da precodocafe.com.br carregado com sucesso! ☕');
});

// Função para compra de produtos
function buyProduct(productName) {
    // Simula processo de compra
    const confirmPurchase = confirm(`Deseja prosseguir com a compra de:\n\n"${productName}"\n\nVocê será redirecionado para o WhatsApp para finalizar o pedido.`);
    
    if (confirmPurchase) {
        // Mensagem personalizada para WhatsApp
        const message = encodeURIComponent(
            `Olá! Gostaria de comprar o produto:\n\n` +
            `📦 *${productName}*\n\n` +
            `Podem me enviar mais informações sobre preço, forma de pagamento e entrega?\n\n` +
            `Obrigado! ☕`
        );
        
        // Número do WhatsApp da empresa (substitua pelo número real)
        const whatsappNumber = '5527999998888';
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${message}`;
        
        // Abre WhatsApp em nova aba
        window.open(whatsappURL, '_blank');
        
        // Feedback visual
        showPurchaseMessage(`Produto "${productName}" adicionado ao pedido! 🛒`);
    }
}

// Função para mostrar mensagem de compra
function showPurchaseMessage(message) {
    // Remove mensagem anterior se existir
    const existingMessage = document.querySelector('.purchase-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Cria mensagem de sucesso
    const messageDiv = document.createElement('div');
    messageDiv.className = 'purchase-message';
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #4CAF50, #45a049);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        font-weight: 600;
        animation: slideIn 0.3s ease-out;
        max-width: 300px;
        text-align: center;
    `;
    
    messageDiv.textContent = message;
    document.body.appendChild(messageDiv);

    // Remove a mensagem após 3 segundos
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => {
                messageDiv.remove();
            }, 300);
        }
    }, 3000);
}

// Adiciona estilos CSS para animações das mensagens de compra
const purchaseStyles = document.createElement('style');
purchaseStyles.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(purchaseStyles); 

// Função para simular download de materiais técnicos
function downloadFile(fileName) {
    // Confirmar se o usuário quer fazer o download
    const confirmDownload = confirm(`Deseja baixar o material "${fileName}"?\n\nO download será iniciado em seguida e você receberá no seu email uma cópia digital personalizada.`);
    
    if (confirmDownload) {
        // Simular processo de download
        showDownloadProgress(fileName);
        
        // Redirecionar para contato/newsletter após 3 segundos
        setTimeout(() => {
            const contactMessage = `Olá! Gostaria de receber o material técnico "${fileName}" e me cadastrar no boletim mensal da precodocafe.com.br para receber mais conteúdo exclusivo sobre cafeicultura.`;
            const whatsappUrl = `https://wa.me/5527999998888?text=${encodeURIComponent(contactMessage)}`;
            window.open(whatsappUrl, '_blank');
        }, 3000);
    }
}

// Função para mostrar progresso de download
function showDownloadProgress(fileName) {
    // Criar elemento de progresso
    const progressDiv = document.createElement('div');
    progressDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 2rem;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        z-index: 10000;
        text-align: center;
        min-width: 300px;
        border: 3px solid var(--primary-color);
    `;
    
    progressDiv.innerHTML = `
        <div style="margin-bottom: 1rem;">
            <div style="font-size: 3rem; margin-bottom: 0.5rem;">📥</div>
            <h3 style="margin: 0; color: var(--primary-color);">Preparando Download</h3>
            <p style="margin: 0.5rem 0; color: #666; font-size: 0.9rem;">${fileName}</p>
        </div>
        <div style="background: #f0f0f0; border-radius: 10px; overflow: hidden; margin: 1rem 0;">
            <div id="progress-bar" style="background: linear-gradient(90deg, var(--primary-color), var(--accent-color)); height: 8px; width: 0%; transition: width 0.3s ease;"></div>
        </div>
        <p id="progress-text" style="margin: 0; color: #666; font-size: 0.8rem;">Iniciando...</p>
    `;
    
    document.body.appendChild(progressDiv);
    
    // Simular progresso
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    let progress = 0;
    
    const progressInterval = setInterval(() => {
        progress += Math.random() * 20 + 10;
        if (progress > 100) progress = 100;
        
        progressBar.style.width = progress + '%';
        
        if (progress < 30) {
            progressText.textContent = 'Verificando disponibilidade...';
        } else if (progress < 60) {
            progressText.textContent = 'Preparando arquivo personalizado...';
        } else if (progress < 90) {
            progressText.textContent = 'Finalizando download...';
        } else {
            progressText.textContent = 'Download concluído! Redirecionando...';
            progressDiv.querySelector('h3').textContent = 'Sucesso!';
            progressDiv.querySelector('h3').style.color = '#28a745';
            clearInterval(progressInterval);
        }
    }, 200);
    
    // Remover após 3 segundos
    setTimeout(() => {
        document.body.removeChild(progressDiv);
    }, 3200);
} 