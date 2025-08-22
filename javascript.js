// 默认链接配置
const defaultLinks = [
    {
        name: "GitHub",
        desc: "代码托管与版本控制平台，参与开源项目",
        url: "https://github.com",
        icon: "fab fa-github"
    },
    {
        name: "Stack Overflow",
        desc: "程序员问答社区，解决编码难题",
        url: "https://stackoverflow.com",
        icon: "fab fa-stack-overflow"
    },
    {
        name: "技术博客",
        desc: "个人技术博客，分享学习笔记与开发经验",
        url: "https://milestone56.pages.dev/",
        icon: "fas fa-newspaper"
    },
    {
        name: "YouTube",
        desc: "观看技术教程、会议演讲和开发者视频",
        url: "https://youtube.com",
        icon: "fab fa-youtube"
    },
    {
        name: "Twitter",
        desc: "关注技术领袖与开发者社区的最新动态",
        url: "https://twitter.com",
        icon: "fab fa-twitter"
    },
    {
        name: "项目集",
        desc: "个人项目展示与作品集页面",
        url: "https://milestone56.pages.dev/",
        icon: "fas fa-project-diagram"
    }
];

// 搜索引擎配置
const searchEngines = {
    google: "https://www.google.com/search?q=",
    bing: "https://www.bing.com/search?q=",
    baidu: "https://www.baidu.com/s?wd=",
    duckduckgo: "https://duckduckgo.com/?q="
};

// 全局变量
let currentEngine = "google";
let customLinks = [];
let currentTheme = "dark";
let darkThemeColor = "#a277ff";
let lightThemeColor = "#6c40c9";
let currentColorTab = "dark";

// DOM元素
const themeSwitcher = document.getElementById('theme-switcher');
const bgGif = document.getElementById('bg-gif');
const bgVideo = document.getElementById('bg-video');
const playPauseBtn = document.getElementById('play-pause-btn');
const muteUnmuteBtn = document.getElementById('mute-unmute-btn');
const uploadBtn = document.getElementById('upload-btn');
const videoUpload = document.getElementById('video-upload');
const toast = document.getElementById('toast');
const settingsBtn = document.getElementById('settings-btn');
const settingsPanel = document.getElementById('settings-panel');
const closeSettings = document.getElementById('close-settings');
const blurSlider = document.getElementById('blur-slider');
const blurValue = document.getElementById('blur-value');
const themeTabs = document.querySelectorAll('.theme-tab');
const darkColors = document.getElementById('dark-colors');
const lightColors = document.getElementById('light-colors');
const darkColorOptions = darkColors.querySelectorAll('.color-option');
const lightColorOptions = lightColors.querySelectorAll('.color-option');
const linksContainer = document.getElementById('links-container');
const customLinksList = document.getElementById('custom-links-list');
const addLinkBtn = document.getElementById('add-link-btn');
const resetSettingsBtn = document.getElementById('reset-settings');
const saveSettingsBtn = document.getElementById('save-settings');

// 显示提示信息
function showToast(message, duration = 3000) {
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, duration);
}

// 设置当前搜索引擎
function setSearchEngine(engine) {
    currentEngine = engine;
    document.querySelectorAll('.engine-btn').forEach(btn => {
        if (btn.dataset.engine === engine) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// 渲染链接卡片
function renderLinks() {
    linksContainer.innerHTML = '';
    
    customLinks.forEach(link => {
        const card = document.createElement('div');
        card.className = 'link-card';
        card.innerHTML = `
            <div class="link-icon"><i class="${link.icon}"></i></div>
            <h3 class="link-title">${link.name}</h3>
            <p class="link-desc">${link.desc}</p>
            <a href="${link.url}" class="link-url" target="_blank">访问 ${link.name}</a>
        `;
        linksContainer.appendChild(card);
    });
}

// 渲染自定义链接列表
function renderCustomLinksList() {
    customLinksList.innerHTML = '';
    
    customLinks.forEach((link, index) => {
        const item = document.createElement('div');
        item.className = 'link-item';
        item.innerHTML = `
            <span>${link.name}</span>
            <div class="link-actions">
                <button class="link-action edit-link" data-index="${index}"><i class="fas fa-edit"></i></button>
                <button class="link-action delete-link" data-index="${index}"><i class="fas fa-trash"></i></button>
            </div>
        `;
        customLinksList.appendChild(item);
    });
    
    // 添加事件监听
    document.querySelectorAll('.delete-link').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = e.currentTarget.dataset.index;
            customLinks.splice(index, 1);
            renderCustomLinksList();
            renderLinks();
            showToast('链接已删除');
        });
    });
    
    document.querySelectorAll('.edit-link').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = e.currentTarget.dataset.index;
            const link = customLinks[index];
            
            document.getElementById('link-name').value = link.name;
            document.getElementById('link-desc').value = link.desc;
            document.getElementById('link-url').value = link.url;
            document.getElementById('link-icon').value = link.icon;
            
            customLinks.splice(index, 1);
            renderCustomLinksList();
            renderLinks();
            showToast('请修改链接信息并重新添加');
        });
    });
}

// 更新主题颜色
function updateThemeColor(color, theme) {
    if (theme === 'dark') {
        darkThemeColor = color;
        document.documentElement.style.setProperty('--primary-color-dark', color);
        
        // 计算并设置次要颜色（稍微暗一点）
        const secondaryColor = adjustColorBrightness(color, -30);
        document.documentElement.style.setProperty('--secondary-color-dark', secondaryColor);
        
        // 更新当前激活的颜色选项
        darkColorOptions.forEach(option => {
            option.classList.remove('active');
            if (option.dataset.color === color) {
                option.classList.add('active');
            }
        });
    } else {
        lightThemeColor = color;
        document.documentElement.style.setProperty('--primary-color-light', color);
        
        // 计算并设置次要颜色（稍微暗一点）
        const secondaryColor = adjustColorBrightness(color, -30);
        document.documentElement.style.setProperty('--secondary-color-light', secondaryColor);
        
        // 更新当前激活的颜色选项
        lightColorOptions.forEach(option => {
            option.classList.remove('active');
            if (option.dataset.color === color) {
                option.classList.add('active');
            }
        });
    }
}

// 调整颜色亮度
function adjustColorBrightness(color, percent) {
    const num = parseInt(color.slice(1), 16);
    const R = (num >> 16) + percent;
    const G = ((num >> 8) & 0x00FF) + percent;
    const B = (num & 0x0000FF) + percent;
    
    return '#' + (
        0x1000000 +
        (R < 255 ? (R < 0 ? 0 : R) : 255) * 0x10000 +
        (G < 255 ? (G < 0 ? 0 : G) : 255) * 0x100 +
        (B < 255 ? (B < 0 ? 0 : B) : 255)
    ).toString(16).slice(1);
}

// 初始化事件监听
function initEventListeners() {
    // 搜索引擎切换
    document.querySelectorAll('.engine-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            setSearchEngine(btn.dataset.engine);
        });
    });
    
    // 搜索功能
    document.getElementById('search-btn').addEventListener('click', performSearch);
    document.getElementById('search-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // 主题切换
    themeSwitcher.addEventListener('click', toggleTheme);
    
    // 视频控制
    playPauseBtn.addEventListener('click', togglePlayPause);
    muteUnmuteBtn.addEventListener('click', toggleMuteUnmute);
    
    // 视频上传
    uploadBtn.addEventListener('click', () => {
        videoUpload.click();
    });
    
    videoUpload.addEventListener('change', handleVideoUpload);
    
    // 设置面板
    settingsBtn.addEventListener('click', toggleSettings);
    closeSettings.addEventListener('click', toggleSettings);
    
    // 模糊度滑块
    blurSlider.addEventListener('input', updateBlur);
    
    // 主题标签切换
    themeTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            themeTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentColorTab = tab.dataset.theme;
            
            if (currentColorTab === 'dark') {
                darkColors.style.display = 'grid';
                lightColors.style.display = 'none';
            } else {
                darkColors.style.display = 'none';
                lightColors.style.display = 'grid';
            }
        });
    });
    
    // 颜色选择
    darkColorOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            updateThemeColor(e.target.dataset.color, 'dark');
        });
    });
    
    lightColorOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            updateThemeColor(e.target.dataset.color, 'light');
        });
    });
    
    // 添加链接
    addLinkBtn.addEventListener('click', addCustomLink);
    
    // 重置设置
    resetSettingsBtn.addEventListener('click', resetSettings);
    
    // 保存设置
    saveSettingsBtn.addEventListener('click', saveSettings);
}

// 执行搜索
function performSearch() {
    const query = document.getElementById('search-input').value.trim();
    if (query) {
        window.open(searchEngines[currentEngine] + encodeURIComponent(query), '_blank');
    }
}

// 切换明暗主题
function toggleTheme() {
    if (currentTheme === 'dark') {
        document.body.classList.add('light-theme');
        currentTheme = 'light';
        themeSwitcher.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        document.body.classList.remove('light-theme');
        currentTheme = 'dark';
        themeSwitcher.innerHTML = '<i class="fas fa-moon"></i>';
    }
    
    // 保存主题偏好
    localStorage.setItem('theme', currentTheme);
}

// 视频播放/暂停
function togglePlayPause() {
    if (bgVideo.style.display === 'none') {
        showToast('请先上传视频');
        return;
    }
    
    if (bgVideo.paused) {
        bgVideo.play();
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        bgVideo.pause();
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
}

// 视频静音/取消静音
function toggleMuteUnmute() {
    if (bgVideo.style.display === 'none') {
        showToast('请先上传视频');
        return;
    }
    
    bgVideo.muted = !bgVideo.muted;
    muteUnmuteBtn.innerHTML = bgVideo.muted ? 
        '<i class="fas fa-volume-mute"></i>' : 
        '<i class="fas fa-volume-up"></i>';
}

// 处理视频上传
function handleVideoUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    if (!file.type.startsWith('video/')) {
        showToast('请上传视频文件');
        return;
    }
    
    const videoURL = URL.createObjectURL(file);
    bgVideo.src = videoURL;
    bgVideo.style.display = 'block';
    bgGif.style.display = 'none';
    
    bgVideo.play().then(() => {
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        showToast('视频上传成功，已设置为背景');
    }).catch(error => {
        console.error('视频播放错误:', error);
        showToast('视频上传成功，但自动播放失败');
    });
    
    // 清空input，允许重复选择相同文件
    e.target.value = '';
}

// 切换设置面板
function toggleSettings() {
    settingsPanel.classList.toggle('active');
}

// 更新模糊度
function updateBlur() {
    const value = blurSlider.value;
    blurValue.textContent = value + 'px';
    document.documentElement.style.setProperty('--blur-intensity', value + 'px');
}

// 添加自定义链接
function addCustomLink() {
    const name = document.getElementById('link-name').value.trim();
    const desc = document.getElementById('link-desc').value.trim();
    const url = document.getElementById('link-url').value.trim();
    const icon = document.getElementById('link-icon').value.trim();
    
    if (!name || !url) {
        showToast('请至少填写名称和URL');
        return;
    }
    
    customLinks.push({
        name,
        desc: desc || '暂无描述',
        url,
        icon: icon || 'fas fa-link'
    });
    
    renderCustomLinksList();
    renderLinks();
    
    // 清空表单
    document.getElementById('link-name').value = '';
    document.getElementById('link-desc').value = '';
    document.getElementById('link-url').value = '';
    document.getElementById('link-icon').value = '';
    
    showToast('链接已添加');
}

// 重置设置
function resetSettings() {
    if (confirm('确定要恢复默认设置吗？这将清除所有自定义设置。')) {
        localStorage.removeItem('navSettings');
        loadSettings();
        showToast('已恢复默认设置');
    }
}

// 保存设置
function saveSettings() {
    const settings = {
        theme: currentTheme,
        darkThemeColor: darkThemeColor,
        lightThemeColor: lightThemeColor,
        blurIntensity: blurSlider.value,
        customLinks: customLinks
    };
    
    localStorage.setItem('navSettings', JSON.stringify(settings));
    showToast('设置已保存');
}

// 加载设置
function loadSettings() {
    const savedSettings = localStorage.getItem('navSettings');
    
    if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        
        // 应用主题
        if (settings.theme === 'light') {
            document.body.classList.add('light-theme');
            themeSwitcher.innerHTML = '<i class="fas fa-sun"></i>';
            currentTheme = 'light';
        } else {
            document.body.classList.remove('light-theme');
            themeSwitcher.innerHTML = '<i class="fas fa-moon"></i>';
            currentTheme = 'dark';
        }
        
        // 应用主题色
        if (settings.darkThemeColor) {
            updateThemeColor(settings.darkThemeColor, 'dark');
        }
        
        if (settings.lightThemeColor) {
            updateThemeColor(settings.lightThemeColor, 'light');
        }
        
        // 应用模糊度
        if (settings.blurIntensity) {
            blurSlider.value = settings.blurIntensity;
            updateBlur();
        }
        
        // 应用自定义链接
        if (settings.customLinks && settings.customLinks.length > 0) {
            customLinks = settings.customLinks;
        } else {
            customLinks = [...defaultLinks];
        }
    } else {
        customLinks = [...defaultLinks];
    }
    
    renderLinks();
    renderCustomLinksList();
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    initEventListeners();
    loadSettings();
    // 设置默认搜索引擎
    setSearchEngine('google');
});