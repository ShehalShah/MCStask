const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const taskRoutes = require('./routes/tasks');

const app = express();

app.use(express.json());
app.use(cors());

connectDB();

app.use('/', taskRoutes);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
