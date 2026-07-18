
import express from "express";
import cors from "cors";
import {
    createaddadditionalclass,
    createshedule,
    getallreqadiclass,
    getallreqsch,
    getclass,
    addclass,
    updateclassid,
    updateclass,
    deleteclass,
    getadditionalclass,
    updateadditionalclass,
    getadditionalclassid,
    updateadditionalclassid,
    getadditionalclassextra,
    getschedule,
    deleteadditionalclass,
    deleteschedule
} from "../controllers/classController.js";
import { verifyJWT, authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();

// --- CLASS CREATION & MANAGEMENT ---
router.post('/addclass', verifyJWT, addclass);
router.get('/teachermyclasses/addclasses', getclass);
router.get('/getClass/:id', updateclassid);
router.put('/updateClass/:id', verifyJWT, updateclass);
router.delete('/deleteClass/:id', verifyJWT, deleteclass);

// --- ADDITIONAL CLASSES & SCHEDULES ---
router.post('/createaddadditionalclass', verifyJWT, createaddadditionalclass);
router.post('/createschedule', verifyJWT, createshedule);
router.get('/requestedadditionalclasses/additionalclasses', getallreqadiclass);
router.get('/requestedadditionalclasses/schedules', getallreqsch);

router.get('/approveclass/:id', verifyJWT, getadditionalclass);
router.get('/approveclass/detail/:id', verifyJWT, getadditionalclassid);

router.put('/request/:id', verifyJWT, updateadditionalclass);
router.put('/request/update/:id', verifyJWT, updateadditionalclassid);

router.get('/additionalclasses/approveclasses/extra', getadditionalclassextra);
router.get('/additionalclasses/approveclasses/schedule', getschedule);

// --- DELETIONS ---
router.delete('/deleteAdditionalClass/:id', verifyJWT, deleteadditionalclass);
router.delete('/deleteSchedule/:id', verifyJWT, deleteschedule);

export default router;