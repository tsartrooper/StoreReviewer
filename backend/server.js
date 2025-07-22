
import app from './app.js';
import http from "http";
import { sequelize, syncDatabase } from './index.js';


const PORT = 5000;


app.get('/', (req, res) => {
  res.send('Store Rating API is running.');
});


(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to database established successfully.');

    await syncDatabase();

    const server = http.createServer(app);


    // Start the server
    server.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();
