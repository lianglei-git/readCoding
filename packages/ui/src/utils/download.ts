function getDownloadUri (data) {
    const mimeType = 'attachment/csv';
    const charset = ';charset=utf-8,';
    const _utf = '\uFEFF'; // 为了使文件以utf-8的编码模式，同时也是解决中文乱码的问题
    return 'data:' + mimeType + charset + _utf + encodeURIComponent(data)
}

function saveDataFile (data, fileName) {
    try {
      debugger
        const element = document.createElement('a');
        const uri = getDownloadUri(data);
        element.href = uri;
        element.download = fileName;
        const a = document.body.appendChild(element);
        const evt = document.createEvent('HTMLEvents');
        evt.initEvent('click', false, false); // 不加后面两个参数在Firefox上报错
        a.dispatchEvent(evt);
        a.click();
        document.body.removeChild(element);
    } catch (e) {
        
    }
}



// 引入CryptoJS库  
var CryptoJS = require('crypto-js');  
  
const Password = 'my-secret-password';  

// 加密函数  
function encrypt(text, password = Password) {  
  // 将文本转换为字节数组  
  var bytes = CryptoJS.AES.encrypt(text, password);  
  
  // 将字节数组转换为Base64编码字符串  
  var base64 = btoa(bytes);  
  
  // 将Base64编码字符串转换为字节数组  
  var encryptedBytes = atob(base64);  
  
  // 返回加密后的字节数组  
  return encryptedBytes;  
}  
  
// 解密函数  
function decrypt(encryptedBytes, password = Password) {  
  // 将字节数组转换为Base64编码字符串  
  var base64 = atob(encryptedBytes);  
  
  // 将Base64编码字符串转换为字节数组  
  var bytes = CryptoJS.AES.decrypt(base64, password);  
  
  // 将字节数组转换为字符串  
  var decryptedText = atob(bytes);  
  
  // 返回解密后的字符串  
  return decryptedText;  
}  
  
// // 测试加密解密函数  
// var encryptedText = encrypt('Hello, world!', password);  
// var decryptedText = decrypt(encryptedText, password);  
  
// console.log('原始文本：', encryptedText);  
// console.log('加密后的文本：', decryptedText);



export {
    saveDataFile,
    encrypt,
    decrypt
}