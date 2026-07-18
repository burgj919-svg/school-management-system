// const mongoose = require('mongoose');

// const UserSchema = new mongoose.Schema({
//     TeacherName:'String',
//     TeacherID:'String',
//     SubjectName:'String',
//     Grade:'Number',
//     AttendStudents:'Number',
//     FreeCardAmount:'Number',
//     InstitutePayment:'Number',
//     MonthlySalary:'Number',
//     Date:'String',
//     upload_paymentFiles: 'String',

// });

// const SalaryModel = mongoose.model('salary',UserSchema);

// module.exports = SalaryModel;




import mongoose from "mongoose";

const SalarySchema = new mongoose.Schema({
  teacherName: { type: String, required: true, trim: true },
  teacherId: { type: String, required: true, trim: true, index: true },
  subjectName: { type: String, trim: true, default: "" },
  grade: { type: String, trim: true, default: "" },
  attendStudents: { type: Number, default: 0 },
  freeCardAmount: { type: Number, default: 0 },
  institutePayment: { type: Number, default: 0 },
  monthlySalary: { type: Number, default: 0 },
  payMonth: { type: String, trim: true, default: "" },
  paymentStatus: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },
  uploadPaymentFiles: { type: String, trim: true, default: "" },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  createdAt: { type: Date, default: Date.now }
});

export const SalaryModel = mongoose.model("salary", SalarySchema);