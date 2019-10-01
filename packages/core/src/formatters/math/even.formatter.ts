/**
 * Check if a number is even or not
 */
export const even = {
  name: 'even',
  read(num: number) {
    return (num % 2) === 0;
  },
};
