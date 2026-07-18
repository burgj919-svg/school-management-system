import express from "express";
import {
  registerStudent,
  loginStudent,
  forgotPasswordStudent,
  getCurrentStudent,
  getStudentById,
  updateStudentDetails,
  getAllStudents,
  deleteStudent,
  logoutStudent,
} from "../controllers/studentController.js";

import { verifyJWT, authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();

// ==================== STUDENT (purana URL pattern) ====================
router.post("/studentregister", registerStudent);
router.post("/studentlogin", loginStudent);
router.post("/studentforgetpassword", forgotPasswordStudent);

router.get("/studentprofile", verifyJWT, getCurrentStudent);
router.get("/studentprofileid/:id", verifyJWT, authorizeRoles("admin", "manager"), getStudentById);
router.get("/studentprofileall", verifyJWT, authorizeRoles("admin", "manager"), getAllStudents);

router.put("/studentprofileedit", verifyJWT, updateStudentDetails);
router.put("/studentprofileeditid/:id", verifyJWT, updateStudentDetails);

router.delete("/deletestudent/:id", verifyJWT, authorizeRoles("admin", "manager"), deleteStudent);

router.post("/studentlogout", verifyJWT, logoutStudent);

export default router;