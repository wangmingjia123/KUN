// 精彩集锦页面JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // 加载GSAP库
  if (typeof gsap === 'undefined') {
    const gsapScript = document.createElement('script');
    gsapScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/gsap.min.js';
    gsapScript.onload = initPage;
    document.head.appendChild(gsapScript);
  } else {
    initPage();
  }
  
  // 页面初始化
  function initPage() {
    createParticles();
    setupVideoFilterButtons();
    setupSortOptions();
    setupVideoInteractions();
    setupMainVideoPlaceholder();
    animateElements();
    setupThumbnailDisplay();
    initStatsAnimation();
    initEquipmentCards();
    initTournamentItems();
  }

  // 创建粒子背景
  function createParticles() {
    // 实现粒子背景效果
    const particlesContainer = document.querySelector('.particles');
    if (!particlesContainer) return;
    
    const particleCount = window.innerWidth < 768 ? 50 : 100;
    
    for (let i = 0; i < particleCount; i++) {
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
      particlesContainer.appendChild(particle);
      
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
  }
  
  // 获取随机颜色
  function getRandomColor() {
    const colors = [
      'rgba(108, 92, 231, 0.7)',
      'rgba(0, 184, 148, 0.7)',
      'rgba(253, 121, 168, 0.6)',
      'rgba(95, 39, 205, 0.6)'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }
  
  // 设置视频筛选按钮
  function setupVideoFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const videoCards = document.querySelectorAll('.video-card');
    
    if (!filterButtons.length || !videoCards.length) return;
    
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // 移除其他按钮的active状态
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // 给当前按钮添加active状态
        button.classList.add('active');
        
        // 获取过滤条件
        const filter = button.dataset.filter;
        
        // 过滤视频卡片
        videoCards.forEach(card => {
          if (filter === 'all' || card.dataset.category === filter) {
            card.style.display = '';
            
            // 动画显示
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 50);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            // 等待动画完成后隐藏
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }
  
  // 设置排序选项
  function setupSortOptions() {
    const sortSelect = document.getElementById('sortSelect');
    const videoContainer = document.querySelector('.video-grid');
    
    if (!sortSelect || !videoContainer) return;
    
    sortSelect.addEventListener('change', () => {
      const sortValue = sortSelect.value;
      const videoCards = Array.from(document.querySelectorAll('.video-card'));
      
      videoCards.sort((a, b) => {
        switch(sortValue) {
          case 'date-desc':
            return new Date(b.dataset.date) - new Date(a.dataset.date);
          case 'date-asc':
            return new Date(a.dataset.date) - new Date(b.dataset.date);
          case 'views-desc':
            return parseInt(b.dataset.views) - parseInt(a.dataset.views);
          case 'views-asc':
            return parseInt(a.dataset.views) - parseInt(b.dataset.views);
          default:
            return 0;
        }
      });
      
      // 清空容器
      videoContainer.innerHTML = '';
      
      // 重新添加排序后的卡片
      videoCards.forEach(card => {
        videoContainer.appendChild(card);
      });
      
      // 添加淡入动画
      animateVideoCards();
    });
  }
  
  // 动画元素
  function animateElements() {
    // 页面标题动画
    gsap.from('.page-title', {
      opacity: 0,
      y: -30,
      duration: 0.8,
      ease: 'power3.out'
    });
    
    // 过滤按钮动画
    gsap.from('.filter-buttons .filter-btn', {
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 0.5,
      delay: 0.3,
      ease: 'power2.out'
    });
    
    // 主视频区域动画
    gsap.from('.main-video', {
      opacity: 0,
      scale: 0.95,
      duration: 1,
      delay: 0.2,
      ease: 'power2.out'
    });
    
    // 视频卡片动画
    animateVideoCards();
  }
  
  // 视频卡片动画
  function animateVideoCards() {
    gsap.from('.video-card', {
      opacity: 0,
      y: 30,
      stagger: 0.1,
      duration: 0.6,
      delay: 0.5,
      ease: 'power2.out'
    });
  }
  
  // 设置主页视频区域
  function setupMainVideoPlaceholder() {
    const mainVideoContainer = document.getElementById('mainVideoContainer');
    const videoModal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');
    const modalVideoTitle = document.getElementById('modalVideoTitle');
    const modalVideoDescription = document.getElementById('modalVideoDescription');
    const mainVideoTitle = document.getElementById('videoTitle');
    const mainVideoDescription = document.getElementById('videoDescription');
    const mainVideoThumb = document.getElementById('mainVideoThumb');
    
    if (!mainVideoContainer || !videoModal || !modalVideo || !mainVideoThumb) return;
    
    // 检查初始图片的比例并设置适当的样式
    checkImageRatio(mainVideoThumb.src, mainVideoContainer);
    
    mainVideoContainer.addEventListener('click', () => {
      // 获取第一个视频作为默认视频，或使用当前显示的视频信息
      const firstVideoCard = document.querySelector('.video-card');
      
      if (firstVideoCard) {
        // 视频源
        const videoSrc = firstVideoCard.dataset.video || 'video/video.mp4';
        
        // 更新弹窗标题和描述（使用主视频区域的信息）
        modalVideoTitle.textContent = mainVideoTitle.textContent;
        modalVideoDescription.textContent = mainVideoDescription.textContent;
        
        // 更新日期和观看次数
        const mainVideoDate = document.querySelector('.video-meta span:nth-child(1)').innerHTML;
        const mainVideoViews = document.querySelector('.video-meta span:nth-child(2)').innerHTML;
        document.getElementById('modalVideoDate').innerHTML = mainVideoDate;
        document.getElementById('modalVideoViews').innerHTML = mainVideoViews;
        
        // 更新视频源
        const videoSource = modalVideo.querySelector('source');
        videoSource.src = videoSrc;
        
        // 设置海报（使用当前显示的主视频缩略图）
        if (mainVideoThumb) {
          modalVideo.poster = mainVideoThumb.src;
        }
        
        // 加载视频
        modalVideo.load();
        
        // 添加动画效果
        gsap.fromTo(videoModal, 
          { opacity: 0 }, 
          { opacity: 1, duration: 0.3, ease: 'power2.out' }
        );
        
        gsap.fromTo('.video-modal-content', 
          { scale: 0.7, y: 20 }, 
          { scale: 1, y: 0, duration: 0.4, ease: 'back.out(1.7)' }
        );
        
        // 显示弹窗
        videoModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // 防止滚动
        
        // 设置播放请求标志
        pendingPlayRequest = true;
      }
    });
  }
  
  // 检查图片比例并设置适当的样式
  function checkImageRatio(imgSrc, container) {
    if (!imgSrc || !container) return;
    
    const img = new Image();
    img.onload = function() {
      const ratio = this.width / this.height;
      // 如果图片比例与容器差异过大，则使用contain模式
      if (ratio > 2 || ratio < 0.5) {
        container.classList.add('fit-contain');
      } else {
        container.classList.remove('fit-contain');
      }
    };
    img.src = imgSrc;
  }
  
  // 设置视频交互
  function setupVideoInteractions() {
    const videoCards = document.querySelectorAll('.video-card');
    const videoModal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');
    const modalClose = document.querySelector('.close-modal');
    const mainVideoThumb = document.getElementById('mainVideoThumb');
    const mainVideoContainer = document.getElementById('mainVideoContainer');
    
    if (!videoCards.length || !videoModal || !modalVideo) return;
    
    // 设置视频加载和错误处理
    modalVideo.addEventListener('loadstart', function() {
      console.log('视频开始加载');
      // 添加加载指示器
      const loadingIndicator = document.createElement('div');
      loadingIndicator.className = 'video-loading-indicator';
      loadingIndicator.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
      modalVideo.parentNode.appendChild(loadingIndicator);
    });
    
    // 设置视频显示模式切换
    const toggleFitMode = document.getElementById('toggleFitMode');
    if (toggleFitMode) {
      toggleFitMode.addEventListener('click', function(e) {
        e.stopPropagation(); // 防止关闭模态框
        modalVideo.classList.toggle('fit-cover');
        this.textContent = modalVideo.classList.contains('fit-cover') ? 
          '显示全部' : '填充模式';
      });
    }
    
    let pendingPlayRequest = false;
    
    modalVideo.addEventListener('loadeddata', function() {
      console.log('视频数据已加载');
      modalVideo.style.opacity = '1'; // 确保视频可见
      
      // 移除加载指示器
      const loadingIndicator = modalVideo.parentNode.querySelector('.video-loading-indicator');
      if (loadingIndicator) {
        loadingIndicator.remove();
      }
      
      // 如果有待处理的播放请求，执行播放
      if (pendingPlayRequest) {
        pendingPlayRequest = false;
        // 尝试播放视频
        setTimeout(() => {
          const playPromise = modalVideo.play();
          if (playPromise !== undefined) {
            playPromise.catch(error => {
              console.error('视频播放失败:', error);
            });
          }
        }, 100);
      }
    });
    
    modalVideo.addEventListener('playing', function() {
      console.log('视频开始播放');
      modalVideo.style.opacity = '1';
    });
    
    modalVideo.addEventListener('error', function(e) {
      console.error('视频加载错误:', e);
      // 移除加载指示器
      const loadingIndicator = modalVideo.parentNode.querySelector('.video-loading-indicator');
      if (loadingIndicator) {
        loadingIndicator.remove();
      }
      
      // 显示错误消息
      const errorMsg = document.createElement('div');
      errorMsg.className = 'video-error-message';
      errorMsg.innerHTML = '视频加载失败，请重试';
      modalVideo.parentNode.appendChild(errorMsg);
      
      // 3秒后移除错误消息
      setTimeout(() => {
        const errorMsg = modalVideo.parentNode.querySelector('.video-error-message');
        if (errorMsg) {
          errorMsg.remove();
        }
      }, 3000);
      
      // 尝试重新加载
      setTimeout(() => {
        const currentSrc = modalVideo.querySelector('source').src;
        modalVideo.querySelector('source').src = currentSrc;
        modalVideo.load();
      }, 200);
    });
    
    // 视频卡片点击处理
    videoCards.forEach(card => {
      card.addEventListener('click', () => {
        // 获取视频数据
        const videoSrc = card.dataset.video || 'video/video.mp4';
        const videoTitle = card.querySelector('.video-card-title').textContent;
        const videoDate = card.querySelector('.video-card-date').textContent;
        const videoViews = card.querySelector('.video-card-views').textContent;
        const videoDesc = card.querySelector('.video-card-desc').textContent;
        
        // 获取缩略图（从背景图获取）
        const thumbnailEl = card.querySelector('.thumbnail-image');
        const thumbBgImage = thumbnailEl ? window.getComputedStyle(thumbnailEl).backgroundImage : '';
        const videoThumb = thumbBgImage.replace(/^url\(['"]?/, '').replace(/['"]?\)$/, '') || 'images/vid1.jpg';
        
        // 重置视频
        modalVideo.pause();
        modalVideo.style.opacity = '0.3'; // 减少初始透明度以便显示加载状态
        modalVideo.currentTime = 0;
        
        // 更新主视频缩略图
        if (mainVideoThumb) {
          mainVideoThumb.src = videoThumb;
          // 检查并调整主视频区域的图片显示方式
          checkImageRatio(videoThumb, mainVideoContainer);
        }
        
        // 更新弹窗信息
        document.getElementById('modalVideoTitle').textContent = videoTitle;
        document.getElementById('modalVideoDate').innerHTML = videoDate;
        document.getElementById('modalVideoViews').innerHTML = videoViews;
        document.getElementById('modalVideoDescription').textContent = videoDesc;
        
        // 更新视频源
        const videoSource = modalVideo.querySelector('source');
        videoSource.src = videoSrc;
        modalVideo.poster = videoThumb;
        
        // 确保加载是在显示模态窗口之前
        modalVideo.load();
        
        // 添加动画效果
        gsap.fromTo(videoModal, 
          { opacity: 0 }, 
          { opacity: 1, duration: 0.3, ease: 'power2.out' }
        );
        
        gsap.fromTo('.video-modal-content', 
          { scale: 0.7, y: 20 }, 
          { scale: 1, y: 0, duration: 0.4, ease: 'back.out(1.7)' }
        );
        
        // 显示弹窗
        videoModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // 防止滚动
        
        // 更新主视频区域信息
        if (document.getElementById('videoTitle')) {
          document.getElementById('videoTitle').textContent = videoTitle;
        }
        if (document.getElementById('videoDescription')) {
          document.getElementById('videoDescription').textContent = videoDesc;
        }
        
        const metaSpans = document.querySelectorAll('.video-meta span');
        if (metaSpans.length >= 2) {
          metaSpans[0].innerHTML = videoDate;
          metaSpans[1].innerHTML = videoViews;
        }
        
        // 设置播放请求标志
        pendingPlayRequest = true;
      });
    });
    
    // 关闭弹窗功能
    function closeModal() {
      if (modalVideo) {
        modalVideo.pause();
        // 重置视频状态
        modalVideo.currentTime = 0;
        // 通过延迟清除源，确保下次播放时重新加载
        setTimeout(() => {
          if (!videoModal.classList.contains('active')) {
            const currentSource = modalVideo.querySelector('source');
            if (currentSource) {
              // 暂存当前源
              const srcCache = currentSource.src;
              // 清空源
              currentSource.src = '';
              // 重新加载视频，清除缓存
              modalVideo.load();
              // 延迟后恢复源
              setTimeout(() => {
                currentSource.src = srcCache;
              }, 100);
            }
          }
        }, 500);
      }
      
      // 退出动画
      gsap.to('.video-modal-content', {
        scale: 0.8,
        y: 20,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in'
      });
      
      gsap.to(videoModal, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          videoModal.classList.remove('active');
          document.body.style.overflow = ''; // 恢复滚动
        }
      });
    }
    
    // 点击关闭按钮
    if (modalClose) {
      modalClose.addEventListener('click', closeModal);
    }
    
    // 点击背景关闭
    videoModal.addEventListener('click', (e) => {
      if (e.target === videoModal) {
        closeModal();
      }
    });
    
    // ESC键关闭
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && videoModal.classList.contains('active')) {
        closeModal();
      }
    });
  }
  
  // 添加缩略图显示处理函数
  function setupThumbnailDisplay() {
    // 检查所有视频缩略图
    const thumbnails = document.querySelectorAll('.thumbnail-image');
    
    thumbnails.forEach(thumbnail => {
      // 创建临时图片对象来检查图片比例
      const bgImg = thumbnail.style.backgroundImage.replace(/^url\(['"]?/, '').replace(/['"]?\)$/, '');
      if (!bgImg) return;
      
      const img = new Image();
      img.onload = function() {
        // 检查图片比例，如果宽高比过大或过小则使用contain模式
        const ratio = this.width / this.height;
        if (ratio > 2 || ratio < 0.5) {
          thumbnail.classList.add('thumbnail-image-contain');
        }
      };
      img.src = bgImg;
      
      // 添加错误处理
      img.onerror = function() {
        console.error('无法加载缩略图:', bgImg);
      };
    });
  }

  // 统计数据动画效果
  function initStatsAnimation() {
    const statItems = document.querySelectorAll('.stat-item');
    
    // 检查元素是否在视口内
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // 动画统计数据
    function animateStats() {
        statItems.forEach(item => {
            if (isElementInViewport(item) && !item.classList.contains('animated')) {
                const statValue = item.querySelector('.stat-value');
                const statFill = item.querySelector('.stat-fill');
                const targetValue = parseInt(statValue.getAttribute('data-value'));
                const targetWidth = parseInt(statFill.getAttribute('data-width'));
                const isKDRatio = item.querySelector('.stat-label').textContent.includes('K/D');
                
                // 数字递增动画
                let currentValue = 0;
                const duration = 1500; // 动画持续时间（毫秒）
                const interval = 16; // 每帧间隔（毫秒）
                const steps = duration / interval;
                const increment = targetValue / steps;
                
                const counter = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= targetValue) {
                        clearInterval(counter);
                        currentValue = targetValue;
                    }
                    
                    if (isKDRatio) {
                        // 对于K/D比，除以100并保留两位小数
                        statValue.textContent = (Math.floor(currentValue) / 100).toFixed(2);
                    } else {
                        // 其他数据添加百分号
                        statValue.textContent = Math.floor(currentValue) + '%';
                    }
                }, interval);
                
                // 进度条动画
                if (statFill) {
                    statFill.style.width = '0%';
                    setTimeout(() => {
                        statFill.style.transition = `width 1.5s ease-out`;
                        statFill.style.width = `${targetWidth}%`;
                    }, 100);
                }
                
                item.classList.add('animated');
            }
        });
    }
    
    // 初次检查
    animateStats();
    
    // 滚动时检查
    window.addEventListener('scroll', animateStats);
  }

  // 装备卡片效果
  function initEquipmentCards() {
    const equipmentCards = document.querySelectorAll('.equipment-card');
    
    equipmentCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -10,
                boxShadow: '0 20px 30px rgba(0, 0, 0, 0.3)',
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
                duration: 0.5,
                ease: 'power2.out'
            });
        });
    });
  }

  // 比赛日程效果
  function initTournamentItems() {
    const tournamentItems = document.querySelectorAll('.tournament-item');
    
    tournamentItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            gsap.to(item, {
                x: 10,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        item.addEventListener('mouseleave', () => {
            gsap.to(item, {
                x: 0,
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
  }
}); 