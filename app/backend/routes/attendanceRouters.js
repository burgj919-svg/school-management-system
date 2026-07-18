

import express from "express";
import {
    createAttendance,
    getAllAttendance,
    getAttendanceById,
    deleteAttendance
} from "../controllers/attendanceController.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post('/attendancemark', verifyJWT, createAttendance);
router.get('/attendancemark', verifyJWT, getAllAttendance);
router.get('/attendancemark/:id', verifyJWT, getAttendanceById);
router.delete('/attendancemark/:id', verifyJWT, deleteAttendance);

export default router;