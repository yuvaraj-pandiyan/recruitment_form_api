import express from "express";
import formController from "../controllers/form.controller.js";

const router = express.Router();

router.use('/form', formController);


export default router;