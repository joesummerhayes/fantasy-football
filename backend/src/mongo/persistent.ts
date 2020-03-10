import connect from './connect';

let persistent: Promise<any> | undefined;

export const getPersistent = (): Promise<any> => {
  if (!persistent) {
    persistent = connect();
  }
  return persistent;
};

export default getPersistent;
