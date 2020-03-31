const fetch = require('node-fetch');
const FormData = require('form-data');
const fs = require('fs');

exports.getCipherData = async () => {
  const response = await fetch(
    `${GENERATE_DATA_URL}?token=${process.env.API_TOKEN}`
  );
  const fileData = await response.json();
  return fileData;
};

exports.postCipherData = async jsonFile => {
  const form = new FormData();

  console.log(jsonFile);
  form.append('answer', fs.createReadStream('./_data/answer.json'));

  const response = await fetch(
    `${SUBMIT_SOLUTION_URL}?token=${process.env.API_TOKEN}`,
    {
      method: 'post',
      body: form,
      headers: form.getHeaders()
    }
  );
  // console.log(form.);
  const postData = await response.json();
  console.log(postData);
  return postData;
};
