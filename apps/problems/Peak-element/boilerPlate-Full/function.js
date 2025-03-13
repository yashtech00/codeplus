
  ##USER_CODE_HERE##
  
  const input = require('fs').readFileSync('/dev/stdin', 'utf8').trim().split('\n').join(' ').split(' ');
  const arr = parseInt(input.shift());
  const result = peekElement(arr);
  console.log(result);
      