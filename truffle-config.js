const HDWalletProvider = require("@truffle/hdwallet-provider");
require("dotenv").config();

module.exports = {
  networks: {
    cldev: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*",
    },
    ganache: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
    },
    rinkeby: {
      provider: () => {
        return new HDWalletProvider(
          process.env.MNEMONIC,
          `${process.env.RINKEBY_RPC_URL}`
        );
      },
      network_id: "4",
      skipDryRun: true,
    },
  },
  contracts_build_directory: "./src/truffle_abis/",
  compilers: {
    solc: {
      version: "0.8.1",
    },
  },
};
