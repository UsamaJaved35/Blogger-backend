const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');
dotenv.config({path:__dirname+'/.env'});
const connectDB = require('./config/db');
const blogRoutes = require('./routes/blogRoutes');
const userRoutes = require('./routes/userRoutes');
const { errorHandler, notFound } = require('./middleware/errorHandler');
const cors = require('cors');
const PORT = process.env.PORT || 5000;

connectDB();

const app = express();
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use(cors({origin:true}));
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/api/blogs', blogRoutes);
app.use('/api/users', userRoutes);

app.use(notFound);
app.use(errorHandler);

const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
module.exports = server;