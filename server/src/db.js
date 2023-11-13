require("dotenv").config();
const { Sequelize } = require("sequelize");
const path = require("path");
const fs = require("fs");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

// conexion con a tu base de datos
const sequelize = new Sequelize({
  host: DB_HOST,
  username: DB_USER,
  password: DB_PASSWORD,
  port: DB_PORT,
  database: DB_NAME,
  dialect: "mysql", 
  logging:false
});

const basename = path.basename(__filename);

const modelDefiners = [];

//usamos filesystem para extraer de la carpeta models el nombre de cada modelo y pushearlo al array modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos que estan en el Array modelDefiners
modelDefiners.forEach((model) => model(sequelize));

// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);

let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const {
  User,
  Answer,
  Publication,
  Comment,
  Review,
  Question,
  Category,
  Organization,
  ForoCategories,
  PublicationComment,
  Like
} = sequelize.models;

//Relacion de modelos

User.hasMany(Publication, { foreignKey: "userID" });
User.hasMany(Question, { foreignKey: "userId" });
User.hasMany(Answer, { foreignKey: "userId" });
User.hasMany(Review, { foreignKey: "userId" });
Publication.belongsTo(User, { foreignKey: "userID" });
Publication.belongsTo(Category, { foreignKey: "categoryId" });
Publication.hasMany(Review, { foreignKey: "publicationId" });
Category.hasMany(Publication, { foreignKey: "categoryId" });
Category.hasMany(Question, { foreignKey: "categoryId" });
Review.belongsTo(Publication, { foreignKey: "publicationId" });

Question.belongsTo(User, { foreignKey: "userId" });
Question.hasMany(Answer, { foreignKey: "questionId" });
Answer.belongsTo(User, { foreignKey: "userId" });
Answer.belongsTo(Question, { foreignKey: "questionId" });
Answer.hasMany(Comment, { foreignKey: "answerId" });
Comment.belongsTo(Answer, { foreignKey: "answerId" });
Comment.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Comment, { foreignKey: "userId" });
User.belongsTo(Organization, { foreignKey: "organizationId" }) 
Organization.hasMany(User, { foreignKey: "organizationId" });

Question.belongsTo(ForoCategories, { foreignKey: "categoryId"})
ForoCategories.hasMany(Question, { foreignKey: "categoryId" })

Like.belongsTo(Publication, { foreignKey: "publicationId" });
Like.belongsTo(User, { foreignKey: "userId" });
Publication.hasMany(Like, { foreignKey: "publicationId" });

// COMENTARIOS DE PUBLICACIONES 
PublicationComment.belongsTo(Publication, { foreignKey: 'publicationId' });
PublicationComment.belongsTo(User, { foreignKey: 'userId' });
Publication.hasMany(PublicationComment, { foreignKey: 'publicationId' });
User.hasMany(PublicationComment, { foreignKey: 'userId' });


module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { pool } = require('./db.js');
};
