import express from "express";
import {
  registerAdminManager,
  loginAdminManager,
  forgotPasswordAdminManager,
  getCurrentAdminManager,
  updateAdminManager,
  logoutAdminManager,
  getAllManagers,
  getAllAdmins,
  getAllStudents,
  getAllTeachers,
  deleteAnyUser,
  googleAuth,
} from "../controllers/adminManagerController.js";

import { verifyJWT, authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerAdminManager);
router.post("/login", loginAdminManager);          // Admin login
router.post("/managerlogin", loginAdminManager);   // Manager login

router.post("/forgotpassword", forgotPasswordAdminManager);

router.get("/profile", verifyJWT, authorizeRoles("admin", "manager"), getCurrentAdminManager);
router.put("/profileedit", verifyJWT, authorizeRoles("admin", "manager"), updateAdminManager);

// ==================== ADMIN PANEL: cross-entity oversight ====================

router.get("/managerprofileall", verifyJWT, authorizeRoles("admin", "manager"), getAllManagers);
router.get("/adminprofileall", verifyJWT, authorizeRoles("admin"), getAllAdmins);
router.get("/getstudentsadmin", verifyJWT, authorizeRoles("admin", "manager"), getAllStudents);
router.get("/getteachersadmin", verifyJWT, authorizeRoles("admin", "manager"), getAllTeachers);

router.delete("/deleteuser/:id", verifyJWT, authorizeRoles("admin"), deleteAnyUser);

router.post("/logout", verifyJWT, logoutAdminManager);
router.post("/google-auth", googleAuth);

export default router;