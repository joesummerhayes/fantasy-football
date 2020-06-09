export interface Validator {
  (arg: string): boolean;
}

export interface FormItem {
  value: string;
  touched: boolean;
  valid: boolean;
  validators: Validator[];
}
