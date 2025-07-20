import crypto from 'crypto';
console.log(crypto.createHash('sha256').update('test').digest('hex'));
