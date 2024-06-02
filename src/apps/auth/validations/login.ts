import { UserLoginState } from '@/types/auth/UserLoginState';

const validateLogin = (inputData: UserLoginState) => {
  let errorMessages = {
    email: '',
    password: '',
  };

  if (inputData.email === '') errorMessages.email = 'Email cannot be blank';
  if (inputData.password === '')
    errorMessages.password = 'Password cannot be blank';
  return errorMessages;
};

export default validateLogin;
