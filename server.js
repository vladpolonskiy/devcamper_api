const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const connectDB = require('./config/db');

// Load env vars
dotenv.config({
  path: './config/config.env'
});

//Middlewares
const morgan = require('morgan');
const errorHandler = require('./middleware/error');

//Route files
const bootcamps = require('./routes/bootcamps');
const courses = require('./routes/courses');

// Connect to database
connectDB();

const app = express();

const PORT = process.env.PORT || 5000;

// Body parser
app.use(express.json());

// Middlewares
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Mount routes
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);

// Cathing errors
app.use(errorHandler);

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Err: ${err.message}`.red);
  server.close(() => process.exit(1));
});