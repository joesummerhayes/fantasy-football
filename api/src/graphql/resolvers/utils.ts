import validator from 'validator';

export const checkFieldsExist = (values: string[]): boolean => {
  const errors = values.filter((value) => {
    return validator.isEmpty(value);
  });
  return errors.length <= 0;
};

export const generatePassword = (length: number): string => {
  const chars = 'abcdefghijklmnopqrstuvqxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789';
  let password = '';
  for (let i = 0; i < length; i += 1) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

export default {};
