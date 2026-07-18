import dotenv from 'dotenv';
import connectDB from './config/db.js';
import { User } from './models/user.model.js';
import { TeacherModel } from './models/Teacher.js';
import { StudentModel } from './models/Student.js';
import { SubjectModel } from './models/Subject.js';
import { SalaryModel } from './models/Salary.js';
import { NoticeModel } from './models/Notice.js';
import { LessonModel } from './models/Lesson.js';
import { questionModel } from './models/questions.js';
import { AttendanceModel } from './models/AttendanceModel.js';
import { BankModel } from './models/BankPayments.js';
import { CashModel } from './models/CashPayments.js';
import { OnlineModel } from './models/OnlinePayments.js';
import { WalletModel } from './models/Wallets.js';
import { RequestScheduleModel } from './models/RequestSchedule.js';
import { AddClassesModel } from './models/AddClasses.js';
import { ClassEnrollmentsModel } from './models/ClassEnrollments.js';
import { InstituteNoticeModel } from './models/InstituteNotice.js';
import { tfeedbackModel } from './models/teacherfeedback.js';
import { sfeedbackModel } from './models/servicefeedback.js';
import { Class } from './models/class.model.js';

dotenv.config();

const seed = async () => {
  await connectDB();

  console.log('Clearing existing collections...');
  await Promise.all([
    User.deleteMany(),
    TeacherModel.deleteMany(),
    StudentModel.deleteMany(),
    SubjectModel.deleteMany(),
    SalaryModel.deleteMany(),
    NoticeModel.deleteMany(),
    LessonModel.deleteMany(),
    questionModel.deleteMany(),
    AttendanceModel.deleteMany(),
    BankModel.deleteMany(),
    CashModel.deleteMany(),
    OnlineModel.deleteMany(),
    WalletModel.deleteMany(),
    RequestScheduleModel.deleteMany(),
    AddClassesModel.deleteMany(),
    ClassEnrollmentsModel.deleteMany(),
    InstituteNoticeModel.deleteMany(),
    tfeedbackModel.deleteMany(),
    sfeedbackModel.deleteMany(),
    Class.deleteMany(),
  ]);

  console.log('Creating dummy users, students, teachers, and subjects...');

  const admin = await User.create({
    first_name: 'Admin',
    last_name: 'User',
    email_address: 'admin@step2scientist.com',
    mobile_no: '0123456789',
    password: 'Admin@123',
    role: 'admin',
  });

  const manager = await User.create({
    first_name: 'Manager',
    last_name: 'User',
    email_address: 'manager@step2scientist.com',
    mobile_no: '0987654321',
    password: 'Manager@123',
    role: 'manager',
  });

  const teacher1 = await TeacherModel.create({
    name: 'Sarah Khan',
    email: 'sarah.khan@step2scientist.com',
    contactnumber: '03001234567',
    teid: 'TCH-1001',
    password: 'Teacher@123',
    gender: 'Female',
    subject: 'Mathematics',
  });

  const teacher2 = await TeacherModel.create({
    name: 'Imran Ali',
    email: 'imran.ali@step2scientist.com',
    contactnumber: '03007654321',
    teid: 'TCH-1002',
    password: 'Teacher@123',
    gender: 'Male',
    subject: 'Science',
  });

  const student1 = await StudentModel.create({
    name: 'Ayesha Noor',
    email: 'ayesha.noor@student.step2scientist.com',
    contactnumber: '03111222333',
    grade: '10',
    stdid: 'STD-2001',
    password: 'Student@123',
    gender: 'Female',
    parentname: 'Zahid Noor',
    parentphonenumber: '03004455667',
  });

  const student2 = await StudentModel.create({
    name: 'Ali Hassan',
    email: 'ali.hassan@student.step2scientist.com',
    contactnumber: '03119876543',
    grade: '11',
    stdid: 'STD-2002',
    password: 'Student@123',
    gender: 'Male',
    parentname: 'Farah Hassan',
    parentphonenumber: '03001239876',
  });

  const subjects = await SubjectModel.create([
    { sbid: 'SUB-001', subjectname: 'Mathematics', grade: '10', teid: teacher1.teid, teachername: teacher1.name, amount: '15000' },
    { sbid: 'SUB-002', subjectname: 'Science', grade: '11', teid: teacher2.teid, teachername: teacher2.name, amount: '16000' },
  ]);

  console.log('Creating class, schedule, and enrollment records...');

  const classRecord = await Class.create({
    className: 'Mathematics 10A',
    subject: 'Mathematics',
    teacher: admin._id,
    schedule: 'Mon/Wed/Fri 09:00 AM',
    maxCapacity: 35,
    enrolledStudents: [student1._id],
  });

  await AddClassesModel.create({
    teacher: teacher1.name,
    classid: 'MATH-10-01',
    teacherid: teacher1.teid,
    subject: 'Mathematics',
    time: '09:00 AM',
    date: '2026-07-05',
    grade: '10',
  });

  await ClassEnrollmentsModel.create({
    studentId: student1.stdid,
    classId: 'MATH-10-01',
    teacherid: teacher1.teid,
    subject: 'Mathematics',
    time: '09:00 AM',
    grade: '10',
  });

  console.log('Creating finance and salary dummy data...');

  await SalaryModel.create({
    teacherName: teacher1.name,
    teacherId: teacher1.teid,
    subjectName: 'Mathematics',
    grade: '10',
    attendStudents: 18,
    freeCardAmount: 500,
    institutePayment: 4200,
    monthlySalary: 32000,
    payMonth: 'July 2026',
    paymentStatus: 'paid',
    uploadPaymentFiles: 'salary_receipt_july.pdf',
    createdBy: admin._id,
  });

  await BankModel.create({
    itnumber: 'ITX-001',
    accountname: 'Student Fee Collection',
    accountnumber: '1234567890',
    bankname: 'National Bank',
    description: 'July tuition fee',
    date: '2026-07-01',
    amount: '15000',
    status: 'paid',
    type: 'bank',
    upload_files: 'bank_receipt_july.pdf',
  });

  await CashModel.create({
    itnumber: 'ITX-002',
    studentname: student2.name,
    description: 'Admission fee payment',
    date: '2026-07-02',
    amount: '2000',
    status: 'paid',
    type: 'cash',
  });

  await OnlineModel.create({
    itnumber: 'ITX-003',
    description: 'Online tuition payment',
    date: '2026-07-03',
    amount: '5000',
    status: 'paid',
    type: 'online',
  });

  await WalletModel.create({
    stdid: student1.stdid,
    studentname: student1.name,
    walletid: 'WALLET-1001',
    balance: '5400',
  });

  await RequestScheduleModel.create({
    teacher: teacher1.name,
    classid: 'MATH-10-01',
    teacherid: teacher1.teid,
    date1: '2026-07-21',
    date2: '2026-07-22',
    date3: '2026-07-23',
    date4: '2026-07-24',
    grade: '10',
    subject: 'Mathematics',
    status: 'pending',
  });

  console.log('Creating notices, lessons, questions, feedback, and attendance...');

  await InstituteNoticeModel.create({
    I_topic: 'Public Holiday Notice',
    I_date: '2026-07-18',
    I_description: 'Institute will remain closed for a national holiday.',
  });

  await NoticeModel.create({
    topic: 'Exam Date Announcement',
    date: '2026-07-15',
    description: 'Final exams start on 29th July. Prepare accordingly.',
    subject_name: 'Mathematics',
    grade: '10',
    teacher_id: teacher1.teid,
  });

  await LessonModel.create({
    lesson_Files: 'algebra-basics.pdf',
    lesson_topic: 'Algebra Basics',
    lesson_fileType: 'pdf',
    lesson_date: '2026-07-05',
    lesson_description: 'Introduction to algebra and linear equations.',
    subject_name: 'Mathematics',
    grade: '10',
    teacher_id: teacher1.teid,
    teachername: teacher1.name,
  });

  await questionModel.create({
    grade: '10',
    subject: 'Mathematics',
    teacher: teacher1.name,
    sid: student1.stdid,
    question: 'What is a quadratic equation?',
    answer: 'A quadratic equation is an expression of the form ax^2 + bx + c = 0.',
  });

  await tfeedbackModel.create({
    grade: '10',
    subject: 'Mathematics',
    teacher: teacher1.name,
    sid: student1.stdid,
    feedback: 'The teacher explains concepts clearly and patiently.',
  });

  await sfeedbackModel.create({
    sid: student2.stdid,
    grade: '11',
    feedback: 'The student portal navigation is smooth and fast.',
    reply: 'Thank you! We are working to improve it even more.',
  });

  await AttendanceModel.create({
    studentId: student1.stdid,
    classId: 'MATH-10-01',
    teacherId: teacher1.teid,
    subject: 'Mathematics',
    date: '2026-07-10',
    time: '09:00:00',
  });

  console.log('Seed data successfully inserted.');
  console.log('Admin login: admin@step2scientist.com / Admin@123');
  console.log('Manager login: manager@step2scientist.com / Manager@123');
  console.log('Teacher login: sarah.khan@step2scientist.com / Teacher@123');
  console.log('Student login: ayesha.noor@student.step2scientist.com / Student@123');
  process.exit(0);
};

seed().catch((error) => {
  console.error('Seed failed:', error);
  process.exit(1);
});
