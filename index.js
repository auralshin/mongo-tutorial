// Import the express module. Express is a popular Node.js web framework.
const express = require("express");
const cors = require("cors");
// Import the mongoose module. Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment.
const mongoose = require("mongoose");
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./swagger');
const { createAdminUser } = require('./services');
/**
 * @dev MongoDB connection string.
 * This string is used to connect to the MongoDB database. It specifies the protocol, host, port, and database name.
 * In this case, it's connecting to a MongoDB instance that is running locally on port 27017, and the database is named "nmit".
 */
const uri = "mongodb://localhost:27017/nmit-full";

/**
 * @dev Connect to MongoDB.
 * The mongoose.connect() function is used to connect to the MongoDB instance.
 * It takes two arguments: the connection string and an options object.
 * The useNewUrlParser and useUnifiedTopology options are set to true to use
 * the new URL string parser and the new server discovery and monitoring engine respectively.
 *
 * If the connection is successful, a message is logged to the console.
 * If there's an error, it's caught and logged to the console.
 */
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    createAdminUser()
    console.log("MongoDB Connected…");
  })
  .catch((err) => console.log(err));

// Initialize an express application.
const app = express();
// Use the 'cors' middleware in the express app.
app.use(
    // Call the cors function with an options object.
    cors({
      // The "origin" option specifies the URI that may access the resource.
      // In this case, only requests from "http://localhost:4200" are allowed to access the server.
      // This is useful for restricting cross-origin requests for security purposes.
      origin: "http://localhost:4200",
    })
  );

// Use the express.json() middleware.
// This is a built-in middleware function in Express.
// It parses incoming requests with JSON payloads and is based on body-parser.
// The result of the parsing is populated on the request body (req.body).
app.use(express.json());

// Use the express.urlencoded() middleware.
// This is also a built-in middleware function in Express.
// It parses incoming requests with URL-encoded payloads.
// The "extended" option allows parsing of the nested objects. When set to true, you can parse nested objects, and when set to false, you can parse strings or arrays.
app.use(express.urlencoded({ extended: true }));

// Use the routes defined in './routes/api.js' for any routes that start with '/api'.
// This is an example of how to split routes into separate modules to keep the code organized.
app.use('/api/v1', require('./routes/api.js'));

// Serve the Swagger UI and setup Swagger specs at the '/docs' route.
// Swagger UI is a collection of HTML, Javascript, and CSS assets that dynamically generate beautiful documentation from a Swagger-compliant API.
// 'swaggerUi.serve' returns the middleware to Serve the Swagger UI.
// 'swaggerUi.setup(swaggerSpecs)' returns the middleware to Setup the Swagger UI, with the given options. 
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
app.get('/docs-json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpecs);
  });
/**
 * @dev Start the server.
 * The app.listen() function is used to bind and listen for connections on the specified host and port.
 * This server is set to run on port 3000.
 * When the server is ready to receive connections, a message is logged to the console.
 */
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

// The following options are passed to mongoose.connect() in the above code:
// useNewUrlParser: This option tells Mongoose to use the new MongoDB Node.js driver's new URL string
// parser instead of the deprecated one. The MongoDB connection string can be a bit complex with the
// inclusion of user credentials, the server (or cluster of servers), and optionally a variety of
// configuration options. The new parser is more capable and resilient to unusual connection strings
// and is generally more maintainable. As of Mongoose 5.7.0, the useNewUrlParser option is true by default.

// useUnifiedTopology: This is a more recent option. The MongoDB Node.js driver reworked its internal
// structure, specifically the management of connections to MongoDB servers, in order to support new
// MongoDB features more easily. The useUnifiedTopology option tells Mongoose to use the new connection
// management engine. It's generally a good idea to enable this, as the old connection management engine
// has been deprecated and will be removed in future versions. As of Mongoose 5.7.0, the useUnifiedTopology
// option is also true by default.
