const mongoose = require('mongoose');
const app = require('../server'); // Your Express app
jest.setTimeout(60000); // Increase timeout to 60 seconds

beforeAll(async () => {
  const url = process.env.MONGO_URI; // Use the MONGO_URI from the .env file
  try {
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    throw new Error('Failed to connect to MongoDB');
  }
});

afterAll(async () => {
  try {
    if (mongoose.connection.db) {
      console.log("Drop Db");
      await mongoose.connection.db.dropDatabase();
    }
    await mongoose.connection.close();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error('Error disconnecting from MongoDB', error);
  }
  finally{
    if(app){
      app.close()
    }
  }
});
