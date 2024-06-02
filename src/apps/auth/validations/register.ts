interface RegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  jobPosition: string;
  password: string;
  passwordConfirm: string;
}

const validateRegister = (inputData: RegisterForm) => {
  let errorMessages = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    jobPosition: '',
    password: '',
    passwordConfirm: '',
  };

  if (inputData.phoneNumber.length < 8) {
    errorMessages.phoneNumber =
      'Phone number is too short. Minimum length is 8 characters.';
  } else if (inputData.phoneNumber.length > 15) {
    errorMessages.phoneNumber =
      'Phone number is too short. Maximum length is 15 characters.';
  }

  if (inputData.password.length < 8) {
    errorMessages.password = 'Password length must be at least 8 characters';
  }

  if (inputData.password !== inputData.passwordConfirm) {
    errorMessages.passwordConfirm = 'Password do not match';
  }

  Object.keys(inputData).forEach((key) => {
    if (inputData[key as keyof RegisterForm] === '') {
      errorMessages[key as keyof RegisterForm] = 'field cannot be blank';
    }
  });

  return errorMessages;
};

export default validateRegister;
