async function main() {
  const SmartContract = await ethers.getContractFactory("Data");
  const contract = await SmartContract.deploy();
  console.log("Data contract address:", contract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
