import { nanoid } from 'nanoid';

export const generateNanoid = (size = 8) => {
  return nanoid(size);
};
