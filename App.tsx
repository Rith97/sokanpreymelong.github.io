
import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Layout/Header';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import FloatingParticles from './components/UI/FloatingParticles';
import LoginModal from './components/Modals/LoginModal';
import RegisterAdminModal from './components/Modals/RegisterAdminModal';
import HomeTab from './components/Tabs/HomeTab';
import AchievementsTab from './components/Tabs/AchievementsTab';
import TeachersTab from './components/Tabs/TeachersTab'; 
import AdminTab from './components/Tabs/AdminTab';
import HistoryTab from './components/Tabs/HistoryTab';
import ResultsTab from './components/Tabs/ResultsTab';
import AnnouncementsTab from './components/Tabs/AnnouncementsTab';
import ContactTab from './components/Tabs/ContactTab';
import Toast from './components/UI/Toast';
import BackToTopButton from './components/UI/BackToTopButton';
import { TabId, ToastMessage, EditableContentItem, Teacher, Student, StudentAchievement, AchievementCategory } from './types';
import { NAV_ITEMS, SECRET_ADMIN_CODE, INITIAL_TEACHERS, INITIAL_STUDENTS, INITIAL_STUDENT_ACHIEVEMENTS, ACHIEVEMENT_VISUALS } from './constants';


const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>(TabId.Home);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  
  const [adminCredentials, setAdminCredentials] = useState({ 
    username: 'admin', 
    password_param: 'admin123' 
  });

  // Manage dynamic data
  const [teachers, setTeachers] = useState<Teacher[]>(INITIAL_TEACHERS);
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [studentAchievements, setStudentAchievements] = useState<StudentAchievement[]>(INITIAL_STUDENT_ACHIEVEMENTS.map(sa => ({
    ...sa,
    ...ACHIEVEMENT_VISUALS[sa.category]
  })));


  const [homeContent, setHomeContent] = useState({
    title: { id: 'home-title', currentText: "សូមស្វាគមន៍មកកាន់គេហទំព័រផ្លូវការ!" },
    text: { id: 'home-text', currentText: "សាលាវិទ្យាល័យសុខអានព្រៃមេលង សូមស្វាគមន៍យ៉ាងកក់ក្តៅចំពោះមាតាបិតា អ្នកអាណាព្យាបាល សិស្សានុសិស្ស និងសាធារណជនទាំងអស់ ដែលបានចំណាយពេលវេលាដ៏មានតម្លៃចូលមកកាន់គេហទំព័រផ្លូវការរបស់យើង។ យើងខ្ញុំសង្ឃឹមថាគេហទំព័រនេះនឹងក្លាយជាប្រភពព័ត៌មានដ៏មានប្រយោជន៍សម្រាប់អ្នកទាំងអស់គ្នា។" }
  });

  const [historyContent, setHistoryContent] = useState({
    title: { id: 'history-title', currentText: "សាវតាសាលា" },
    paragraph1: { id: 'history-p1', currentText: "វិទ្យាល័យសុខអានព្រៃមេលងត្រូវបានបង្កើតឡើងក្នុងគោលបំណងផ្តល់នូវការអប់រំប្រកបដោយគុណភាពខ្ពស់ដល់សិស្សានុសិស្សក្នុងតំបន់។ ចាប់តាំងពីការចាប់ផ្តើមដំបូង សាលាបានប្តេជ្ញាចិត្តក្នុងការកសាងធនធានមនុស្សប្រកបដោយសមត្ថភាព ចំណេះដឹង និងសីលធម៌ល្អ។" },
    paragraph2: { id: 'history-p2', currentText: "ក្នុងរយៈពេលជាច្រើនឆ្នាំកន្លងមកនេះ សាលាបានឆ្លងកាត់ការអភិវឌ្ឍន៍ជាច្រើន ទាំងផ្នែកហេដ្ឋារចនាសម្ព័ន្ធ និងកម្មវិធីសិក្សា ដើម្បីឆ្លើយតបទៅនឹងតម្រូវការរបស់សង្គមជាតិ និងការប្រកួតប្រជែងក្នុងយុគសម័យឌីជីថល។" }
  });

  const [resultsContent, setResultsContent] = useState({
    title: { id: 'results-title', currentText: "លទ្ធផលសិក្សា" },
    intro: { id: 'results-intro', currentText: "សាលាមានមោទនភាពចំពោះលទ្ធផលសិក្សារបស់សិស្សានុសិស្ស ដែលបានខិតខំប្រឹងប្រែងរៀនសូត្រ និងទទួលបាននិទ្ទេសល្អក្នុងការប្រឡងនានា។" },
    details: { id: 'results-details', currentText: "ជាមធ្យម សិស្សរបស់យើងទទួលបានអត្រាជាប់ ៩០% ក្នុងការប្រឡងសញ្ញាបត្រមធ្យមសិក្សាទុតិយភូមិ។ ព័ត៌មានលម្អិតបន្ថែមអំពីលទ្ធផលតាមឆ្នាំនីមួយៗនឹងត្រូវបានធ្វើបច្ចុប្បន្នភាពនៅទីនេះ។" }
  });

  const [announcementsContent, setAnnouncementsContent] = useState({
    title: { id: 'announcements-title', currentText: "សេចក្តីជូនដំណឹង" },
    announcement1Title: { id: 'announcement1-title', currentText: "ការប្រឡងឆមាសលើកទី១" },
    announcement1Body: { id: 'announcement1-body', currentText: "សាលានឹងរៀបចំការប្រឡងឆមាសលើកទី១ ចាប់ពីថ្ងៃទី ១៥ ដល់ថ្ងៃទី ២០ ខែកក្កដា ឆ្នាំ២០២៤។ សូមសិស្សានុសិស្សទាំងអស់ត្រៀមខ្លួនឲ្យបានល្អ។" },
    announcement2Title: { id: 'announcement2-title', currentText: "កម្មវិធីសម្អាតបរិស្ថានសាលា" },
    announcement2Body: { id: 'announcement2-body', currentText: "នៅថ្ងៃសៅរ៍ ទី២៥ ខែកក្កដា ឆ្នាំ២០២៤ សាលានឹងមានកម្មវិធីសម្អាតបរិស្ថានក្នុងបរិវេណសាលា។ សូមចូលរួមទាំងអស់គ្នា។" }
  });

  const [contactContent, setContactContent] = useState({
    title: { id: 'contact-title', currentText: "ព័ត៌មានទំនាក់ទំនង" },
    address: { id: 'contact-address', currentText: "អាសយដ្ឋាន៖ ភូមិព្រៃមេលង ឃុំព្រៃមេលង ស្រុកព្រៃនប់ ខេត្តព្រះសីហនុ" },
    phone: { id: 'contact-phone', currentText: "ទូរស័ព្ទ៖ ០១២ ៣៤៥ ៦៧៨ / ០៩៨ ៧៦៥ ៤៣២" },
    email: { id: 'contact-email', currentText: "អ៊ីមែល៖ info.sokanpreymelang@email.com" },
    mapEmbed: { id: 'contact-map', currentText: "ផែនទី៖ [អ្នកអាចដាក់តំណភ្ជាប់ទៅ Google Maps ឬ iframe នៅទីនេះ]" }
  });


  const addToast = useCallback((type: 'success' | 'error' | 'info', message: string, icon: string) => {
    const newToast: ToastMessage = { id: Date.now(), type, message, icon };
    setToasts(prevToasts => [newToast, ...prevToasts.slice(0, 2)]);
  }, []);
  
  const removeToast = (id: number) => {
    setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
  };

  const handleLogin = (username: string, password_param: string) => {
    if (username === adminCredentials.username && password_param === adminCredentials.password_param) {
      setIsLoggedIn(true);
      setIsAdmin(true);
      setIsLoginModalOpen(false);
      addToast('success', 'អ្នកបានចូលប្រព័ន្ធជាអ្នកគ្រប់គ្រងដោយជោគជ័យ!', 'fas fa-check-circle');
    } else {
      addToast('error', 'ឈ្មោះអ្នកប្រើប្រាស់ ឬពាក្យសម្ងាត់មិនត្រឹមត្រូវ។', 'fas fa-exclamation-circle');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setActiveTab(TabId.Home); 
    addToast('info', 'អ្នកបានចាកចេញពីប្រព័ន្ធដោយជោគជ័យ!', 'fas fa-info-circle');
  };

  const handleRegisterAdmin = (newUsername: string, newPassword_param: string, confirmPassword_param: string, adminCode: string) => {
    if (newPassword_param !== confirmPassword_param) {
      addToast('error', 'ពាក្យសម្ងាត់ និងការបញ្ជាក់ពាក្យសម្ងាត់មិនដូចគ្នាទេ។', 'fas fa-exclamation-triangle');
      return;
    }
    if (adminCode !== SECRET_ADMIN_CODE) {
      addToast('error', 'កូដចុះឈ្មោះអ្នកគ្រប់គ្រងមិនត្រឹមត្រូវទេ។', 'fas fa-shield-alt');
      return;
    }
    setAdminCredentials({ username: newUsername, password_param: newPassword_param });
    setIsRegisterModalOpen(false);
    addToast('success', `គណនីអ្នកគ្រប់គ្រង "${newUsername}" ត្រូវបានធ្វើបច្ចុប្បន្នភាព។`, 'fas fa-user-shield');
    setIsLoggedIn(true);
    setIsAdmin(true);
  };
  
  const handleSaveEditableContent = (
    section: 'home' | 'history' | 'results' | 'announcements' | 'contact', 
    contentKey: string, // This will be the key in the specific content state object e.g. "title", "paragraph1"
    newText: string
  ) => {
    switch (section) {
      case 'home':
        setHomeContent(prev => {
          const itemToUpdate = Object.values(prev).find(item => item.id === contentKey);
          if (itemToUpdate) {
            const keyToUpdate = Object.keys(prev).find(key => prev[key as keyof typeof prev].id === contentKey);
            if(keyToUpdate) {
              return { ...prev, [keyToUpdate]: { ...itemToUpdate, currentText: newText } };
            }
          }
          return prev;
        });
        break;
      case 'history':
        setHistoryContent(prev => {
          const itemToUpdate = Object.values(prev).find(item => item.id === contentKey);
           if (itemToUpdate) {
            const keyToUpdate = Object.keys(prev).find(key => prev[key as keyof typeof prev].id === contentKey);
            if(keyToUpdate) {
              return { ...prev, [keyToUpdate]: { ...itemToUpdate, currentText: newText } };
            }
          }
          return prev;
        });
        break;
      case 'results':
        setResultsContent(prev => {
          const itemToUpdate = Object.values(prev).find(item => item.id === contentKey);
           if (itemToUpdate) {
            const keyToUpdate = Object.keys(prev).find(key => prev[key as keyof typeof prev].id === contentKey);
            if(keyToUpdate) {
              return { ...prev, [keyToUpdate]: { ...itemToUpdate, currentText: newText } };
            }
          }
          return prev;
        });
        break;
      case 'announcements':
        setAnnouncementsContent(prev => {
          const itemToUpdate = Object.values(prev).find(item => item.id === contentKey);
           if (itemToUpdate) {
            const keyToUpdate = Object.keys(prev).find(key => prev[key as keyof typeof prev].id === contentKey);
            if(keyToUpdate) {
              return { ...prev, [keyToUpdate]: { ...itemToUpdate, currentText: newText } };
            }
          }
          return prev;
        });
        break;
      case 'contact':
        setContactContent(prev => {
          const itemToUpdate = Object.values(prev).find(item => item.id === contentKey);
           if (itemToUpdate) {
            const keyToUpdate = Object.keys(prev).find(key => prev[key as keyof typeof prev].id === contentKey);
            if(keyToUpdate) {
              return { ...prev, [keyToUpdate]: { ...itemToUpdate, currentText: newText } };
            }
          }
          return prev;
        });
        break;
      default:
        console.warn("Unknown section for content save:", section);
    }
    addToast('success', 'ខ្លឹមសារត្រូវបានរក្សាទុក!', 'fas fa-check-circle');
  };


  // Teacher CRUD
  const handleAddTeacher = (newTeacherData: Omit<Teacher, 'id' | 'imageUrl'> & { imageUrl: string | null }) => {
    const newTeacher: Teacher = { ...newTeacherData, id: Date.now().toString() };
    setTeachers(prev => [newTeacher, ...prev]);
    addToast('success', `គ្រូ ${newTeacher.name} ត្រូវបានបន្ថែម!`, 'fas fa-plus-circle');
  };
  const handleEditTeacher = (updatedTeacher: Teacher) => {
    setTeachers(prev => prev.map(t => t.id === updatedTeacher.id ? updatedTeacher : t));
    addToast('success', `ព័ត៌មានគ្រូ ${updatedTeacher.name} ត្រូវបានកែសម្រួល!`, 'fas fa-edit');
  };
  const handleDeleteTeacher = (teacherId: string) => {
    setTeachers(prev => prev.filter(t => t.id !== teacherId));
    addToast('info', 'គ្រូត្រូវបានលុប!', 'fas fa-trash-alt');
  };

  // Student CRUD
  const handleAddStudent = (newStudentData: Omit<Student, 'id'>) => {
    const newStudent: Student = { ...newStudentData, id: Date.now().toString() };
    setStudents(prev => [newStudent, ...prev]);
    addToast('success', `សិស្ស ${newStudent.name} ត្រូវបានបន្ថែម!`, 'fas fa-user-plus');
  };
  const handleEditStudent = (updatedStudent: Student) => {
    setStudents(prev => prev.map(s => s.id === updatedStudent.id ? updatedStudent : s));
    addToast('success', `ព័ត៌មានសិស្ស ${updatedStudent.name} ត្រូវបានកែសម្រួល!`, 'fas fa-user-edit');
    setStudentAchievements(prevAch => prevAch.map(ach => {
        if (ach.studentId === updatedStudent.id) {
            return { ...ach, studentName: updatedStudent.name, class: updatedStudent.class };
        }
        return ach;
    }));
  };
  const handleDeleteStudent = (studentId: string) => {
    setStudents(prev => prev.filter(s => s.id !== studentId));
    setStudentAchievements(prevAch => prevAch.filter(ach => ach.studentId !== studentId));
    addToast('info', 'សិស្ស និងស្នាដៃពាក់ព័ន្ធត្រូវបានលុប!', 'fas fa-user-minus');
  };

  // Student Achievement CRUD
  const handleAddAchievement = (newAchData: Omit<StudentAchievement, 'id' | 'imageUrl' | 'icon' | 'badgeColor'> & { imageUrl: string | null }) => {
    const visuals = ACHIEVEMENT_VISUALS[newAchData.category];
    const newAchievement: StudentAchievement = { 
        ...newAchData, 
        id: Date.now().toString(),
        icon: visuals.icon,
        badgeColor: visuals.badgeColor
    };
    setStudentAchievements(prev => [newAchievement, ...prev]);
    addToast('success', `ស្នាដៃសិស្ស ${newAchievement.studentName} ត្រូវបានបន្ថែម!`, 'fas fa-trophy');
  };
  const handleEditAchievement = (updatedAchievement: StudentAchievement) => {
     const visuals = ACHIEVEMENT_VISUALS[updatedAchievement.category];
     const achievementWithVisuals = {
         ...updatedAchievement,
         icon: visuals.icon,
         badgeColor: visuals.badgeColor
     };
    setStudentAchievements(prev => prev.map(ach => ach.id === achievementWithVisuals.id ? achievementWithVisuals : ach));
    addToast('success', `ស្នាដៃសិស្ស ${achievementWithVisuals.studentName} ត្រូវបានកែសម្រួល!`, 'fas fa-edit');
  };
  const handleDeleteAchievement = (achievementId: string) => {
    setStudentAchievements(prev => prev.filter(ach => ach.id !== achievementId));
    addToast('info', 'ស្នាដៃសិស្សត្រូវបានលុប!', 'fas fa-trash-alt');
  };
  
  useEffect(() => {
    const currentNavItem = NAV_ITEMS.find(item => item.id === activeTab);
    document.title = currentNavItem ? `${currentNavItem.label} - វិទ្យាល័យសុខអានព្រៃមេលង` : 'វិទ្យាល័យសុខអានព្រៃមេលង';
  }, [activeTab]);

  const renderTabContent = () => {
    switch (activeTab) {
      case TabId.Home:
        return <HomeTab isAdmin={isAdmin} homeContent={homeContent} onSaveContent={(id, text) => handleSaveEditableContent('home', id, text)} />;
      case TabId.Achievements:
        return <AchievementsTab achievements={studentAchievements} />;
      case TabId.Teachers:
        return <TeachersTab teachers={teachers} />;
      case TabId.History:
        return <HistoryTab isAdmin={isAdmin} content={historyContent} onSaveContent={(id, text) => handleSaveEditableContent('history', id, text)} />;
      case TabId.Results:
        return <ResultsTab isAdmin={isAdmin} content={resultsContent} onSaveContent={(id, text) => handleSaveEditableContent('results', id, text)} />;
      case TabId.Announcements:
        return <AnnouncementsTab isAdmin={isAdmin} content={announcementsContent} onSaveContent={(id, text) => handleSaveEditableContent('announcements', id, text)} />;
      case TabId.Contact:
        return <ContactTab isAdmin={isAdmin} content={contactContent} onSaveContent={(id, text) => handleSaveEditableContent('contact', id, text)} />;
      case TabId.Admin:
        return isAdmin ? (
            <AdminTab 
                teachers={teachers}
                onAddTeacher={handleAddTeacher}
                onEditTeacher={handleEditTeacher}
                onDeleteTeacher={handleDeleteTeacher}
                students={students}
                onAddStudent={handleAddStudent}
                onEditStudent={handleEditStudent}
                onDeleteStudent={handleDeleteStudent}
                achievements={studentAchievements}
                onAddAchievement={handleAddAchievement}
                onEditAchievement={handleEditAchievement}
                onDeleteAchievement={handleDeleteAchievement}
            />
        ) : <div className="p-8 text-center text-red-500 bg-white rounded-lg shadow-md">អ្នកមិនមានសិទ្ធិចូលប្រើផ្នែកនេះទេ។</div>;
      default:
        return <div className="p-8 text-center bg-white rounded-lg shadow-md">មាតិកាសម្រាប់ <span className="font-semibold font-battambang">{NAV_ITEMS.find(item => item.id === activeTab)?.label}</span> មិនទាន់រួចរាល់។</div>;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <FloatingParticles />
      <Header 
        onLoginClick={() => setIsLoginModalOpen(true)} 
        onLogoutClick={handleLogout}
        isLoggedIn={isLoggedIn}
      />
      <Navbar 
        activeTab={activeTab} 
        onTabChange={(tabId) => setActiveTab(tabId)}
        isAdmin={isAdmin}
        navItems={NAV_ITEMS}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow w-full">
        {renderTabContent()}
      </main>
      
      <Footer />
      
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
        onOpenRegisterModal={() => setIsRegisterModalOpen(true)}
      />
      
      <RegisterAdminModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onRegister={handleRegisterAdmin}
      />

      <div className="fixed top-4 right-4 z-[100] space-y-2">
        {toasts.map(toast => (
          <Toast key={toast.id} {...toast} onDismiss={removeToast} />
        ))}
      </div>
      <BackToTopButton />
    </div>
  );
};

export default App;
