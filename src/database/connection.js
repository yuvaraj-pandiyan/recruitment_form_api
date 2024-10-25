import { Sequelize , DataTypes } from 'sequelize';
import * as dotenv from "dotenv";
import {jobFormModel} from "../database/models/jobForm.model.js"
dotenv.config();

const db = {}

const sequelize = new Sequelize(process.env.DATABASE, process.env.USER_NAME, process.env.PASSWORD, {
  host: process.env.DBHOST,
  dialect: "mysql",
  pool: {
    max: 10,     
    min: 0,     
    acquire: 30000, 
    idle: 10000 
  }
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected");
  } catch (err) {
    console.log("Error connecting to the database: ", err);
  }
})();

(async () => {
  try {
    await sequelize.sync();
    console.log("Database synced successfully.");
  } catch (error) {
    console.error("Error syncing the database:", error);
  }
})();



global.sequelize = sequelize;


db.jobFormModel = jobFormModel(sequelize, DataTypes);

db.Sequelize = Sequelize;
db.sequelize = sequelize;
export default db ;
