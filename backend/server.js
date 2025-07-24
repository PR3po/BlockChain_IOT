require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const UserData = require("./models/data.model");
const cors = require("cors");
const { ethers } = require("ethers");
const ContractAbi = require("../backend/constants/contractABI.json");

const app = express();
// const port = process.env.PORT || 2000;
const port = 2000;
const smartContractAddress = "0xb0AA05Ec825aC588493B3E9c5941e728780F7858";

app.use(cors());
app.use(express.json());

const uri = String(process.env.USER_DB_URI);
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Successfully connected to the database");
});

app.post("/send-data", async (req, res) => {
  console.log("Received some data:", req.body);
  const { userId, name, weight, bloodPressure, pulse } = req.body;

  const alchemyAPI = process.env.ALCHEMY_API_KEY;
  const providerUrl = alchemyAPI;
  const provider = new ethers.providers.JsonRpcProvider(providerUrl);
  const contractABI = ContractAbi;

  const privateKey = process.env.PRIVATE_KEY;
  const wallet = new ethers.Wallet(privateKey, provider);

  const contract = new ethers.Contract(
    smartContractAddress,
    contractABI,
    wallet
  );

  const userIdBigInt = BigInt(userId); // convert userId from string to BigInt

  const listLength = await contract.getListLength(userIdBigInt);

  console.log(`Number of data records: ${listLength}`);

  const addObjectTx = await contract.addObject(
    name,
    weight,
    bloodPressure,
    pulse,
    userIdBigInt
  );
  await addObjectTx.wait(); // Wait for the transaction to be mined

  const newListLength = await contract.getListLength(userIdBigInt);
  console.log(`New list length: ${newListLength}`);

  const newDataRecord = new UserData({
    userId: Number(userId),
    index: listLength,
    name: name,
    weight: weight,
    bloodPressure: bloodPressure,
    pulse: pulse,
  });

  try {
    await newDataRecord.save();
    console.log("Data record saved successfully");
    res.send({ error: false, message: "Success" });
  } catch (err) {
    console.error(err);
    res.send({ error: true, message: err });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
