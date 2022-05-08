const BigNumber = require("bignumber.js");
const utils = require("./helpers/utils.js");
const Funding = artifacts.require("Funding");

require("chai")
  .use(require("chai-as-promised"))
  .should();

contract("Funding", (accounts) => {
  //  Test Codes
  let funding,
    name,
    title,
    definition,
    requiredAmount,
    requiredDateTrue,
    requiredDateFalse;

  const acc1 = accounts[0];
  const acc2 = accounts[1];
  before(async () => {
    funding = await Funding.new();
    name = "Yusuf Kağan";
    title = "FUND ME";
    definition = "I need money!";
    requiredAmount = web3.utils.toWei("2", "ether");
    requiredDateTrue = 1611100800; // 20/01/2021
    requiredDateFalse = 1674172800; // 20/01/2023
    await funding.setDonated(
      name,
      title,
      definition,
      requiredAmount,
      requiredDateTrue,
      { from: acc1 }
    );
    let donatedInfo = await funding.donatedInfo(0);
  });

  //  Remove "x" at the beginning of "xit" in order to run tests or add "x" to skip it
  describe("Funding deployment", async () => {
    it("set Donated struct successfully", async () => {
      let donatedInfo = await funding.donatedInfo(0);
      assert.equal(name, donatedInfo.name);
      assert.equal(title, donatedInfo.title);
      assert.equal(definition, donatedInfo.definition);
      assert.equal(requiredAmount, donatedInfo.requiredAmount.toString());
      assert.equal(requiredDateTrue, donatedInfo.requiredDate.toString());
    });

    it("it should fund successfully", async () => {
      let donatedInfo = await funding.donatedInfo(0);

      await funding.fund(0, {
        from: acc2,
        value: web3.utils.toWei("4", "ether"),
      });
      let amount = await funding.getDonatedAmount(donatedInfo.donatedAddress);
      let donator_amount = await funding.getDonatorAmount(0, acc2);

      assert.equal(amount.toString(), web3.utils.toWei("4", "ether"));
      assert.equal(donator_amount.toString(), web3.utils.toWei("4", "ether"));
    });

    it("should withdraw successfully", async () => {
      let donatedInfo = await funding.donatedInfo(0);
      await funding.fund(0, {
        from: acc2,
        value: web3.utils.toWei("4", "ether"),
      });

      await funding.withdraw(0, { from: acc1 });
      let balance = await funding.getDonatedAmount(donatedInfo.donatedAddress);
      assert.equal(0, balance);
    });

    it("should fail the withdraw", async () => {
      let donatedInfo = await funding.donatedInfo(0);
      await funding.setDonated(
        name,
        title,
        definition,
        requiredAmount,
        requiredDateFalse
      );
      await funding.fund(1, {
        from: acc2,
        value: web3.utils.toWei("4", "ether"),
      });

      await utils.shouldThrow(funding.withdraw(1, { from: acc1 }));
    });
  });
});
