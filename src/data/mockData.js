export const MOCK_DATA = {
  stats: {
    students: 1250,
    teachers: 85,
    classes: 42,
    attendanceRate: 94
  },
  students: [
    { id: 1, name: "Alice Johnson", class: "10-A", rollNo: 101, attendance: 92 },
    { id: 2, name: "Bob Smith", class: "10-A", rollNo: 102, attendance: 88 },
    { id: 3, name: "Charlie Brown", class: "10-A", rollNo: 103, attendance: 95 },
    { id: 4, name: "Diana Prince", class: "10-B", rollNo: 104, attendance: 98 },
  ],
  timetable: [
    { time: "08:00 - 08:45", mon: "Math", tue: "Physics", wed: "Math", thu: "English", fri: "History" },
    { time: "08:45 - 09:30", mon: "Physics", tue: "Math", wed: "Chemistry", thu: "Math", fri: "English" },
    { time: "09:30 - 10:15", mon: "English", tue: "Chemistry", wed: "Biology", thu: "Physics", fri: "Math" },
    { time: "10:15 - 10:45", mon: "BREAK", tue: "BREAK", wed: "BREAK", thu: "BREAK", fri: "BREAK" },
    { time: "10:45 - 11:30", mon: "Chemistry", tue: "Biology", wed: "English", thu: "History", fri: "PE" },
  ],
  homework: [
    { id: 1, subject: "Mathematics", title: "Algebra Exercises", due: "2023-11-20", status: "Pending" },
    { id: 2, subject: "Physics", title: "Lab Report: Optics", due: "2023-11-22", status: "Submitted" },
    { id: 3, subject: "English", title: "Essay on Hamlet", due: "2023-11-25", status: "Pending" },
  ],
  grades: [
    { subject: "Mathematics", midTerm: 85, final: 90, grade: "A" },
    { subject: "Physics", midTerm: 78, final: 82, grade: "B+" },
    { subject: "English", midTerm: 92, final: 94, grade: "A+" },
    { subject: "Chemistry", midTerm: 70, final: 75, grade: "B" },
  ],
  notices: [
    { id: 1, title: "Annual Sports Day", date: "2023-11-15", type: "Event" },
    { id: 2, title: "Exam Schedule Released", date: "2023-11-18", type: "Academic" },
    { id: 3, title: "Winter Vacation", date: "2023-12-20", type: "Holiday" },
  ]
};
