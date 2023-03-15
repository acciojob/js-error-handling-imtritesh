//your code here
class OutOfRangeError extends Error {
  constructor(arg) {
    super(`Expression should only consist of integers and +-/* characters and not ${arg}`);
    this.name = 'OutOfRangeError';
  }
}

class InvalidExprError extends Error {
  constructor() {
    super('Expression should not have an invalid combination of expression');
    this.name = 'InvalidExprError';
  }
}

function evalString(str) {
  try {
    if (/^\s*[+/*]/.test(str)) {
      throw new SyntaxError('Expression should not start with invalid operator');
    }
    if (/[+/*-]\s*$/.test(str)) {
      throw new SyntaxError('Expression should not end with invalid operator');
    }
    if (/[+/*-]{2}/.test(str)) {
      throw new InvalidExprError();
    }
    const result = eval(str);
    if (!Number.isInteger(result)) {
      throw new OutOfRangeError(result);
    }
    return result;
  } catch (err) {
    if (err instanceof OutOfRangeError || err instanceof InvalidExprError) {
      throw err;
    }
    throw new OutOfRangeError();
  }
}
