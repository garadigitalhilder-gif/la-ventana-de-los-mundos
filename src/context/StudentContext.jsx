import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getEarnedBadges } from '../data/badges.js';

const STORAGE_KEY = 'laVentanaDeLosMundos.student';

const initialStudentState = {
  studentName: '',
  grades: [],
  progress: {},
  completedLevels: [],
  badges: [],
};

const StudentContext = createContext(null);

function loadStudentState() {
  try {
    const savedState = localStorage.getItem(STORAGE_KEY);
    return savedState ? { ...initialStudentState, ...JSON.parse(savedState) } : initialStudentState;
  } catch {
    return initialStudentState;
  }
}

export function StudentProvider({ children }) {
  const [student, setStudent] = useState(loadStudentState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(student));
  }, [student]);

  function setStudentName(studentName) {
    setStudent((currentStudent) => ({
      ...currentStudent,
      studentName,
    }));
  }

  function saveGrade(grade) {
    setStudent((currentStudent) => ({
      ...currentStudent,
      grades: currentStudent.grades.some((savedGrade) => savedGrade.id === grade.id)
        ? currentStudent.grades
        : [...currentStudent.grades, grade],
    }));
  }

  function completeLevel(level) {
    setStudent((currentStudent) => {
      const completedLevels = currentStudent.completedLevels.includes(level)
        ? currentStudent.completedLevels
        : [...currentStudent.completedLevels, level];
      const earnedBadges = getEarnedBadges(completedLevels);
      const badges = [...new Set([...currentStudent.badges, ...earnedBadges])];

      return {
        ...currentStudent,
        completedLevels,
        badges,
        progress: {
          ...currentStudent.progress,
          [level]: true,
        },
      };
    });
  }

  function unlockBadge(badge) {
    setStudent((currentStudent) => ({
      ...currentStudent,
      badges: currentStudent.badges.includes(badge)
        ? currentStudent.badges
        : [...currentStudent.badges, badge],
    }));
  }

  function resetProgress() {
    setStudent(initialStudentState);
  }

  const value = useMemo(
    () => ({
      ...student,
      setStudentName,
      saveGrade,
      completeLevel,
      unlockBadge,
      resetProgress,
    }),
    [student]
  );

  return <StudentContext.Provider value={value}>{children}</StudentContext.Provider>;
}

export function useStudent() {
  const context = useContext(StudentContext);

  if (!context) {
    throw new Error('useStudent must be used within a StudentProvider');
  }

  return context;
}
