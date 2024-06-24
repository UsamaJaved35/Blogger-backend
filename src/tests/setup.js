const mongoose = require('mongoose');
const app = require('../server'); // Your Express app

beforeAll(async () => {
  const url = 'mongodb://127.0.0.1/blogger_test'; // Use a different database for tests
  await mongoose.createConnection(url, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
 await mongoose.connection.close();
 await app.close()
});
