// tests/blog.test.js
const request = require('supertest');
const app = require('../server'); // Your Express app
const User = require('../models/User');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

let token;
let userId;
let postId;

beforeEach(async () => {
  await User.deleteMany({});
  try {
    // Create a test user
    const user = new User({
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'password123'
    });
    await user.save();

    // Generate a token for the user
    token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

    userId = user._id; // Set userId after user is saved

    console.log('User created for tests:', user); // Log user details for debugging

  } catch (error) {
    console.error('Error setting up test user:', error);
    throw error;
  }
});
afterAll(async () => {
  await mongoose.connection.close();
});

describe('BlogPost CRUD', () => {
  it('should create a new blog post', async () => {
    const res = await request(app)
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Test Blog',
        content: 'This is a test blog content',
        author: userId,
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('title', 'Test Blog');
    postId = res.body._id;
  });

  it('should get all blog posts', async () => {
    const res = await request(app).get('/api/blogs');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(1);
  });

  it('should get a single blog post by ID', async () => {
    const res = await request(app).get(`/api/blogs/${postId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('title', 'Test Blog');
  });

  it('should update a blog post', async () => {
    const res = await request(app)
      .put(`/api/blogs/${postId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Updated Test Blog',
        content: 'This is updated test blog content',
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('title', 'Updated Test Blog');
  });

  it('should delete a blog post', async () => {
    const res = await request(app)
      .delete(`/api/blogs/${postId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Blog post deleted successfully');
  });

  it('should get my blogs', async () => {
    // Create another blog post for testing "my blogs"
    const resCreate = await request(app)
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'My Blog',
        content: 'This is my blog content',
        author: userId,
      });

    const res = await request(app)
      .get('/api/blogs/my-blogs')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0]).toHaveProperty('title', 'My Blog');
  });
});
