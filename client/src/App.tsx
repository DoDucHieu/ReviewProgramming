import { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import Layer from './components/Layer'
import LoginPage from './pages/LoginPage'
import ClassPage from './pages/ClassPage'
import AdminPage from './pages/AdminPage'
import HomePage from './pages/HomePage'
import TeacherPage from './pages/AdminPage/TeacherPage'
import StudentPage from './pages/AdminPage/StudentPage'
import ClassManagePage from './pages/AdminPage/ClassPage'
import SubjectPage from './pages/AdminPage/SubjectPage'
import SpecialtyPage from './pages/AdminPage/SpecialtyPage'
import { AuthContext } from './contexts/authContext/AuthContext'
import DetailClass from './components/ClassList/DetailClass/DetailClass.jsx'
import Schedule from './components/Schedule'
import RegisterCourse from './components/RegisterCourse/RegisterCourse.jsx'
import ProfilePage from './pages/ProfilePage'
import NewsPage from './pages/NewsPage'
import VideosPage from './pages/VideosPage'
import DetailVideoPage from './pages/DetailVideoPage'
import DetailNewPage from './pages/DetailNewPage'
import SignUpPage from './pages/SignUpPage'
import AddNew from './pages/AddNew'
import ApprovePage from './pages/ApprovePage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  const { user } = useContext(AuthContext)
  return (
    <Routes>
      {/* public routes */}
      <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" replace />} />
      <Route path="/signup" element={!user ? <SignUpPage /> : <Navigate to="/" replace />} />

      {/* private routes */}
      <Route
        path="/"
        element={
          user ? (
            <Layer>
              <HomePage />
            </Layer>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      <Route
        path="classes"
        element={
          user ? (
            <Layer>
              <ClassPage allClass={true} />
            </Layer>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      <Route
        path="my-classes"
        element={
          user ? (
            <Layer>
              <ClassPage />
            </Layer>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      <Route
        path="news"
        element={
          user ? (
            <Layer>
              <NewsPage />
            </Layer>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      <Route
        path="add-new"
        element={
          user ? (
            <Layer>
              <AddNew />
            </Layer>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      <Route
        path="videos"
        element={
          user ? (
            <Layer>
              <VideosPage />
            </Layer>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      <Route
        path="news/:id"
        element={
          user ? (
            <Layer>
              <DetailNewPage />
            </Layer>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      <Route
        path="videos/:id"
        element={
          user ? (
            <Layer>
              <DetailVideoPage />
            </Layer>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      <Route
        path="approve"
        element={
          user ? (
            <Layer>
              <ApprovePage />
            </Layer>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      <Route
        path="classes/detail-class-:id"
        element={
          user ? (
            <Layer>
              <DetailClass />
            </Layer>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      <Route
        path="schedule/detail-class-:id"
        element={
          user ? (
            <Layer>
              <DetailClass />
            </Layer>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {user?.role_id !== 'r1' && (
        <Route
          path="schedule"
          element={
            user ? (
              <Layer>
                <Schedule />
              </Layer>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      )}

      <Route
        path="register-course"
        element={
          user && user?.role_id === 'r3' ? (
            <Layer>
              <RegisterCourse />
            </Layer>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="register-course"
        element={
          user && user?.role_id === 'r3' ? (
            <Layer>
              <RegisterCourse />
            </Layer>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* <Route
        path="profile"
        element={
          user ? (
            <Layer>
              <ProfilePage />
            </Layer>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      /> */}

      <Route
        path="user-management"
        element={
          user && user?.role_id === 'r1' ? (
            <Layer>
              <AdminPage />
            </Layer>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      >
        <Route path="teacher" element={<TeacherPage />} />
        <Route path="student" element={<StudentPage />} />
        <Route path="classes" element={<ClassManagePage />} />
        <Route path="subjects" element={<SubjectPage />} />
        <Route path="specialties" element={<SpecialtyPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
