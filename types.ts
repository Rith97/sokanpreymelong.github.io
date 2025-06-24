
export enum TabId {
  Home = 'home',
  Achievements = 'achievements',
  History = 'history',
  Teachers = 'teachers',
  Results = 'results',
  Announcements = 'announcements',
  Contact = 'contact',
  Admin = 'admin',
}

export enum AchievementCategory {
  Monthly = 'monthly',
  Semester = 'semester',
  Annual = 'annual',
}

export interface StudentAchievement {
  id: string;
  studentId: string; // Link to the student
  studentName: string; // Denormalized for easy display, or fetch from student list
  class: string; // Denormalized or fetched
  score: string;
  subjects: string[];
  imageUrl: string | null; // Can be data URL
  category: AchievementCategory;
  period: string; 
  icon?: string; 
  badgeColor?: string; 
}

export interface Teacher {
  id: string;
  name: string;
  subject: string;
  experience: string;
  imageUrl: string | null; // Can be data URL
  gender: 'ប្រុស' | 'ស្រី';
  email?: string;
  phone?: string;
}

export interface Student {
  id: string;
  name: string;
  class: string;
  gender: 'ប្រុស' | 'ស្រី';
  phone?: string;
}


export enum AdminSubTabId {
  ManageContent = 'manage-content',
  ManageTeachers = 'manage-teachers',
  ManageStudents = 'manage-students',
  ManageAchievements = 'manage-achievements',
}

export interface EditableContentItem {
  id: string;
  currentText: string;
}

export interface ToastMessage {
  id: number;
  type: 'success' | 'error' | 'info';
  message: string;
  icon: string;
}

export interface NavItem {
  id: TabId;
  label: string;
  icon: string;
  adminOnly?: boolean;
  className?: string;
}