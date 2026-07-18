import express from "express";
import {
  registerTeacher,
  loginTeacher,
  forgotPasswordTeacher,
  getCurrentTeacher,
  getTeacherById,
  updateTeacherDetails,
  getAllTeachers,
  deleteTeacher,
  logoutTeacher,
} from "../controllers/teacherController.js";

import { verifyJWT, authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();

// ==================== TEACHER (purana URL pattern) ====================
router.post("/teacherregister", registerTeacher);
router.post("/teacherlogin", loginTeacher);
router.post("/teacherforgetpassword", forgotPasswordTeacher);

router.get("/teacherprofile", verifyJWT, getCurrentTeacher);
router.get("/teacherprofileid/:id", verifyJWT, authorizeRoles("admin", "manager"), getTeacherById);
router.get("/teacherprofileall", verifyJWT, authorizeRoles("admin", "manager"), getAllTeachers);

router.put("/teacherprofileedit", verifyJWT, updateTeacherDetails);
router.put("/teacherprofileeditid/:id", verifyJWT, updateTeacherDetails);

router.delete("/deleteteacher/:id", verifyJWT, authorizeRoles("admin", "manager"), deleteTeacher);

router.post("/teacherlogout", verifyJWT, logoutTeacher);

export default router;