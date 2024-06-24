// tests/blog.test.js
const request = require('supertest');
const app = require('../server'); // Your Express app
const User = require('../models/User');
const BlogPost = require('../models/BlogPost');
const mongoose = require('mongoose');

let token;
let userId;
let postId;

beforeAll(async () => {
  // Create a test user and get token
  const user = await User.create({ username: 'testuser', email: 'testuser@example.com', password: 'password123' });
  userId = user._id;
  
  const response = await request(app)
    .post('/api/users/login')
    .send({ email: 'testuser@example.com', password: 'password123' });
  
  token = response.body.token;
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
