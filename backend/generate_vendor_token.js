
const jwt = require('jsonwebtoken');
const fs = require('fs');
const secret = "dev-secret-key";
const token = jwt.sign({ email: 'testvendor@example.com', vendor: true }, secret, { expiresIn: '1h' });
fs.writeFileSync('token.txt', token);
console.log("Token written to token.txt");
