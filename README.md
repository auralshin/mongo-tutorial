# Installation

```
$ npm install
$ npm run start
```

# Important Notes

## MongoDB Query Operators

### Comparison Operators:

- `$eq`: Matches values that are equal to a specified value.
- `$gt`: Matches values that are greater than a specified value.
- `$gte`: Matches values that are greater than or equal to a specified value.
- `$lt`: Matches values that are less than a specified value.
- `$lte`: Matches values that are less than or equal to a specified value.
- `$ne`: Matches all values that are not equal to a specified value.
- `$in`: Matches any of the values specified in an array.
- `$nin`: Matches none of the values specified in an array.

### Logical Operators:

- `$or`: Joins query clauses with a logical OR, returns all documents that match the conditions of either clause.
- `$and`: Joins query clauses with a logical AND, returns all documents that match the conditions of both clauses.
- `$not`: Inverts the effect of a query expression and returns documents that do not match the query expression.
- `$nor`: Joins query clauses with a logical NOR, returns all documents that fail to match both clauses.

### Element Operators:

- `$exists`: Matches documents that have the specified field.
- `$type`: Selects documents if a field is of the specified type.

### Array Operators:

- `$all`: Matches arrays that contain all elements specified in the query.
- `$elemMatch`: Selects documents if element in the array field matches all the specified `$elemMatch` conditions.
- `$size`: Selects documents if the array field is a specified size.

### Evaluation Operators:

- `$regex`: Selects documents where values match a specified regular expression.
- `$mod`: Performs a modulo operation on the value of a field and selects documents with a specified result.
- `$text`: Performs text search.



## MongoDB Operations with Mongoose

### Overview

This README describes the basic operations you can perform on a MongoDB document using Mongoose, a MongoDB object data modeling (ODM) library for Node.js.

### Creating Documents

- `Model.create()`: This function creates a new document and saves it to the database in a single operation. 

```javascript
const doc = await Model.create({ field1: 'value1', field2: 'value2' });
```

### Reading Documents

- `Model.find()`: This function finds all documents that match the specified filter.

```javascript
const docs = await Model.find({ field1: 'value1' });
```

- `Model.findOne()`: This function finds the first document that matches the specified filter.

```javascript
const doc = await Model.findOne({ field1: 'value1' });
```

- `Model.findById()`: This function finds a document by its unique ID.

```javascript
const doc = await Model.findById(id);
```

### Updating Documents

- `Model.updateOne()`: This function updates the first document that matches the specified filter.

```javascript
const result = await Model.updateOne({ field1: 'value1' }, { field1: 'new value' });
```

- `Model.updateMany()`: This function updates all documents that match the specified filter.

```javascript
const result = await Model.updateMany({ field1: 'value1' }, { field1: 'new value' });
```

- `Model.findOneAndUpdate()`: This function finds the first document that matches the specified filter, updates it, and optionally returns the updated document.

```javascript
const doc = await Model.findOneAndUpdate({ field1: 'value1' }, { field1: 'new value' }, { new: true });
```

### Deleting Documents

- `Model.deleteOne()`: This function deletes the first document that matches the specified filter.

```javascript
const result = await Model.deleteOne({ field1: 'value1' });
```

- `Model.deleteMany()`: This function deletes all documents that match the specified filter.

```javascript
const result = await Model.deleteMany({ field1: 'value1' });
```

- `Model.findOneAndDelete()`: This function finds the first document that matches the specified filter, deletes it, and optionally returns the deleted document.

```javascript
const doc = await Model.findOneAndDelete({ field1: 'value1' });
```

### Aggregation

- `Model.aggregate()`: This function executes an aggregation framework pipeline.

```javascript
const result = await Model.aggregate([{ $match: { field1: 'value1' } }, { $group: { _id: '$field2', count: { $sum: 1 } } }]);
```

Please refer to the official Mongoose and MongoDB [documentation](https://mongoosejs.com/docs/queries.html) for more detailed information and other advanced features.