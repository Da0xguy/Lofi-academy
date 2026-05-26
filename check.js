const fs = require('fs');
const path = require('path');

const packageJson = require('./package.json');
console.log('package.json dependencies:', packageJson.dependencies);

try {
  const dappKitPkg = require('./node_modules/@mysten/dapp-kit/package.json');
  console.log('@mysten/dapp-kit package.json version:', dappKitPkg.version);
  console.log('@mysten/dapp-kit package.json peerDependencies:', dappKitPkg.peerDependencies);
  console.log('@mysten/dapp-kit package.json dependencies:', dappKitPkg.dependencies);
} catch (e) {
  console.log('Error reading @mysten/dapp-kit package.json:', e.message);
}

try {
  const dappKitReactPkg = require('./node_modules/@mysten/dapp-kit-react/package.json');
  console.log('@mysten/dapp-kit-react package.json version:', dappKitReactPkg.version);
  console.log('@mysten/dapp-kit-react package.json peerDependencies:', dappKitReactPkg.peerDependencies);
  console.log('@mysten/dapp-kit-react package.json dependencies:', dappKitReactPkg.dependencies);
} catch (e) {
  console.log('Error reading @mysten/dapp-kit-react package.json:', e.message);
}

try {
  const suiPkg = require('./node_modules/@mysten/sui/package.json');
  console.log('@mysten/sui package.json version:', suiPkg.version);
} catch (e) {
  console.log('Error reading @mysten/sui package.json:', e.message);
}
