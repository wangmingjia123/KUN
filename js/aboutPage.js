// 关于页面的JavaScript
document.addEventListener('DOMContentLoaded', () => {
  createParticles();
  setupTabs();
  animateElements();
  handleHashNavigation();
});

// 处理URL哈希导航
function handleHashNavigation() {
  // 获取URL中的哈希值
  const hash = window.location.hash.substring(1);
  
  if (hash) {
    // 如果存在哈希值，切换到对应的标签
    const tabBtn = document.querySelector(`.tab-btn[data-tab="${hash}"]`);
    
    if (tabBtn) {
      // 模拟点击对应的标签按钮
      setTimeout(() => {
        tabBtn.click();
      }, 500); // 延迟执行，确保页面已经加载完成
    }
  }
}

// 粒子背景 (复用主页的功能)
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

// 标签切换功能
function setupTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // 移除所有active类
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));
      
      // 添加active类到当前选中的标签
      button.classList.add('active');
      const tabId = button.getAttribute('data-tab');
      document.getElementById(tabId).classList.add('active');
      
      // 动画处理
      animateTabContent(tabId);
    });
  });
}

// 标签内容动画
function animateTabContent(tabId) {
  if (typeof gsap !== 'undefined') {
    switch(tabId) {
      case 'gallery':
        gsap.fromTo('.gallery-item', 
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, stagger: 0.1, duration: 0.5, ease: 'power2.out' }
        );
        break;
        
      case 'interests':
        gsap.fromTo('.interest-item', 
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, stagger: 0.1, duration: 0.5, ease: 'back.out(1.2)' }
        );
        break;
        
      case 'journey':
        gsap.fromTo('.timeline-item', 
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, stagger: 0.15, duration: 0.6, ease: 'power2.out' }
        );
        break;
        
      case 'personal':
      default:
        gsap.fromTo('.bio-text p', 
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, stagger: 0.1, duration: 0.5 }
        );
        gsap.fromTo('.philosophy-list li', 
          { opacity: 0, x: -10 },
          { opacity: 1, x: 0, stagger: 0.1, duration: 0.5, delay: 0.3 }
        );
        break;
    }
  }
}

// 页面元素动画
function animateElements() {
  if (typeof gsap !== 'undefined') {
    // 初始设置
    gsap.set('.glass-card', { opacity: 0, y: 30 });
    gsap.set('.page-header', { opacity: 0, y: -20 });
    
    // 创建时间线
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    // 添加动画
    tl.to('.page-header', { opacity: 1, y: 0, duration: 0.8 })
      .to('.profile-extended', { opacity: 1, y: 0, duration: 0.8 })
      .fromTo('.avatar-container.large', 
        { scale: 0.8, opacity: 0.5 },
        { scale: 1, opacity: 1, duration: 0.6 },
        '-=0.4'
      )
      .fromTo('.profile-quote', 
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        '-=0.2'
      )
      .fromTo('.tabs', 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 },
        '-=0.3'
      );
    
    // 激活初始标签的动画
    setTimeout(() => {
      animateTabContent('personal');
    }, 1200);
  }
}

// 添加3D卡片效果
document.addEventListener('mousemove', (e) => {
  const cards = document.querySelectorAll('.glass-card');
  
  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    if (x > 0 && x < rect.width && y > 0 && y < rect.height) {
      const rotateX = (y - rect.height / 2) / 30;
      const rotateY = (rect.width / 2 - x) / 30;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(5px)`;
    } else {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    }
  });
}); 