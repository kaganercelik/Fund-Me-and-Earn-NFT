const Funding = artifacts.require("Funding");

const getFunding = () => {
  const funding = Funding.deployed();
  return funding;
};

export default getFunding;
