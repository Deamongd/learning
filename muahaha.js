const fs = require('fs');

const STR = 'asdjkaslkjdjlkasd askljdalks dlajksd lkasdjlkasdlkjasd';

console.log('before');

fs.writeFile('./text.txt', STR, () => {
  console.log('success');
});

console.log('after');
