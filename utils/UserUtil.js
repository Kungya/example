const passwordValidation = (password) => {
  const pattern1 = /[0-9]/;
  const pattern2 = /[a-zA-Z]/;

  if (!pattern1.test(password) || !pattern2.test(password) || password.length < 8) {
    return false;
  } else {
    return true;
  }
};

export default {
  passwordValidation,
};
