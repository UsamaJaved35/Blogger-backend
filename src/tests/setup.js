const mongoose = require('mongoose');
const app = require('../server'); // Your Express app

beforeAll(done => {
  const url = 'mongodb://127.0.0.1/blogger_test'; // Use a different database for tests
  mongoose.createConnection(url, { useNewUrlParser: true, useUnifiedTopology: true });
  done()
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
 await mongoose.connection.close();
 await app.close()
});
