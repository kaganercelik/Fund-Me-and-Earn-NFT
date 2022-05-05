const Funding = artifacts.require("Funding");

module.exports = async function (deployer) {
  await deployer.deploy(Funding);
};
