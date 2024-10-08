const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log('UNCAUGHT EXCEPTION! Shutting down...');
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

//HEJ PÅ DIG

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true, // Add this option
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('DB connection success'));

// console.log(process.env);

const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`App running on port: ${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION! Shutting down...');
  server.close(() => {
    process.exit(1);
  });
});
