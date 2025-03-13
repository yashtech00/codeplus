
  ##USER_CODE_HERE##
  
  const input = require('fs').readFileSync('/dev/stdin', 'utf8').trim().split('\n').join(' ').split(' ');
  const s1 = parseInt(input.shift());
  const s2 = parseInt(input.shift());
  const result = areAnagrams(s1, s2);
  console.log(result);
      