const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the schema for the 'Branch' model.
/**
 * @dev [Object Key] field in the 'Student' schema.
 * Type of the 'name' field is set to 'String'.
 * The 'required' option is set to 'true' which means the 'name' field must be provided when a new student is created.
 * The 'trim' option is set to 'true' which removes any whitespace from both ends of the 'name' string.
 * The 'index' option is set to 'true' which tells Mongoose to create an index for this field in MongoDB.
 * @dev The 'index' option is set to 'true' which tells Mongoose
 * to create an index for this field in MongoDB.
 * Indexes can improve your query performance. On the other hand,
 * they can add some overhead during document insertion, because indexes also need to be updated.
 */
const BranchSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    index: true,
    unique: true,
  },

  subjects: {
    type: [String],
    required: true,
  },
});

// Create the models from the schemas and export them
const Branch = mongoose.model("Branch", BranchSchema);
module.exports = { Branch };
