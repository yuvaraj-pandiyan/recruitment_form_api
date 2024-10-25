import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import sequelize from './src/database/connection.js';
import routes from "./src/routes/routes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000; 


app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());


app.get("/api/health-check", (req, res) => {
    res.json({ status: "Server is up and running" });
});

app.use('/api',routes)

app.listen(port, () => {
    console.log(`Express server started on port ${port}`);
});
