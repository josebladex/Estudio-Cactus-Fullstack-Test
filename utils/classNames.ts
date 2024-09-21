
import classNames from 'classnames';

export const cn = (...classes: (string | undefined | null | boolean)[]): string => {
  return classNames(classes);
};
