
import mongoose from "mongoose";
import { SalaryModel } from "../models/Salary.js";
import { TeacherModel } from "../models/Teacher.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const ensureTeacherAccess = (req, salaryRecord) => {
  if (req.user.role === "teacher" && salaryRecord.teacherId !== req.user.teid) {
    throw new ApiError(403, "Forbidden: You can only access your own salary records");
  }
};

const normalizeNumber = (value) => {
  const number = Number(value);
  return Number.isNaN(number) ? 0 : number;
};

// @desc    Create a salary record for a teacher
// @route   POST /api/salaries/createSalary
const createSalary = asyncHandler(async (req, res) => {
  const {
    teacherName,
    teacherId,
    subjectName,
    grade,
    attendStudents,
    freeCardAmount,
    institutePayment,
    monthlySalary,
    payMonth,
    uploadPaymentFiles
  } = req.body;

  if (!teacherId) {
    throw new ApiError(400, "Teacher ID is required to create salary record");
  }

  const teacher = await TeacherModel.findOne({ teid: teacherId });
  if (!teacher) {
    throw new ApiError(404, "Teacher not found for the provided Teacher ID");
  }

  const salaryAmount = monthlySalary !== undefined && monthlySalary !== null
    ? normalizeNumber(monthlySalary)
    : normalizeNumber(institutePayment) + normalizeNumber(freeCardAmount);

  const salaryRecord = await SalaryModel.create({
    teacherName: teacherName || teacher.name,
    teacherId,
    subjectName: subjectName || teacher.subject,
    grade: grade || "",
    attendStudents: normalizeNumber(attendStudents),
    freeCardAmount: normalizeNumber(freeCardAmount),
    institutePayment: normalizeNumber(institutePayment),
    monthlySalary: salaryAmount,
    payMonth: payMonth || "",
    uploadPaymentFiles: uploadPaymentFiles || "",
    createdBy: req.user._id
  });

  return res
    .status(201)
    .json(new ApiResponse(201, salaryRecord, "Salary record created successfully"));
});

// @desc    Get all salary records
// @route   GET /api/salaries/all
const getSalaries = asyncHandler(async (req, res) => {
  const query = req.user.role === "teacher" ? { teacherId: req.user.teid } : {};
  const salaries = await SalaryModel.find(query).sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, salaries, "Salary records fetched successfully"));
});

// @desc    Get salary record by ID
// @route   GET /api/salaries/:id
const getSalaryById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid Salary Record ID format");
  }

  const salaryRecord = await SalaryModel.findById(id);
  if (!salaryRecord) {
    throw new ApiError(404, "Salary record not found");
  }

  ensureTeacherAccess(req, salaryRecord);

  return res
    .status(200)
    .json(new ApiResponse(200, salaryRecord, "Salary record retrieved successfully"));
});

// @desc    Get salary records by teacher ID
// @route   GET /api/salaries/teacher/:teacherId
const getSalaryByTeacherId = asyncHandler(async (req, res) => {
  const { teacherId } = req.params;

  if (!teacherId) {
    throw new ApiError(400, "Teacher ID is required");
  }

  if (req.user.role === "teacher" && req.user.teid !== teacherId) {
    throw new ApiError(403, "Forbidden: You can only access your own salary records");
  }

  const salaries = await SalaryModel.find({ teacherId }).sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, salaries, "Teacher salary records retrieved successfully"));
});

// @desc    Update salary record
// @route   PUT /api/salaries/:id
const updateSalary = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid Salary Record ID format");
  }

  const salaryRecord = await SalaryModel.findById(id);
  if (!salaryRecord) {
    throw new ApiError(404, "Salary record not found to update");
  }

  const updates = {
    teacherName: req.body.teacherName ?? salaryRecord.teacherName,
    subjectName: req.body.subjectName ?? salaryRecord.subjectName,
    grade: req.body.grade ?? salaryRecord.grade,
    attendStudents: req.body.attendStudents !== undefined ? normalizeNumber(req.body.attendStudents) : salaryRecord.attendStudents,
    freeCardAmount: req.body.freeCardAmount !== undefined ? normalizeNumber(req.body.freeCardAmount) : salaryRecord.freeCardAmount,
    institutePayment: req.body.institutePayment !== undefined ? normalizeNumber(req.body.institutePayment) : salaryRecord.institutePayment,
    payMonth: req.body.payMonth ?? salaryRecord.payMonth,
    paymentStatus: req.body.paymentStatus ?? salaryRecord.paymentStatus,
    uploadPaymentFiles: req.body.uploadPaymentFiles ?? salaryRecord.uploadPaymentFiles
  };

  updates.monthlySalary = req.body.monthlySalary !== undefined
    ? normalizeNumber(req.body.monthlySalary)
    : normalizeNumber(updates.institutePayment) + normalizeNumber(updates.freeCardAmount);

  const updatedSalary = await SalaryModel.findByIdAndUpdate(
    id,
    { $set: updates },
    { new: true, runValidators: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, updatedSalary, "Salary record updated successfully"));
});

// @desc    Delete salary record
// @route   DELETE /api/salaries/:id
const deleteSalary = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid Salary Record ID format");
  }

  const deletedSalary = await SalaryModel.findByIdAndDelete(id);
  if (!deletedSalary) {
    throw new ApiError(404, "Salary record not found or already deleted");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, deletedSalary, "Salary record deleted successfully"));
});

export {
  createSalary,
  getSalaries,
  getSalaryById,
  getSalaryByTeacherId,
  updateSalary,
  deleteSalary
};