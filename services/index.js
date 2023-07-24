// Import the mongoose module. Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment.
const mongoose = require("mongoose");
//mongo connection library for nodejs
const MongoClient = require("mongodb").MongoClient;
//mongo connection string
const url = "mongodb://localhost:27017/";
//mongo database name
const dbName = "nmit";
//mongo collection name
const collectionName = "students";
const { Branch, Class, Student, Admin } = require("../schema");

// //connect to mongoDB and get the students collection
// const getStudentsCollection = async () => {
//     const client = await MongoClient.connect(url, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     });
//     const db = client.db(dbName);
//     const collection = db.collection(collectionName);
//     return collection;
//     }

/**
 * @dev Service to create a new branch.
 */
async function createBranch(name) {
  const branch = new Branch({ name });
  await branch.save();
  console.log(`Branch created with id ${branch._id}`);
  return branch;
}

/**
 * @dev Service to create a new class and assign it to a branch.
 */
async function createClass(name, branchId) {
  const newClass = new Class({ name, branch: branchId });
  await newClass.save();
  console.log(`Class created with id ${newClass._id}`);
  return newClass;
}

/**
 * @dev Service to create a new student and assign it to a class.
 */
async function createStudent(
  name,
  age,
  email,
  phone,
  classId,
  role,
  electives,
  cgpa
) {
  const student = new Student({
    name,
    age,
    email,
    phone,
    class: classId,
    role,
    electives,
    cgpa,
  });
  await student.save();
  console.log(`Student created with id ${student._id}`);
  return student;
}

/**
 * @dev Service to find a student by id and populate the class and branch information.
 * @param {String} id ID of the student
 */
async function findStudentById(id) {
  const student = await Student.findById(id).populate({
    path: "class",
    populate: { path: "branch" },
  });
  return student;
}

/**
 * @dev This function uses the 'find' method without any argument to return all documents in the 'Student' collection.
 * @returns {Promise<Array>} A promise that resolves to an array of all students in the 'Student' collection.
 */
async function findAllStudents() {
  try {

    const students = await Student.find();
    return students;
  } catch(err) {
    console.log(err)
    return null;
  }
}

/**
 * @dev This function uses the 'find' method without any argument to return all documents in the 'Student' collection,
 * but it also uses the 'skip' and 'limit' methods to implement pagination.
 * @param {number} page The page number. Page numbers start at 1.
 * @param {number} pageSize The number of documents per page.
 * @returns {Promise<Object>} A promise that resolves to an object containing the students on the specified page and pagination info.
 */
async function findAllStudentsPaginated(page, pageSize) {
  const totalItems = await Student.countDocuments({});
  const totalPages = Math.ceil(totalItems / pageSize);
  const currentPage = page;
  const students = await Student.find({})
    .skip((page - 1) * pageSize)
    .limit(pageSize);

  return {
    data: students,
    pagination: {
      currentPage,
      totalPages,
      totalItems,
    },
  };
}

/**
 * @dev Service to find a student by id and populate the class and branch information.
 * @param {String} id ID of the student
 * @dev Don't fetch any sensitive informations
 */
async function findStudentByIdNoPhone(id) {
  const student = await Student.findById(id)
    .select("-phone")
    .populate({
      path: "class",
      populate: { path: "branch" },
    });
  console.log(student);
  return student;
}

/**
 * @dev Service to find a student by id, populate the class and branch information, exclude the phone number, and return a plain JavaScript object.
 *
 * @param {string} id - The ID of the student to find.
 */
async function findStudentByIdNoPhoneLean(id) {
  const student = await Student.findById(id)
    .select("-phone") // Exclude the 'phone' field
    .populate({
      path: "class",
      populate: { path: "branch" },
    })
    .lean(); // Convert the result to a plain JavaScript object
  console.log(student);
  return student;
}

/**
 * @dev Service to find all students in a specific class.
 * @param {string} id ID of the student
 */
async function findStudentsByClass(classId) {
  const students = await Student.find({ class: classId }).populate("class");
  console.log(students);
  return student;
}

/**
 * @dev Service to delete a student by id
 * @param {string} id ID of the student
 */
async function deleteStudentById(id) {
  const student = await Student.findByIdAndDelete(id);
  console.log(student);
  return student;
}
/**
 * @dev Service to create an index on the 'name' field of the 'Student' model.
 */
async function createStudentNameIndex() {
  await Student.collection.createIndex({ name: 1 });
  console.log("Index created on Student name");
}

async function demonstrateIndexUse() {
  let stats = {};

  // Run a query without an index
  console.time("Without index");
  await Student.find({ email: "JohnDoe@gmail.com" });
  console.timeEnd("Without index");

  const startTimeWithoutIndex = process.hrtime();
  await Student.find({ email: "JohnDoe@gmail.com" });
  const endTimeWithoutIndex = process.hrtime(startTimeWithoutIndex);
  stats.withoutIndex =
    endTimeWithoutIndex[0] * 1000 + endTimeWithoutIndex[1] / 1e6; // convert to milliseconds

  // Create an index
  await Student.createIndexes({ email: 1 });

  // Run the same query with the index
  console.time("With index");
  await Student.find({ email: "JohnDoe@gmail.com" });
  console.timeEnd("With index");

  const startTimeWithIndex = process.hrtime();
  await Student.find({ email: "JohnDoe@gmail.com" });
  const endTimeWithIndex = process.hrtime(startTimeWithIndex);
  stats.withIndex = endTimeWithIndex[0] * 1000 + endTimeWithIndex[1] / 1e6; // convert to milliseconds

  return stats;
}

/**
 * @dev Comparison Operators
 * $eq: Matches values that are equal to a specified value.
 * $gt: Matches values that are greater than a specified value.
 * $gte: Matches values that are greater than or equal to a specified value.
 * $lt: Matches values that are less than a specified value.
 * $lte: Matches values that are less than or equal to a specified value.
 * $ne: Matches all values that are not equal to a specified value.
 * $in: Matches any of the values specified in an array.
 * $nin: Matches none of the values specified in an array.
 */

/**
 * @dev Service to find all students where age is less than 20.
 * @param {Array} electives Array of students
 */
async function getUserByAgeLessThan20() {
  const filter = { age: { $lt: 20 } };
  try {
    const students = await Student.find(filter);
    return students;
  } catch (err) {
    console.log(err);
  }
}

/**
 * @dev Service to find all students who have taken any of the specified electives.
 * @param {Array} electives Array of students
 */
async function findStudentsByElectives(electives) {
  const students = await Student.find({ electives: { $in: electives } });
  return students;
}

/**
 * @dev Service to find all students who have not taken any of the specified electives.
 * @param {Array} electives Array of students
 */
async function findStudentsByNotElectives(electives) {
  const students = await Student.find({ electives: { $nin: electives } });
  return students;
}

/**
 * @dev This function uses the 'find' method to search for all students with an age between 20 and 30.
 * It uses the '$gt' and '$lt' comparison query operators to match all documents where the 'age' field
 * value is greater than 20 and less than 30.
 * @returns {Promise<Array>} A promise that resolves to an array of students matching the criteria.
 */
async function findStudentsByAgeBetween20And30() {
  const students = await Student.find({ age: { $gt: 20, $lt: 30 } });
  return students;
}

/**
 * @dev This function uses the 'find' method to search for all students with an age less than 20 or greater than 30.
 * It uses the '$or' logical query operator to combine two conditions, and it will match all documents
 * that satisfy either condition. Each condition uses a comparison query operator ('$lt' or '$gt')
 * to match documents where the 'age' field value is less than 20 or greater than 30.
 * @returns {Promise<Array>} A promise that resolves to an array of students matching the criteria.
 */
async function findStudentByAgeLessthan20OrGreaterThan30() {
  const students = await Student.find({
    $or: [{ age: { $lt: 20 } }, { age: { $gt: 30 } }],
  });
  return students;
}

async function calculateAverageCgpa() {
  const result = await Student.aggregate([
    {
      $group: {
        _id: null, // Grouping all students together
        avgCgpa: { $avg: "$cgpa" },
      },
    },
  ]);
  // The result is an array with one element, which is an object containing the average CGPA
  return Number(result[0].avgCgpa.toFixed(3));
}

/**
 * @dev Service to count the number of students at each age.
 */
async function countStudentsByAge() {
  const result = await Student.aggregate([
    {
      $group: {
        _id: "$age",
        count: { $sum: 1 },
      },
    },
  ]);
  return result;
}

/**
 * @dev Service to find the highest CGPA among all students.
 */
async function findHighestCgpa() {
  const result = await Student.aggregate([
    {
      $group: {
        _id: null,
        maxCGPA: { $max: "$cgpa" },
      },
    },
  ]);
  return result[0].maxCGPA;
}
/**
 * @dev Service to group students by their role and get the count of students in each role.
 */
async function countStudentsByRole() {
  const result = await Student.aggregate([
    {
      $group: {
        _id: "$role",
        count: { $sum: 1 },
      },
    },
  ]);
  return result;
}

/**
 * @dev Service to calculate the average age of students in each role.
 */
async function calculateAverageAgeByRole() {
  const result = await Student.aggregate([
    {
      $group: {
        _id: "$role",
        avgAge: { $avg: "$age" },
      },
    },
  ]);
  return result;
}

async function createAdminUser() {
  const adminUser = await Admin.findOne({ role: "admin" });

  if (!adminUser) {
    const newAdminUser = new Admin({
      name: "admin",
      role: "admin",
      age: 20,
      email: "admin@nmitMock.ac",
      phone: 9080706050,
    });

    await newAdminUser.save();
    console.log("Admin user created");
  } else {
    console.log("Admin user already exists");
  }
}
module.exports = {
  createBranch,
  createClass,
  createStudent,
  findStudentById,
  findStudentByIdNoPhone,
  findStudentByIdNoPhoneLean,
  findStudentsByClass,
  createStudentNameIndex,
  demonstrateIndexUse,
  createAdminUser,
  calculateAverageCgpa,
  findStudentByAgeLessthan20OrGreaterThan30,
  findStudentsByAgeBetween20And30,
  findStudentsByNotElectives,
  findStudentsByElectives,
  getUserByAgeLessThan20,
  countStudentsByAge,
  findHighestCgpa,
  countStudentsByRole,
  calculateAverageAgeByRole,
  findAllStudents
};
// Usage examples:
// createBranch('Computer Science');
// createClass('CSE-A', '60f71b88f8ba7c3a8f8e9db7');
// createStudent('John Doe', 20, '60f71b88f8ba7c3a8f8e9db7');
// findStudentById('60f71b88f8ba7c3a8f8e9db7');
// findStudentsByClass('60f71b88f8ba7c3a8f8e9db7');
// createStudentNameIndex();
