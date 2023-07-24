const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the schema for the 'Student' model.
/**
 * @dev [Object Key] field in the 'Student' schema.
 * Type of the 'name' field is set to 'String'.
 * The 'required' option is set to 'true' which means the 'name' field must be provided when a new student is created.
 * The 'trim' option is set to 'true' which removes any whitespace from both ends of the 'name' string.
 * The 'index' option is set to 'true' which tells Mongoose to create an index for this field in MongoDB.
 * The 'unique' option is set to true which tells Mongoose that this entry can't be replicated
 * The 'default' option stores the value for the field if no value passed by default for any record created it'll keep the default value
 * @dev The 'index' option is set to 'true' which tells Mongoose
 * to create an index for this field in MongoDB.
 * Indexes can improve your query performance. On the other hand,
 * they can add some overhead during document insertion, because indexes also need to be updated.
 */
const StudentSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },

  age: {
    type: Number,
    required: true,
  },

  class: {
    type: Schema.Types.ObjectId,
    ref: "Class",
  },

  email: {
    type: String,
    required: true,
    unique: true,
    //   index: true,
  },

  phone: {
    type: String,
    required: true,
    index: true,
  },

  role: {
    type: String,
    required: true,
    default: "Student",
  },
  electives: {
    type: [String],
    required: false,
    default: [],
  },
  cgpa: {
    type: Number,
    required: false,
    default: 0,
  },
});

// Create the models from the schemas and export them
const Student = mongoose.model("Student", StudentSchema);
module.exports = { Student };

/**
    * @dev Difference between Insert and Create
    * Validation: Mongoose allows you to define validation rules in your schema. 
    * When you use the create method, Mongoose will automatically validate the data 
    * against your schema before inserting it into the database. The MongoDB insertOne method does not do this.

    * Middleware: Mongoose allows you to define middleware (also called pre and post 
    * hooks) that can run before or after certain operations. If you define a pre-save
    * hook in your schema, it will be executed before the document is saved to the database
    *  when you use the create method. The MongoDB insertOne method does not have this feature.

    * Default Values: In Mongoose, you can define default values in your schema. When you use 
    * the create method, if a field is not provided, Mongoose will automatically set it to its
    * default value. The MongoDB insertOne method does not do this.
*/
