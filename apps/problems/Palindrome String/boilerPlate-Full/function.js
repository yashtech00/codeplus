
  ##USER_CODE_HERE##
  
  const input = require('fs').readFileSync('/dev/stdin', 'utf8').trim().split('\n').join(' ').split(' ');
  const s = parseInt(input.shift());
  const result = isPalindrome(s);
  console.log(result);
      