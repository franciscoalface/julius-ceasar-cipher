const dotenv = require('dotenv');
const fs = require('fs');
const sha1 = require('js-sha1');

const { decryptCeasarCipher } = require('./ceasar_cipher');
const { getCipherData, postCipherData } = require('./api');

dotenv.config({ path: '.env' });

async function main(params) {
  const fileData = await getCipherData();
  console.log(fileData);
  await writeFile('./_data/answer.json', JSON.stringify(fileData));
  fileData.decifrado = decryptCeasarCipher({
    amount: fileData.numero_casas,
    text: fileData.cifrado
  });

  fileData.resumo_criptografico = sha1(fileData.decifrado);

  await writeFile('./_data/answer.json', JSON.stringify(fileData));

  const result = postCipherData(fileData);
}

const writeFile = async (filename, data) => {
  fs.writeFile(filename, data, error => {
    if (error) return console.log(error);
  });
};

if (require.main === module) {
  const params = {};
  main(params);
}
