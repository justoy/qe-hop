document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('text-input');
    const generateBtn = document.getElementById('generate-btn');
    const copyBtn = document.getElementById('copy-btn');
    const qrcodeContainer = document.getElementById('qrcode-container');
    const urlDisplayContainer = document.getElementById('url-display-container');
    const encodedUrlElement = document.getElementById('encoded-url');

    // 页面加载时检查 URL hash
    function checkHashOnLoad() {
        if (window.location.hash) {
            try {
                // 解码 Base64 数据
                const decodedData = atob(window.location.hash.substring(1));
                textInput.value = decodedData;
                
                // UI 调整：显示复制按钮，隐藏生成按钮
                generateBtn.style.display = 'none';
                copyBtn.style.display = 'inline-block';
                
                // 清理 URL，避免刷新时重复加载
                history.replaceState(null, document.title, window.location.pathname + window.location.search);

            } catch (e) {
                console.error("无法解码 Hash:", e);
                // 如果解码失败，显示默认界面
                showGenerateUI();
            }
        } else {
            // 没有 hash，显示默认的生成界面
            showGenerateUI();
        }
    }

    function showGenerateUI() {
        generateBtn.style.display = 'inline-block';
        copyBtn.style.display = 'none';
    }

    // "生成二维码" 按钮事件
    generateBtn.addEventListener('click', () => {
        const text = textInput.value.trim();
        if (!text) {
            alert('请输入内容！');
            return;
        }

        // 1. Base64 编码
        const encodedData = btoa(text);
        
        // 2. 构建包含 hash 的 URL
        const url = `${window.location.origin}${window.location.pathname}#${encodedData}`;
        encodedUrlElement.textContent = url;
        urlDisplayContainer.style.display = 'block';

        // 3. 生成二维码
        qrcodeContainer.innerHTML = ''; // 清空旧的二维码
        QRCode.toCanvas(url, { width: 256, errorCorrectionLevel: 'H' }, (err, canvas) => {
            if (err) throw err;
            qrcodeContainer.appendChild(canvas);
            qrcodeContainer.style.display = 'inline-block'; // 显示二维码容器
        });
    });

    // "复制到剪贴板" 按钮事件
    copyBtn.addEventListener('click', () => {
        if (!textInput.value) return;

        navigator.clipboard.writeText(textInput.value).then(() => {
            // 提供反馈
            const originalText = copyBtn.textContent;
            copyBtn.textContent = '已复制!';
            copyBtn.style.backgroundColor = '#ff9500'; // 橙色表示成功
            setTimeout(() => {
                copyBtn.textContent = originalText;
                copyBtn.style.backgroundColor = '#34c759'; // 恢复绿色
            }, 1500);
        }).catch(err => {
            console.error('复制失败: ', err);
            alert('复制失败，请手动复制。');
        });
    });

    // 初始化页面
    checkHashOnLoad();
});