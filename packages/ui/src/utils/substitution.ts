function encrypt(text, key = 'A') {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  let encryptedText = '';

  for (let i = 0; i < text.length; i++) {
    const char = text.charAt(i).toLowerCase();
    const index = alphabet.indexOf(char);
    if (index >= 0) {
      const newIndex = (index + key) % alphabet.length;
      encryptedText += alphabet.charAt(newIndex);
    } else {
      encryptedText += char;
    }
  }

  return encryptedText;
}



function decrypt(encryptedText: string, key = 'A') {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    let text = '';
  
    for (let i = 0; i < encryptedText.length; i++) {
      const char = encryptedText.charAt(i).toLowerCase();
      const index = alphabet.indexOf(char);
      if (index >= 0) {
        const newIndex = (index - key + alphabet.length) % alphabet.length;
        text += alphabet.charAt(newIndex);
      } else {
        text += char;
      }
    }
  
    return text;
  }
  