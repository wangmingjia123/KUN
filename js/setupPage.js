// 游戏设置页面JavaScript
document.addEventListener('DOMContentLoaded', () => {
  createParticles();
  setupTabs();
  setupCrosshairActions();
  animateElements();
});

// 创建粒子背景 (复用其他页面的功能)
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

// 设置标签页
function setupTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tabId = button.dataset.tab;
      
      // 移除所有active类
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));
      
      // 添加active类到当前按钮和内容
      button.classList.add('active');
      document.getElementById(tabId).classList.add('active');
      
      // 滚动到选项卡内容
      document.getElementById(tabId).scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

// 设置准星相关操作
function setupCrosshairActions() {
  const copyButton = document.querySelector('.copy-btn');
  const downloadButton = document.querySelector('.download-btn');
  const crosshairCode = document.querySelector('.config-code pre');
  
  if (copyButton && crosshairCode) {
    copyButton.addEventListener('click', () => {
      const codeText = crosshairCode.textContent;
      navigator.clipboard.writeText(codeText)
        .then(() => {
          // 显示复制成功提示
          const originalText = copyButton.innerHTML;
          copyButton.innerHTML = '<i class="fas fa-check"></i><span>复制成功</span>';
          
          setTimeout(() => {
            copyButton.innerHTML = originalText;
          }, 2000);
        })
        .catch(err => {
          console.error('无法复制文本: ', err);
          alert('复制失败，请手动复制代码');
        });
    });
  }
  
  if (downloadButton) {
    downloadButton.addEventListener('click', () => {
      // 创建准星配置文件
      const configContent = `// Wang Ming CSGO 准星配置
// 创建于 ${new Date().toLocaleDateString()}

${crosshairCode.textContent}

// 保存此文件为 crosshair.cfg
// 在游戏中使用控制台命令: exec crosshair.cfg
`;
      
      // 创建下载链接
      const blob = new Blob([configContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'crosshair.cfg';
      document.body.appendChild(a);
      a.click();
      
      // 清理
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 100);
      
      // 显示下载成功提示
      const originalText = downloadButton.innerHTML;
      downloadButton.innerHTML = '<i class="fas fa-check"></i><span>下载成功</span>';
      
      setTimeout(() => {
        downloadButton.innerHTML = originalText;
      }, 2000);
    });
  }
}

// 页面动画效果
function animateElements() {
  if (typeof gsap !== 'undefined') {
    // 初始设置
    gsap.set('.page-header', { opacity: 0, y: -20 });
    gsap.set('.setup-intro', { opacity: 0, y: 20 });
    gsap.set('.setup-tabs', { opacity: 0 });
    gsap.set('.tab-content', { opacity: 0 });
    gsap.set('.advice-card', { opacity: 0, y: 20 });
    
    // 创建时间线
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    // 添加动画
    tl.to('.page-header', { opacity: 1, y: 0, duration: 0.6 })
      .to('.setup-intro', { opacity: 1, y: 0, duration: 0.8 })
      .to('.setup-tabs', { opacity: 1, duration: 0.5 })
      .to('.tab-content.active', { opacity: 1, duration: 0.5 });
      
    // 硬件卡片动画
    gsap.from('.hardware-card', {
      opacity: 0,
      y: 30,
      stagger: 0.1,
      duration: 0.5,
      scrollTrigger: {
        trigger: '.hardware-grid',
        start: 'top 80%',
      }
    });
    
    // 高亮项目动画
    gsap.from('.highlight-item', {
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 0.5,
      scrollTrigger: {
        trigger: '.setup-highlights',
        start: 'top 80%',
      }
    });
    
    // 建议卡片动画
    gsap.to('.advice-card', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: '.advice-section',
        start: 'top 80%',
      }
    });
    
    // 建议列表项动画
    gsap.from('.advice-list li', {
      opacity: 0,
      x: -30,
      stagger: 0.1,
      duration: 0.5,
      scrollTrigger: {
        trigger: '.advice-list',
        start: 'top 90%',
      }
    });
  } else {
    // 简单的CSS动画
    document.querySelector('.page-header').classList.add('fade-in');
    document.querySelector('.setup-intro').classList.add('fade-in');
    document.querySelector('.setup-tabs').classList.add('fade-in');
    document.querySelector('.tab-content.active').classList.add('fade-in');
    document.querySelector('.advice-card').classList.add('fade-in');
  }
  
  // 添加准星悬停动画
  const crosshairImage = document.querySelector('.crosshair-image');
  if (crosshairImage) {
    crosshairImage.addEventListener('mousemove', (e) => {
      const rect = crosshairImage.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // 计算位移量，限制范围以避免过度移动
      const moveX = (x - rect.width / 2) / 10;
      const moveY = (y - rect.height / 2) / 10;
      
      // 应用微小移动以模拟游戏中的准星跟随
      crosshairImage.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
    
    crosshairImage.addEventListener('mouseleave', () => {
      // 重置位置
      crosshairImage.style.transform = 'translate(0, 0)';
    });
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
      const rotateX = (y - rect.height / 2) / 20;
      const rotateY = (rect.width / 2 - x) / 20;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
      card.style.zIndex = '10';
    } else {
      card.style.transform = '';
      card.style.zIndex = '1';
    }
  });
}); 