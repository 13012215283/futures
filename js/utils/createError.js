import warning from 'warning';

import errors from 'futures/constants/errors';

export default function createError(code) {
  warning(
    errors[code] !== undefined,
    '错误代码未在 constants/errors 文件中定义'
  );

  const error = new Error();
  error.code = code;

  return error;
}
