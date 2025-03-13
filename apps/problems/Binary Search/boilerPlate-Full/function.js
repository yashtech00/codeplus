
  ##USER_CODE_HERE##
  
  const input = require('fs').readFileSync('/dev/stdin', 'utf8').trim().split('\n').join(' ').split(' ');
  const k = parseInt(input.shift());
  const result = binarysearch(k);
  console.log(result);
      