const express = require("express");
const router = express.Router();
const roleGuard = require("../middlewares/role.guard");
const {
  createBranch,
  createClass,
  createStudent,
  findStudentById,
  findStudentByIdNoPhone,
  findStudentByIdNoPhoneLean,
  findStudentsByClass,
  createStudentNameIndex,
  demonstrateIndexUse,
  calculateAverageCgpa,
  countStudentsByAge,
  findHighestCgpa,
  countStudentsByRole,
  calculateAverageAgeByRole,
  findAllStudents
} = require("../services");
/**
 * @swagger
 * /:
 *   get:
 *     summary: Initial Setup for Backend
 *     responses:
 *       200:
 *         description: Successfully reached the backend
 *         schema:
 *           type: string
 */
router.get("/", (req, res) => {
  res.status(200).send("Initial Setup for Backend");
});

/**
 * @swagger
 * /branch:
 *   post:
 *     summary: Create a new branch
 *     parameters:
 *       - in: body
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: The name of the branch
 *     responses:
 *       200:
 *         description: Branch created
 */
router.post("/branch", async (req, res) => {
  const name = req.body.name;
  const newBranch = await createBranch(name);
  res.status(201).send({ newBranch });
});

/**
 * @swagger
 * /class:
 *   post:
 *     summary: Create a new class
 *     parameters:
 *       - in: body
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: The name of the class
 *       - in: body
 *         name: branchId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the branch
 *     responses:
 *       200:
 *         description: Class created
 */
router.post("/class", async (req, res) => {
  const { name, branchId } = req.body;
  const newClass = await createClass(name, branchId);
  res.status(201).send({ newClass });
});

/**
 * @swagger
 * /student:
 *   post:
 *     summary: Create a new student
 *     parameters:
 *       - in: body
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: The name of the student
 *       - in: body
 *         name: age
 *         schema:
 *           type: number
 *         required: true
 *         description: The age of the student
 *       - in: body
 *         name: classId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the class
 *     responses:
 *       200:
 *         description: Student created
 */
router.post("/student", async (req, res) => {
  try {
    const { name, age, email, phone, classId, role, electives, cgpa } =
      req.body;

    const student = await createStudent(
      name,
      age,
      email,
      phone,
      classId,
      role,
      electives,
      cgpa
    );
    res.status(201).send({ student });
  } catch (err) {
    res.status(400).send("error encountered");
  }
});
/**
 * @swagger
 * /student/{id}:
 *   get:
 *     summary: Find a student by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the student
 *     responses:
 *       200:
 *         description: The student object
 */
router.get("/student/:id", async (req, res) => {
  const id = req.params.id;
  const student = await findStudentById(id);
  res.status(200).send({ student });
});


router.get("/student/all", async (req, res) => {
  const students = await findAllStudents();
  res.status(200).send({ students });
});

/**
 * @swagger
 * /student/{id}/no-phone:
 *   get:
 *     summary: Find a student by ID and exclude phone
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the student
 *     responses:
 *       200:
 *         description: The student object without phone number
 */
router.get("/student/:id/no-phone", async (req, res) => {
  const id = req.params.id;
  const student = await findStudentByIdNoPhone(id);
  res.status(200).send({ student });
});

/**
 * @swagger
 * /student/{id}/no-phone-lean:
 *   get:
 *     summary: Find a student by ID, exclude phone, and use lean
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the student
 *     responses:
 *       200:
 *         description: The student object without phone number and transformed to a plain JavaScript object
 */

router.get("/student/:id/no-phone-lean", async (req, res) => {
  const id = req.params.id;
  const student = await findStudentByIdNoPhoneLean(id);
  res.status(200).send({ student });
});

/**
 * @swagger
 * /students/class/{classId}:
 *   get:
 *     summary: Find all students in a specific class
 *     parameters:
 *       - in: path
 *         name: classId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the class
 *     responses:
 *       200:
 *         description: The array of student objects in the specified class
 */
router.get("/students/class/:classId", async (req, res) => {
  const classId = req.params.classId;
  const students = await findStudentsByClass(classId);
  res.sendStatus(200).send(students);
});

/**
 * @swagger
 * /student/{id}:
 *   delete:
 *     summary: Delete a student by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: student with id {id} deleted
 *         schema:
 *           type: string
 */
/**
 * @dev Route for deleting a student by id
 * @dev Code for deleting a student goes here
 * @params id - The ID of the student to delete
 */
router.delete("/student/:id", (req, res) => {
  res.status(200).send(`student with id ${req.params.id} deleted`);
});

/**
 * @swagger
 * /student/{id}:
 *   delete:
 *     summary: Delete a student by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: student with id {id} deleted
 *         schema:
 *           type: string
 */
/**
 * @dev This route is for deleting a student by their ID.
 * Only students with the 'admin' role have access to this route.
 *
 * @dev The 'roleGuard' middleware function is used to restrict access based on the student's role.
 * It checks the role of the authenticated student and only allows the request to
 * proceed if the student has one of the specified roles.
 * In this case, only 'admin' students are allowed.
 *
 * @dev The actual code for deleting a student goes here. This is a placeholder
 * that just sends a response indicating the student to be deleted.
 *
 * @param {string} id - The ID of the student to delete. This is a path parameter.
 */
router.delete("/student/:id", roleGuard("admin"), async (req, res) => {
  res.status(200).send(`student with id ${req.params.id} deleted`);
});

router.get("/stats", async (req, res) => {
  const stats = await demonstrateIndexUse();
  res.status(200).send({ stats });
});

router.get("/avg-cgpa", async (req, res) => {
  const avg = await calculateAverageCgpa();
  res.status(200).send({ averageCgpa: avg });
});

router.get("/count-by-age", async (req, res) => {
  const counts = await countStudentsByAge();
  res.status(200).json({ counts });
});

/**
 * @dev Route to get the highest CGPA among all students.
 */
router.get("/highest-cgpa", async (req, res) => {
  const highestCgpa = await findHighestCgpa();
  res.status(200).json({ highestCgpa });
});

/**
 * @dev Route to get the count of students in each role.
 */
router.get("/count-by-role", async (req, res) => {
  const counts = await countStudentsByRole();
  res.status(200).json({ counts });
});

/**
 * @dev Route to get the average age of students in each role.
 */
router.get("/average-age-by-role", async (req, res) => {
  const averages = await calculateAverageAgeByRole();
  res.status(200).json({ averages });
});
module.exports = router;
