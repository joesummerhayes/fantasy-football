import validator from 'validator';
import bcrypt from 'bcrypt';

export const checkFieldsExist = (values: string[]): boolean => {
  const errors = values.filter((value) => {
    return validator.isEmpty(value);
  });
  return errors.length <= 0;
};

export const generatePassword = async (length: number): Promise<string> => {
  const chars = 'abcdefghijklmnopqrstuvqxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789';
  let password = '';
  for (let i = 0; i < length; i += 1) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  const hashedPw = await bcrypt.hash(password, 12);
  return hashedPw;
};

export default {};
