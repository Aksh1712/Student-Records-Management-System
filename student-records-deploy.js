const { ethers } = require("hardhat");

async function main() {
  // Get the contract factory
  const StudentRecords = await ethers.getContractFactory("StudentRecords");
  
  // Deploy the contract
  console.log("Deploying StudentRecords contract...");
  const studentRecords = await StudentRecords.deploy();
  
  // Wait for deployment to finish
  await studentRecords.deployed();
  
  console.log(`StudentRecords deployed to: ${studentRecords.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
