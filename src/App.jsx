import { Route, Routes } from 'react-router-dom';
import Welcome from './pages/Welcome.jsx';
import Dashboard from './pages/Dashboard.jsx';
import StoryPayaso from './pages/StoryPayaso.jsx';
import StoryAcacia from './pages/StoryAcacia.jsx';
import EvaluationHome from './pages/EvaluationHome.jsx';
import LevelSelection from './pages/LevelSelection.jsx';
import Quiz from './pages/Quiz.jsx';
import Result from './pages/Result.jsx';
import Grades from './pages/Grades.jsx';
import Profile from './pages/Profile.jsx';
import { StudentProvider } from './context/StudentContext.jsx';

export default function App() {
  return (
    <StudentProvider>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/story/payaso" element={<StoryPayaso />} />
        <Route path="/story/acacia" element={<StoryAcacia />} />
        <Route path="/evaluations" element={<EvaluationHome />} />
        <Route path="/evaluation/:bookId" element={<LevelSelection />} />
        <Route path="/quiz/:bookId/:level" element={<Quiz />} />
        <Route path="/result" element={<Result />} />
        <Route path="/grades" element={<Grades />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </StudentProvider>
  );
}
