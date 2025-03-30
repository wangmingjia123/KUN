// 创建粒子背景
document.addEventListener('DOMContentLoaded', () => {
  createParticles();
  animateCards();
});

function createParticles() {
  const particlesContainer = document.querySelector('.particles');
  const particleCount = window.innerWidth < 768 ? 50 : 100;
  
  for (let i = 0; i < particleCount; i++) {
    createParticle(particlesContainer);
  }
}

function createParticle(container) {
  const particle = document.createElement('div');
  
  // 设置粒子样式
  particle.style.position = 'absolute';
  particle.style.width = `${Math.random() * 3 + 1}px`;
  particle.style.height = particle.style.width;
  particle.style.background = getRandomColor();
  particle.style.borderRadius = '50%';
  particle.style.opacity = Math.random() * 0.5 + 0.2;
  
  // 随机位置
  const posX = Math.random() * 100;
  const posY = Math.random() * 100;
  particle.style.left = `${posX}%`;
  particle.style.top = `${posY}%`;
  
  // 添加动画
  const duration = Math.random() * 30 + 20;
  const delay = Math.random() * 5;
  
  particle.style.animation = `floatParticle ${duration}s linear ${delay}s infinite`;
  
  // 添加到容器
  container.appendChild(particle);
  
  // 定义动画
  const keyframes = `
    @keyframes floatParticle {
      0% {
        transform: translate(0, 0) rotate(0deg);
      }
      33% {
        transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(120deg);
      }
      66% {
        transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(240deg);
      }
      100% {
        transform: translate(0, 0) rotate(360deg);
      }
    }
  `;
  
  // 添加动画样式到head
  const styleElement = document.createElement('style');
  styleElement.textContent = keyframes;
  document.head.appendChild(styleElement);
}

function getRandomColor() {
  const colors = [
    'rgba(108, 92, 231, 0.7)',
    'rgba(0, 184, 148, 0.7)',
    'rgba(253, 121, 168, 0.6)',
    'rgba(95, 39, 205, 0.6)'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

// 页面滚动动画
function animateCards() {
  // 使用GSAP动画库
  if (typeof gsap !== 'undefined') {
    // 初始设置
    gsap.set('.glass-card', { opacity: 0, y: 30 });
    gsap.set('.social-icon', { scale: 0, opacity: 0 });
    gsap.set('.about-btn', { opacity: 0, y: 10 });
    
    // 定义时间线
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    // 添加动画
    tl.to('.profile', { opacity: 1, y: 0, duration: 0.8 })
      .to('.about', { opacity: 1, y: 0, duration: 0.8 }, '-=0.4')
      .to('.skills', { opacity: 1, y: 0, duration: 0.8 }, '-=0.4')
      .to('.social-icon', { 
        scale: 1, 
        opacity: 1, 
        stagger: 0.15,
        duration: 0.5,
        ease: 'back.out(1.7)'
      }, '-=0.8')
      .from('.social-info', { 
        opacity: 0, 
        y: 20, 
        stagger: 0.15,
        duration: 0.6 
      }, '-=0.2')
      .to('.about-btn', {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: 'power2.out'
      }, '-=0.3');
      
    // 技能条动画
    gsap.from('.skill-level', {
      scaleX: 0,
      duration: 1.5,
      stagger: 0.2,
      ease: 'power2.out',
      delay: 1
    });
  }
}

// 添加悬停效果
document.addEventListener('mousemove', (e) => {
  const cards = document.querySelectorAll('.glass-card');
  
  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    if (x > 0 && x < rect.width && y > 0 && y < rect.height) {
      const rotateX = (y - rect.height / 2) / 20;
      const rotateY = (rect.width / 2 - x) / 20;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    } else {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    }
  });
}); 