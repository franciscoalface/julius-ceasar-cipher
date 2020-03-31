exports.decryptCeasarCipher = params => {
  const { amount, text } = params;
  let outputText = '';
  uppercaseText = text.toLowerCase();

  for (char of uppercaseText) {
    let newChar = char;
    if (char.match(/[a-z]/)) {
      const code = char.charCodeAt(0);
      newChar = String.fromCharCode(((code - 97 - amount) % 26) + 97);
    }
    outputText += newChar;
  }
  return outputText;
};
