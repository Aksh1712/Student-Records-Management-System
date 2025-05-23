const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("StudentRecords", function () {
  let StudentRecords;
  let studentRecords;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    // Get the ContractFactory and Signers
    StudentRecords = await ethers.getContractFactory("StudentRecords");
    [owner, addr1, addr2] = await ethers.getSigners();

    // Deploy the contract
    studentRecords = await StudentRecords.deploy();
  });

  describe("Deployment", function () {
    it("Should set the right admin", async function () {
      expect(await studentRecords.admin()).to.equal(owner.address);
    });
  });

  describe("Student Management", function () {
    it("Should allow admin to add a student", async function () {
      await studentRecords.addStudent(1001, "John Doe");
      
      const [rollNumber, name] = await studentRecords.getStudent(1001);
      expect(rollNumber).to.equal(1001);
      expect(name).to.equal("John Doe");
    });

    it("Should not allow non-admin to add a student", async function () {
      await expect(
        studentRecords.connect(addr1).addStudent(1001, "John Doe")
      ).to.be.revertedWith("Only admin can call this function");
    });

    it("Should not allow adding a student with existing roll number", async function () {
      await studentRecords.addStudent(1001, "John Doe");
      await expect(
        studentRecords.addStudent(1001, "Jane Doe")
      ).to.be.revertedWith("Student already exists");
    });

    it("Should allow admin to update a student", async function () {
      await studentRecords.addStudent(1001, "John Doe");
      await studentRecords.updateStudent(1001, "John Smith");
      
      const [rollNumber, name] = await studentRecords.getStudent(1001);
      expect(name).to.equal("John Smith");
    });

    it("Should allow admin to remove a student", async function () {
      await studentRecords.addStudent(1001, "John Doe");
      await studentRecords.removeStudent(1001);
      
      await expect(
        studentRecords.getStudent(1001)
      ).to.be.revertedWith("Student does not exist");
    });

    it("Should track the correct student count", async function () {
      expect(await studentRecords.getStudentCount()).to.equal(0);
      
      await studentRecords.addStudent(1001, "John Doe");
      expect(await studentRecords.getStudentCount()).to.equal(1);
      
      await studentRecords.addStudent(1002, "Jane Doe");
      expect(await studentRecords.getStudentCount()).to.equal(2);
      
      await studentRecords.removeStudent(1001);
      expect(await studentRecords.getStudentCount()).to.equal(1);
    });

    it("Should return all student roll numbers", async function () {
      await studentRecords.addStudent(1001, "John Doe");
      await studentRecords.addStudent(1002, "Jane Doe");
      
      const rollNumbers = await studentRecords.getAllStudents();
      expect(rollNumbers.length).to.equal(2);
      expect(rollNumbers[0]).to.equal(1001);
      expect(rollNumbers[1]).to.equal(1002);
    });
  });

  describe("Admin Transfer", function () {
    it("Should allow admin to transfer admin rights", async function () {
      await studentRecords.transferAdmin(addr1.address);
      expect(await studentRecords.admin()).to.equal(addr1.address);
      
      // Now addr1 should be able to add students
      await studentRecords.connect(addr1).addStudent(1001, "John Doe");
      
      // Original owner should no longer have admin rights
      await expect(
        studentRecords.addStudent(1002, "Jane Doe")
      ).to.be.revertedWith("Only admin can call this function");
    });
  });
});
