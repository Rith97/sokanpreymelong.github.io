import { TabId, AchievementCategory, StudentAchievement, Teacher, Student, NavItem, AdminSubTabId } from './types';

export const NAV_ITEMS: NavItem[] = [
  { id: TabId.Home, label: 'ទំព័រដើម', icon: 'fas fa-home' },
  { id: TabId.Achievements, label: 'សិស្សពូកែ', icon: 'fas fa-trophy' },
  { id: TabId.Teachers, label: 'បុគ្គលិក', icon: 'fas fa-chalkboard-teacher' },
  { id: TabId.History, label: 'សាវតាសាលា', icon: 'fas fa-history' },
  { id: TabId.Results, label: 'លទ្ធផល', icon: 'fas fa-poll' },
  { id: TabId.Announcements, label: 'ដំណឹង', icon: 'fas fa-bullhorn' },
  { id: TabId.Contact, label: 'ទំនាក់ទំនង', icon: 'fas fa-phone-alt' },
  { id: TabId.Admin, label: 'គ្រប់គ្រង', icon: 'fas fa-user-shield', adminOnly: true, className: 'bg-purple-600' },
];

export const INITIAL_STUDENTS: Student[] = [
    { id: 's1', name: 'សុខ សំណាង', class: 'ទី១២ ក', gender: 'ប្រុស', phone: '012 345 678' },
    { id: 's2', name: 'វ៉ាន ស្រីហេង', class: 'ទី១១ ខ', gender: 'ស្រី', phone: '011 223 344' },
    { id: 's3', name: 'ចាន់ វុទ្ធី', class: 'ទី១០ គ', gender: 'ប្រុស', phone: '010 998 877' },
];

export const INITIAL_TEACHERS: Teacher[] = [
    { id: 't1', name: 'លោកគ្រូ សុខ ចាន់ណា', subject: 'គណិតវិទ្យា', experience: '10 ឆ្នាំ', imageUrl: 'https://randomuser.me/api/portraits/men/32.jpg', gender: 'ប្រុស', email: 'sok.channa@example.com', phone: '012000001' },
    { id: 't2', name: 'អ្នកគ្រូ កែវ ស្រីពេជ្រ', subject: 'រូបវិទ្យា', experience: '8 ឆ្នាំ', imageUrl: 'https://randomuser.me/api/portraits/women/44.jpg', gender: 'ស្រី', email: 'keo.sreypich@example.com', phone: '012000002' },
    { id: 't3', name: 'លោកគ្រូ វ៉ាន សុវណ្ណ', subject: 'ភូមិសាស្ត្រ', experience: '12 ឆ្នាំ', imageUrl: 'https://randomuser.me/api/portraits/men/75.jpg', gender: 'ប្រុស', email: 'van.sovann@example.com', phone: '012000003' },
];

export const INITIAL_STUDENT_ACHIEVEMENTS: StudentAchievement[] = [
  // Monthly
  { id: 'm1', studentId: 's1', studentName: 'សុខ សំណាង', class: 'ថ្នាក់ទី១២ ក', score: '៩៥%', subjects: ['គណិតវិទ្យា', 'រូបវិទ្យា'], imageUrl: 'https://randomuser.me/api/portraits/men/32.jpg', category: AchievementCategory.Monthly, period: 'ខែមិថុនា ២០២៣' },
  { id: 'm2', studentId: 's2', studentName: 'វ៉ាន ស្រីហេង', class: 'ថ្នាក់ទី១១ ខ', score: '៩៣%', subjects: ['ភាសាខ្មែរ', 'ភាសាអង់គ្លេស'], imageUrl: 'https://randomuser.me/api/portraits/women/44.jpg', category: AchievementCategory.Monthly, period: 'ខែមិថុនា ២០២៣' },
  { id: 'm3', studentId: 's3', studentName: 'ចាន់ វុទ្ធី', class: 'ថ្នាក់ទី១០ គ', score: '៩២%', subjects: ['គីមីវិទ្យា', 'ជីវវិទ្យា'], imageUrl: 'https://randomuser.me/api/portraits/men/75.jpg', category: AchievementCategory.Monthly, period: 'ខែមិថុនា ២០២៣' },
  // Semester
  { id: 's1_sem', studentId: 's1', studentName: 'ហេង សុខណា', class: 'ថ្នាក់ទី១២ ក', score: '៩៧%', subjects: ['គណិតវិទ្យា', 'រូបវិទ្យា', 'គីមីវិទ្យា'], imageUrl: 'https://randomuser.me/api/portraits/men/22.jpg', category: AchievementCategory.Semester, period: 'ឆមាសទី១ ឆ្នាំ២០២៣' },
  // Annual
  { id: 'a1_ann', studentId: 's1', studentName: 'គឹម សុខណា', class: 'ថ្នាក់ទី១២ ក', score: '៩៨%', subjects: ['គណិតវិទ្យា', 'រូបវិទ្យា', 'គីមីវិទ្យា', 'ភាសាអង់គ្លេស'], imageUrl: 'https://randomuser.me/api/portraits/men/11.jpg', category: AchievementCategory.Annual, period: 'ឆ្នាំ២០២២' },
];


export const ADMIN_SUB_NAV_ITEMS: {id: AdminSubTabId, label: string, icon: string}[] = [
  { id: AdminSubTabId.ManageContent, label: 'កែប្រែខ្លឹមសារ', icon: 'fas fa-edit' },
  { id: AdminSubTabId.ManageTeachers, label: 'គ្រប់គ្រងគ្រូ', icon: 'fas fa-chalkboard-teacher' },
  { id: AdminSubTabId.ManageStudents, label: 'គ្រប់គ្រងសិស្ស', icon: 'fas fa-users' },
  { id: AdminSubTabId.ManageAchievements, label: 'គ្រប់គ្រងសិស្សពូកែ', icon: 'fas fa-trophy' },
];

export const SUBJECT_COLOR_MAP: { [key: string]: string } = {
    'គណិតវិទ្យា': 'bg-blue-100 text-blue-800',
    'រូបវិទ្យា': 'bg-green-100 text-green-800',
    'ភាសាខ្មែរ': 'bg-purple-100 text-purple-800',
    'ភាសាអង់គ្លេស': 'bg-red-100 text-red-800',
    'គីមីវិទ្យា': 'bg-indigo-100 text-indigo-800',
    'ជីវវិទ្យា': 'bg-green-100 text-green-800', 
    'ប្រវត្តិវិទ្យា': 'bg-yellow-100 text-yellow-800',
    'ភូមិសាស្ត្រ': 'bg-teal-100 text-teal-800',
};

export const ACHIEVEMENT_VISUALS: { [key in AchievementCategory]: { icon: string; badgeColor: string } } = {
  [AchievementCategory.Monthly]: { icon: 'fas fa-crown', badgeColor: 'bg-yellow-400' },
  [AchievementCategory.Semester]: { icon: 'fas fa-medal', badgeColor: 'bg-blue-500' },
  [AchievementCategory.Annual]: { icon: 'fas fa-award', badgeColor: 'bg-purple-500' },
};


export const SECRET_ADMIN_CODE = "ADMIN_CREATE_2024";
