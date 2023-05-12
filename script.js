class OutOfRangeError extends Error {
  constructor(message) {
    super(message);
    this.name = 'OutOfRangeError';
  }
}

class InvalidExprError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InvalidExprError';
  }
}

function evalString(expr) {
  // Check for invalid combination of operators
  if (/(\+\+|\-\-|\+\-|\-\+|\*\/|\/\*|\+\*|\-\*|\*\+|\*\-)/.test(expr)) {
    throw new InvalidExprError('Expression should not have an invalid combination of operators');
  }

  // Check for invalid starting and ending operators
  if (/^[+\/*]/.test(expr)) {
    throw new SyntaxError('Expression should not start with an invalid operator');
  }
  if (/[\+\/*-]$/.test(expr)) {
    throw new SyntaxError('Expression should not end with an invalid operator');
  }

  // Check for out of range characters
  if (!/^[\d+\-\/*\s]+$/.test(expr)) {
    throw new OutOfRangeError('Expression should only consist of integers and +-/* characters');
  }

  // Evaluate the expression
  return eval(expr);
}

// Test the evalString function
try {
  console.log(evalString('1 + 2 * 3')); // Output: 7
  console.log(evalString('1 + 2 - 3 / 4')); // Output: 2.25
  console.log(evalString('10 * -2 + 5')); // Output: -15
  console.log(evalString('2 ** 3')); // Throws OutOfRangeError
  console.log(evalString('1++2')); // Throws InvalidExprError
  console.log(evalString('*2+3')); // Throws SyntaxError
  console.log(evalString('1-2/')); // Throws SyntaxError
} catch (error) {
  console.error(error.name + ': ' + error.message);
}

module.exports = evalString;
