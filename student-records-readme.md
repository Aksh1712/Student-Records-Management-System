# Student Records Management Smart Contract

This repository contains a Solidity smart contract for managing student records on the blockchain. The system allows for adding, retrieving, updating, and removing student data with each record containing a roll number and name.

## Features

- Add new student records with roll numbers and names
- Retrieve individual student details by roll number
- Update existing student information
- Remove student records from the system
- Get a list of all enrolled students' roll numbers
- View the total number of students in the system
- Transfer admin privileges to another address

## Contract Details

### StudentRecords.sol

The main contract that manages the student records. It includes:

- A `Student` struct to store student information
- Functions to add, get, update, and remove student records
- Admin-only access control for data modification
- Events to track when student records are modified

## Deployment

The contract was deployed to the Ethereum [NETWORK_NAME] network at address: `[CONTRACT_ADDRESS]`

### Deployment Process

1. Compiled the contract using Hardhat
2. Deployed using the deployment script (`deploy.js`)
3. Verified the contract on Etherscan

### Transaction Hash

Deployment Transaction: `[TRANSACTION_HASH]`

## Usage Instructions

### For Admin

1. After deployment, the deploying address becomes the admin
2. Add students using the `addStudent` function with roll number and name
3. Update student information with the `updateStudent` function
4. Remove students with the `removeStudent` function
5. Transfer admin rights using the `transferAdmin` function

### For Users

1. View student information with the `getStudent` function by providing a roll number
2. Get a list of all enrolled students with the `getAllStudents` function
3. Check the total number of students with the `getStudentCount` function

## Testing

The contract was tested using Hardhat's testing framework. Run tests with:

```
npx hardhat test
```

## License

This project is licensed under the MIT License - see the SPDX-License-Identifier in each file for details.
