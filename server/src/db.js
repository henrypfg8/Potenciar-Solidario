require("dotenv").config();
const { Sequelize } = require("sequelize");
const path = require("path");
const fs = require("fs");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

// conexion con a tu base de datos
const sequelize = new Sequelize({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    port: 3306,
    database: DB_NAME,
    dialect: "mysql",
});


const basename = path.basename(__filename);

const modelDefiners = [];

//usamos filesystem para extraer de la carpeta models el nombre de cada modelo y pushearlo al array modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
    .filter(
        (file) =>
            file.indexOf(".") !== 0 &&
            file !== basename &&
            file.slice(-3) === ".js"
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
const { User, Answer, Publication, Comment, Review, Question, Category } =
    sequelize.models;

//Relacion de modelos

//---------------User-----------------
User.hasMany(Review, {
    foreignKey: {
        name: "userID",
        allowNull: false,
    },
});

Review.belongsTo(User, {
    foreignKey: {
        name: "userID",
        allowNull: false,
    },
});

User.hasMany(Publication, {
    foreignKey: {
        name: "userID",
        allowNull: false,
    },
});

Publication.belongsTo(User, {
    foreignKey: {
        name: "userID",
        allowNull: false,
    },
});

User.hasMany(Question, { foreignKey: "userId" });
Question.belongsTo(User, { foreingKey: "userId" });

User.hasMany(Answer, {
    foreignKey: {
        name: "userId",
        allowNull: false,
    },
});

Answer.belongsTo(User, {
    foreignKey: {
        name: "userId",
        allowNull: false,
    },
});

//-----------Publication----------------
Review.belongsTo(Publication, {
    foreignKey: {
        name: "PostID",
        allowNull: false,
    },
});

Publication.hasMany(Review, {
    foreignKey: {
        name: "PostID",
        allowNull: false,
    },
});

Publication.belongsTo(Category, {
    foreignKey: {
        name: "categoryId",
        allowNull: false,
    },
});

Category.hasMany(Publication, {
    foreignKey: {
        name: "categoryId",
        allowNull: false,
    },
});

//-----------Ansqwer-Question----------------
Category.hasMany(Question, { foreignKey: "categoryId" });
Question.belongsTo(Category, { foreignKey: "categoryId" });

Question.hasMany(Answer, {
    foreignKey: {
        name: "questionId",
        allowNull: false,
    },
});

Answer.belongsTo(Question, {
    foreignKey: {
        name: "questionId",
        allowNull: false,
    },
});

Answer.hasMany(Comment, {
    foreignKey: {
        name: "answerId",
        allowNull: false,
    },
});

Comment.belongsTo(Answer, {
    foreignKey: {
        name: "answerId",
        allowNull: false,
    },
});

module.exports = {
    ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
    conn: sequelize, // para importart la conexión { pool } = require('./db.js');
};
