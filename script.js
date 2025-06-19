document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('text-input');
    const generateBtn = document.getElementById('generate-btn');
    const copyBtn = document.getElementById('copy-btn');
    const qrcodeContainer = document.getElementById('qrcode-container');

    // 页面加载时检查 URL hash
    function checkHashOnLoad() {
        if (window.location.hash) {
            try {
                // 解码 Base64 数据
                const decodedData = atob(window.location.hash.substring(1));
                textInput.value = decodedData;
                
                generateBtn.style.display = 'inline-block';
                copyBtn.style.display = 'inline-block';
                
                // 清理 URL，避免刷新时重复加载
                history.replaceState(null, document.title, window.location.pathname + window.location.search);

            } catch (e) {
                console.error("无法解码 Hash:", e);
                // 如果解码失败，显示默认界面
                showDefaultUI();
            }
        } else {
            // 没有 hash，显示默认的生成界面
            showDefaultUI();
        }
    }

    // 显示默认界面的函数
    function showDefaultUI() {
        generateBtn.style.display = 'inline-block';
        copyBtn.style.display = 'none';
        qrcodeContainer.style.display = 'none'; // 确保二维码容器也隐藏
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
        
        // 2. 构建包含 hash 的 URL (确保清除旧的 hash)
        const baseUrl = window.location.href.split('#')[0];
        const url = `${baseUrl}#${encodedData}`;

        // 3. 生成二维码
        qrcodeContainer.innerHTML = ''; // 清空旧的二维码
        QRCode.toCanvas(url, { width: 256, errorCorrectionLevel: 'H' }, (err, canvas) => {
            if (err) throw err;
            qrcodeContainer.appendChild(canvas);
            qrcodeContainer.style.display = 'inline-block'; // 显示二维码容器
        });
    });

    // "复制到剪贴板" 按钮事件 (这里使用我们之前讨论过的健壮版本)
    copyBtn.addEventListener('click', () => {
        const textToCopy = textInput.value;
        if (!textToCopy) return;

        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(textToCopy).then(() => {
                showCopyFeedback(true);
            }).catch(err => {
                console.error('现代API复制失败: ', err);
                fallbackCopyTextToClipboard(textToCopy);
            });
        } else {
            console.warn('Clipboard API 不可用，使用备用方法。');
            fallbackCopyTextToClipboard(textToCopy);
        }
    });

    function fallbackCopyTextToClipboard(text) {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.top = "-9999px";
        textArea.style.left = "-9999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            const successful = document.execCommand('copy');
            showCopyFeedback(successful);
        } catch (err) {
            console.error('备用方法复制失败: ', err);
            showCopyFeedback(false);
        }
        document.body.removeChild(textArea);
    }

    function showCopyFeedback(success) {
        const originalText = copyBtn.textContent;
        if (success) {
            copyBtn.textContent = '已复制!';
            copyBtn.style.backgroundColor = '#ff9500';
        } else {
            copyBtn.textContent = '复制失败!';
            copyBtn.style.backgroundColor = '#ff3b30';
            alert('自动复制失败，请长按文本框手动复制。');
        }
        setTimeout(() => {
            copyBtn.textContent = '复制到剪贴板';
            copyBtn.style.backgroundColor = '#34c759';
        }, 2000);
    }

    // 初始化页面
    checkHashOnLoad();
});