const { expect } = require("chai");
//const { ethers } = require("hardhat");

describe("Data contract", () => {
  let contract;
  beforeEach(async () => {
    const Data = await ethers.getContractFactory("Data");
    contract = await Data.deploy();
  });
  it("Deployment should be successful", async () => {
    expect(await contract.head).to.not.throw();
  });
});
