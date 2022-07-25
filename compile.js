const path = require('path');
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf8');

var solcInput = {
  language: 'Solidity',
  sources: {
    contract: {
      content: source
    }
  },
  settings: {
    optimizer: {
      enabled: true
    },
    evmVersion: 'byzantium',
    outputSelection: {
      '*': {
        '': ['legacyAST', 'ast'],
        '*': [
          'abi',
          'evm.bytecode.object',
          'evm.bytecode.sourceMap',
          'evm.deployedBytecode.object',
          'evm.deployedBytecode.sourceMap',
          'evm.gasEstimates'
        ]
      }
    }
  }
};

solcInput = JSON.stringify(solcInput);
var contractObject = solc.compile(solcInput);
contractObject = JSON.parse(contractObject);

module.exports = {
  interface: contractObject.contracts.contract.Inbox.abi,
  bytecode: contractObject.contracts.contract.Inbox.evm.bytecode.object
};
