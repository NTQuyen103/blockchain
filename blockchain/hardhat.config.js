require('@nomicfoundation/hardhat-toolbox');
// KHÔNG commit private key. Đặt trong biến môi trường (.env) khi deploy.
module.exports = {
  solidity: '0.8.24',
  networks: {
    sepolia: { url: process.env.SEPOLIA_RPC_URL || '', accounts: process.env.DEPLOYER_KEY ? [process.env.DEPLOYER_KEY] : [] },
  },
};
