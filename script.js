// Contador regressivo
function startCountdown() {
    // Define a data final (3 horas, 59 minutos e 32 segundos a partir de agora)
    const now = new Date();
    let targetTime = new Date(now);
    targetTime.setHours(now.getHours() + 3);
    targetTime.setMinutes(now.getMinutes() + 59);
    targetTime.setSeconds(now.getSeconds() + 32);
    
    // Atualiza o contador a cada segundo
    const countdownInterval = setInterval(function() {
        // Obtém a hora atual
        const currentTime = new Date();
        
        // Calcula a diferença em milissegundos
        const difference = targetTime - currentTime;
        
        // Se o contador chegou a zero, para a atualização
        if (difference <= 0) {
            clearInterval(countdownInterval);
            document.querySelector('.countdown').innerHTML = "Oferta encerrada!";
            return;
        }
        
        // Calcula horas, minutos e segundos restantes
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        // Formata os números para sempre terem dois dígitos
        const formattedHours = String(hours).padStart(2, '0');
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');
        
        // Atualiza o HTML do contador
        document.querySelector('.countdown').innerHTML = 
            `<span>${formattedHours}</span>horas:<span>${formattedMinutes}</span>minutos:<span>${formattedSeconds}</span>segundos`;
    }, 1000);
}

// Efeito de scroll suave para links internos
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Animação de elementos ao rolar a página
function setupScrollAnimations() {
    const elements = document.querySelectorAll('.feature, .bonus-list li, .for-who-list li');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

// Sistema de notificações de compras
function setupPurchaseNotifications() {
    // Lista de nomes femininos
    const femaleNames = [
        "Ana", "Maria", "Juliana", "Fernanda", "Camila", "Beatriz", "Larissa", "Gabriela", 
        "Mariana", "Patrícia", "Aline", "Bianca", "Carla", "Daniela", "Eduarda", "Flávia", 
        "Giovanna", "Helena", "Isabela", "Jéssica", "Karina", "Letícia", "Mônica", "Natália", 
        "Olívia", "Paula", "Renata", "Sabrina", "Tatiana", "Vanessa", "Bruna", "Amanda", 
        "Débora", "Elisa", "Fabiana", "Gisele", "Heloísa", "Ingrid", "Joana", "Luana"
    ];
    
    // Mensagens de notificação com emojis
    const notificationMessages = [
        { text: "{nome} garantiu o ebook agora mesmo!", emoji: "📚" },
        { text: "{nome} acabou de receber o ebook no email!", emoji: "✉️" },
        { text: "Mais uma mamãe garantiu suas receitas!", emoji: "👶" }
    ];
    
    // Cria o elemento de notificação se não existir
    if (!document.querySelector('.purchase-notification')) {
        const notificationElement = document.createElement('div');
        notificationElement.className = 'purchase-notification';
        document.body.appendChild(notificationElement);
    }
    
    // Cria o elemento de áudio para a notificação
    const notificationSound = new Audio();
    notificationSound.src = 'https://assets.mixkit.co/sfx/preview/mixkit-software-interface-alert-2573.mp3';
    notificationSound.volume = 0.5; // Volume a 50%
    
    // Variável para controlar se o som está habilitado
    let soundEnabled = false;
    
    // Configura o botão de ativar som
    const soundToggleButton = document.getElementById('enableSound');
    if (soundToggleButton) {
        soundToggleButton.addEventListener('click', function() {
            soundEnabled = !soundEnabled;
            this.classList.toggle('sound-enabled');
            
            if (soundEnabled) {
                this.title = 'Desativar notificações sonoras';
                // Toca um som para testar e permitir que o navegador desbloqueie o áudio
                notificationSound.play().then(() => {
                    console.log('Som de notificação ativado!');
                }).catch(error => {
                    console.log('Erro ao ativar som:', error);
                });
            } else {
                this.title = 'Ativar notificações sonoras';
            }
        });
    }
    
    // Função para mostrar uma notificação
    function showNotification() {
        // Seleciona um nome aleatório
        const randomName = femaleNames[Math.floor(Math.random() * femaleNames.length)];
        
        // Seleciona uma mensagem aleatória
        const randomMessageObj = notificationMessages[Math.floor(Math.random() * notificationMessages.length)];
        
        // Substitui o placeholder pelo nome
        const messageText = randomMessageObj.text.replace('{nome}', randomName);
        const emoji = randomMessageObj.emoji;
        
        // Obtém o elemento de notificação
        const notificationElement = document.querySelector('.purchase-notification');
        
        // Define o conteúdo da notificação
        notificationElement.innerHTML = `<span class="notification-emoji">${emoji}</span> ${messageText}`;
        
        // Toca o som de notificação se estiver habilitado
        if (soundEnabled) {
            notificationSound.currentTime = 0; // Reinicia o som
            notificationSound.play().catch(error => {
                console.log('Erro ao reproduzir som de notificação:', error);
            });
        }
        
        // Adiciona a classe para mostrar a notificação
        notificationElement.classList.add('show');
        
        // Remove a classe após 5 segundos
        setTimeout(() => {
            notificationElement.classList.remove('show');
        }, 5000);
    }
    
    // Mostra a primeira notificação após 5 segundos
    setTimeout(showNotification, 5000);
    
    // Configura o intervalo para mostrar notificações a cada 35 segundos
    setInterval(showNotification, 35000);
}

// O carrossel de rolagem agora é puramente CSS, não precisa de JavaScript

// Funcionalidade do carrossel em fade para os bônus
function setupFadeCarousel() {
    const images = document.querySelectorAll('.fade-image');
    if (images.length === 0) return;
    
    let currentImage = 0;
    const totalImages = images.length;
    
    // Função para trocar para a próxima imagem
    function nextImage() {
        // Remove classe active da imagem atual
        images[currentImage].classList.remove('active');
        
        // Vai para a próxima imagem (volta para a primeira quando chegar na última)
        currentImage = (currentImage + 1) % totalImages;
        
        // Adiciona classe active na nova imagem
        images[currentImage].classList.add('active');
    }
    
    // Troca de imagem automaticamente a cada 3 segundos
    setInterval(nextImage, 3000);
}

// Configuração dos eventos do Utmify
function setupUtmifyEvents() {
    // Seleciona todos os botões CTA
    const ctaButtons = document.querySelectorAll('.vsl-button, .hero-cta-button, .secondary-cta-button, .guarantee-cta-button, .cta-button');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Método 1: Usando a API do Utmify (se disponível)
            if (window.utmify && window.utmify.conversion) {
                window.utmify.conversion({
                    event: 'purchase',
                    value: 27.90,
                        currency: 'BRL',
                    product_name: 'Comidinhas do Bebê - eBook',
                    button_text: this.textContent.trim()
                });
                console.log('Evento Utmify (API) disparado:', this.textContent.trim());
            }
            
            // Método 2: Usando postMessage (método alternativo mais compatível)
            try {
                window.postMessage({
                    type: 'UTMIFY_CONVERSION',
                    data: {
                        event: 'purchase',
                        value: 27.90,
                        currency: 'BRL',
                        product_name: 'Comidinhas do Bebê - eBook',
                        button_text: this.textContent.trim(),
                        pixel_id: '6893ea38a4c56ba5bfdd9286'
                    }
                }, '*');
                console.log('Evento Utmify (postMessage) disparado:', this.textContent.trim());
            } catch (error) {
                console.log('Erro ao enviar evento Utmify:', error);
            }
            
            // Método 3: Fazendo uma requisição direta para o endpoint do Utmify
            try {
                fetch('https://api.utmify.com.br/v1/conversions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        pixel_id: '6893ea38a4c56ba5bfdd9286',
                        event: 'purchase',
                        value: 27.90,
                        currency: 'BRL',
                        product_name: 'Comidinhas do Bebê - eBook',
                        url: window.location.href,
                        user_agent: navigator.userAgent,
                        timestamp: new Date().toISOString()
                    })
                }).then(response => {
                    if (response.ok) {
                        console.log('Conversão Utmify enviada com sucesso via API!');
                    }
                }).catch(error => {
                    console.log('Erro na API Utmify:', error);
                });
            } catch (error) {
                console.log('Erro ao fazer requisição para Utmify:', error);
            }
        });
    });
    
    console.log('Eventos Utmify configurados com sucesso!');
}



// Configuração dos eventos do Facebook Pixel
function setupFacebookPixelEvents() {
    // Verifica se o fbq está disponível
    if (typeof fbq === 'undefined') {
        console.log('Facebook Pixel não está carregado');
        return;
    }
    
    // Seleciona todos os botões CTA
    const ctaButtons = document.querySelectorAll('.vsl-button, .hero-cta-button, .secondary-cta-button, .guarantee-cta-button, .cta-button');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Dispara evento de conversão
            fbq('track', 'InitiateCheckout', {
                content_name: 'Comidinhas do Bebê - eBook',
                content_category: 'eBook',
                value: 27.90,
                currency: 'BRL'
            });
            
            // Dispara evento personalizado
            fbq('trackCustom', 'CTAClick', {
                button_text: this.textContent.trim(),
                button_class: this.className
            });
            
            console.log('Evento Facebook Pixel disparado:', this.textContent.trim());
        });
    });
    
    // Evento para rastrear scroll até 50% da página
    let scrollTracked = false;
    window.addEventListener('scroll', function() {
        if (!scrollTracked && window.scrollY > document.body.scrollHeight * 0.5) {
            fbq('trackCustom', 'ScrollDepth50');
            scrollTracked = true;
            console.log('Evento Facebook Pixel: ScrollDepth50');
        }
    });
    
    // Evento para rastrear visualização do vídeo
    const videoContainer = document.querySelector('.video-container');
    if (videoContainer) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    fbq('trackCustom', 'VideoView', {
                        video_type: 'VSL',
                        video_duration: '90_seconds'
                    });
                    console.log('Evento Facebook Pixel: VideoView');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(videoContainer);
    }
}

// Inicializa as funções quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    startCountdown();
    setupSmoothScroll();
    setupScrollAnimations();
    setupPurchaseNotifications();
    setupFadeCarousel();
    setupFacebookPixelEvents();
    setupUtmifyEvents();
    
    // Adiciona classe de animação aos elementos que devem ter animação
    document.querySelectorAll('.feature, .bonus-list li, .for-who-list li, .video-container').forEach(element => {
        element.classList.add('animate-on-scroll');
    });
});

// Adiciona efeito de hover ao botão CTA
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('mouseover', function() {
        this.textContent = "GARANTIR MEU EBOOK AGORA!";
    });
    
    ctaButton.addEventListener('mouseout', function() {
        this.textContent = "QUERO COMPRAR AGORA!";
    });
}

// Adiciona efeito de hover ao botão da VSL
const vslButton = document.querySelector('.vsl-button');
if (vslButton) {
    vslButton.addEventListener('mouseover', function() {
        this.textContent = "QUERO GARANTIR MEU EBOOK AGORA!";
    });
    
    vslButton.addEventListener('mouseout', function() {
        this.textContent = "QUERO TRANSFORMAR A ALIMENTAÇÃO DO MEU BEBÊ!";
    });
}