const server = require("./src/app");
const { conn } = require("./src/db");
const PORT = process.env.DB_PORT;

conn
  .sync({ alter: true })
  .then(() => {
    server.listen(PORT, () => {
      console.log(`server conectado a base de datos, puerto ${PORT}`);
    });
  })
  .catch((error) => console.error(error));
