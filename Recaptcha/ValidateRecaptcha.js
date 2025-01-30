const axios = require('axios');

const validateRecaptcha = async (token) => {
  const secretKey = 'TU_SECRET_KEY';
  const response = await axios.post(
    'https://www.google.com/recaptcha/api/siteverify',
    null,
    {
      params: {
        secret: secretKey,
        response: token,
      },
    }
  );

  const { success, score, action } = response.data;

  if (success && score > 0.5) {
    console.log("reCAPTCHA válido");
  } else {
    console.log("reCAPTCHA no válido");
  }
};