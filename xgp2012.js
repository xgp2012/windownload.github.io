// 密码验证模块 - 使用SHA-256加密算法
// 默认账户: admin
// 默认密码: xgp20120905

// SHA-256哈希函数
async function sha256(message) {
    // 将消息编码为UTF-8
    const msgBuffer = new TextEncoder().encode(message);
    
    // 计算哈希值
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    
    // 将ArrayBuffer转换为字节数组
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    
    // 将字节转换为十六进制字符串
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    
    return hashHex;
}

// 验证管理员凭据
async function verifyAdminCredentials(username, password) {
    // 验证用户名
    if (username !== 'admin') {
        return false;
    }
    
    try {
        // 计算输入密码的哈希值
        const inputHash = await sha256(password);
        
        // 预计算的正确密码哈希值 (xgp20120905)
        const correctHash = '70ee28b6655a02346d3d6941d6bf7a072f06e9e3011fbfa22e8a490b5dfed4e2'; // 示例哈希值
        
        // 比较哈希值
        return inputHash === correctHash;
    } catch (error) {
        console.error('密码验证错误:', error);
        return false;
    }
}

// 预计算默认密码的哈希值 (在实际应用中应该预先计算好)
// 这里只是一个示例，实际使用时需要预先计算并替换correctHash
// 可以使用在线SHA-256工具计算"xgp20120905"的哈希值
// 例如: echo -n "xgp20120905" | sha256sum