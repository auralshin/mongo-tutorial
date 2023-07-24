const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");

const { Branch } = require("./schema/branch.schema");
const { Class } = require("./schema/class.schema");
const { Student } = require("./schema/student.schema");

// Connection to MongoDB
mongoose.connect("mongodb://localhost:27017/nmit-full", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// List of branches
const branches = ["CSE", "ISE", "ECE", "MECH", "CIVIL", "EEE"];

const classes = ["A", "B", "C"];

// Function to generate fake students
async function generateStudents(classId) {
  for (let i = 0; i < 60; i++) {
    const student = new Student({
      name: faker.internet.userName(),
      age: faker.number.int({
        min: 18,
        max: 25,
      }),
      class: classId,
      email: faker.internet.email(),
      phone: faker.phone.number(),
      role: "Student",
      electives: [], // assuming electives are not required for this task
      cgpa: faker.number.float({ min: 3.7, max: 10, precision: 0.01 }),
    });
    await student.save();
  }
}

// Function to generate classes for each branch
async function generateClasses(branchId) {
  for (const className of classes) {
    const newClass = new Class({
      name: className,
      branch: branchId,
    });
    await newClass.save();
    await generateStudents(newClass._id);
  }
}

// Function to generate branches
async function generateBranches() {
  for (const branchName of branches) {
    try {
      const branch = new Branch({
        name: branchName,
        subjects: [
          "Engineering Mathematics",
          "Engineering Physics",
          "Engineering Chemistry",
          "Engineering Mechanics",
          "Computer Programming",
          "Data Structures and Algorithms",
          "Database Management Systems",
          "Operating Systems",
          "Computer Networks",
          "Artificial Intelligence",
          "Software Engineering",
          "Web Technologies",
          "Machine Learning",
          "Digital Signal Processing",
          "Control Systems",
          "VLSI Design",
          "Embedded Systems",
          "Internet of Things",
          "Cloud Computing",
          "Cybersecurity",
          "Robotics",
          "Power Systems",
          "Thermodynamics",
          "Fluid Mechanics",
          "Heat Transfer",
          "Structural Engineering",
          "Transportation Engineering",
          "Environmental Engineering",
          "Surveying",
        ],
      });
      await branch.save();
      await generateClasses(branch._id);
    } catch (err) {
      // If an error occurred while saving the branch, log it and continue with the next branch
      console.error(`Failed to create branch ${branchName}:`, err.message);
    }
  }
}

// Start the data generation process
generateBranches().then(() => console.log("Data generation completed"));
