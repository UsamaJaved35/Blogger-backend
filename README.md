# Blogger-backend

### Backend Setup - README.md
This project is a basic blogging platform backend built using Node.js, Express.js, and MongoDB.

## Features

- Secure authentication using JWT tokens.
- CRUD operations for blog posts.
- Scalable and maintainable architecture.
- Error handling and validation using middleware.
- Integration with a frontend React.js application.

## Technologies Used

- Node.js
- Express.js
- MongoDB (with Mongoose)
- JSON Web Tokens (JWT)
- bcrypt (for password hashing)
- Jest (for testing)
- Continuous Integration (CI) setup with GitHub Actions

## Getting Started

To get a local copy up and running, follow these steps.

### Prerequisites

- Node.js and npm installed on your machine.
- MongoDB installed and running locally or accessible via a cloud service.

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/UsamaJaved35/Blogger-backend.git
2. Navigate into the project directory
  cd blogging-platform-backend
3. Install dependencies
  npm install
4. Set up environment variables
Create a .env file in the root directory of the backend with the following variables:<br/>
MONGO_URI="mongodb://localhost:27017/blogger"<br/>
PORT=5000<br/>
URL=http://localhost<br/>
JWT_SECRET= use this command to generate (node -e "console.log(require('crypto').randomBytes(32).toString('hex'));")
5. Start the server<br/>
   ```sh
   npm start

The server should now be running on http://localhost:5000.

### API Endpoints
- POST /api/users/register: Register a new user.
- POST /api/users/login/:id Log in an existing user.
- GET /api/blogs Get all blog posts.
- GET /api/blogs/:id Get a specific blog post by ID.
- POST /api/blogs Create a new blog post.
- PUT /api/blogs/:id Update an existing blog post.
- DELETE /api/blogs/:id Delete a blog post.
For detailed API documentation, refer to the API source code or documentation comments.

### Testing
Run tests using Jest:<br/>
npm test

### Contact
Usama Javed - devbyusama007@gmail.co

Project Link: https://github.com/UsamaJaved35/Blogger-backend
