
  ##USER_CODE_HERE##
  
  const input = require('fs').readFileSync('/dev/stdin', 'utf8').trim().split('\n').join(' ').split(' ');
  const n = parseInt(input.shift());
  const result = getSecondLargest(n);
  console.log(result);
      