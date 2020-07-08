import validator from 'validator';

export const checkFieldsExist = (values: string[]): boolean => {
  const errors = values.filter((value) => {
    return validator.isEmpty(value);
  });
  return errors.length <= 0;
};

export default {};
