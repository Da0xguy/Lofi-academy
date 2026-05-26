const fs = require('fs');

try {
  const pkg = require('./node_modules/@mysten/sui/package.json');
  console.log('@mysten/sui exports map:', pkg.exports);
} catch (e) {
  console.log('Error reading package.json:', e.message);
}
