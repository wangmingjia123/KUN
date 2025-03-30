// 游戏数据页面的JavaScript
document.addEventListener('DOMContentLoaded', () => {
  createParticles();
  setupPerformanceChart();
  animateElements();
  setupScoreCircles();
});

// 创建粒子背景 (复用主页的功能)
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

// 设置性能图表
function setupPerformanceChart() {
  if (typeof Chart !== 'undefined') {
    const ctx = document.getElementById('performanceChart').getContext('2d');
    
    // 表现数据
    const labels = ['S11', 'S12', 'S13', 'S14', 'S15', 'S16', 'S17', 'S18', 'S19'];
    const data = [0.8, 1.1, 0.9, 0.7, 1.0, 1.2, 1.0, 1.3, 1.2]; // 不同赛季的Rating
    
    // 创建渐变
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(108, 92, 231, 0.8)');
    gradient.addColorStop(1, 'rgba(108, 92, 231, 0.1)');
    
    // 配置图表
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Rating',
          data: data,
          borderColor: '#6c5ce7',
          backgroundColor: gradient,
          borderWidth: 3,
          pointBackgroundColor: '#6c5ce7',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 6,
          tension: 0.3,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: false,
            min: 0.5,
            max: 1.5,
            grid: {
              color: 'rgba(255, 255, 255, 0.05)'
            },
            ticks: {
              color: 'rgba(255, 255, 255, 0.7)'
            }
          },
          x: {
            grid: {
              color: 'rgba(255, 255, 255, 0.05)'
            },
            ticks: {
              color: 'rgba(255, 255, 255, 0.7)'
            }
          }
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            titleColor: '#fff',
            bodyColor: '#fff',
            borderColor: '#6c5ce7',
            borderWidth: 1,
            displayColors: false,
            callbacks: {
              label: function(context) {
                return `Rating: ${context.raw}`;
              }
            }
          }
        }
      }
    });
  }
}

// 设置评分圆环
function setupScoreCircles() {
  const circles = document.querySelectorAll('.score-circle');
  
  circles.forEach((circle, index) => {
    // 获取分数值
    const valueElement = circle.querySelector('.circle-value');
    const value = parseFloat(valueElement.textContent);
    
    // 计算角度 (满分为10分或者2分)
    let angle;
    if (index === 0) { // WE评分，满分10分
      angle = (value / 10) * 360;
    } else { // Rating，满分约2分
      angle = (value / 2) * 360;
    }
    
    // 设置渐变角度
    circle.style.background = `conic-gradient(var(--accent-gradient) ${angle}deg, rgba(255, 255, 255, 0.1) 0deg)`;
  });
}

// 动画效果
function animateElements() {
  if (typeof gsap !== 'undefined') {
    // 初始设置
    gsap.set('.page-header', { opacity: 0, y: -20 });
    gsap.set('.profile-card', { opacity: 0, y: 20 });
    gsap.set('.stats-card', { opacity: 0, y: 30 });
    
    // 创建时间线
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    // 添加动画
    tl.to('.page-header', { opacity: 1, y: 0, duration: 0.8 })
      .to('.profile-card', { opacity: 1, y: 0, duration: 0.8 })
      .to('.stats-card', { 
        opacity: 1, 
        y: 0, 
        duration: 0.8,
        stagger: 0.2
      }, '-=0.4');
      
    // 武器项目动画
    gsap.from('.weapon-item', {
      opacity: 0,
      x: -30,
      stagger: 0.15,
      duration: 0.5,
      scrollTrigger: {
        trigger: '.weapon-stats',
        start: 'top 80%',
      }
    });
    
    // 地图项目动画
    gsap.from('.map-item', {
      opacity: 0,
      x: -30,
      stagger: 0.15,
      duration: 0.5,
      scrollTrigger: {
        trigger: '.map-stats',
        start: 'top 80%',
      }
    });
    
    // 库存项目动画
    gsap.from('.inventory-item', {
      opacity: 0,
      y: 20,
      stagger: 0.15,
      duration: 0.5,
      scrollTrigger: {
        trigger: '.inventory-preview',
        start: 'top 80%',
      }
    });
    
    // 设备项目动画
    gsap.from('.setup-item-card', {
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 0.5,
      scrollTrigger: {
        trigger: '.setup-preview',
        start: 'top 80%',
      }
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
      const rotateX = (y - rect.height / 2) / 30;
      const rotateY = (rect.width / 2 - x) / 30;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(5px)`;
    } else {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    }
  });
}); 