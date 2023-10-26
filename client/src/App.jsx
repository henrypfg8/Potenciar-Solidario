import { NavLink, Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import Forum from './Forum/Forum'
import ForumDetail from './ForumDetail/ForumDetail'
import QuestionCreate from './question/QuestionCreate'

function App() {
  const location = useLocation()

 
  return (
    <div>
      {
        location.pathname === '/' && <NavLink to='/foro'>
        <button>Foro</button>
        </NavLink>
      }
      
      <Routes>
        <Route path='/foro/create' element={<QuestionCreate/>}/>
        <Route path='/foro' element={<Forum/>}/>
        <Route path='/foro/:id' element={<ForumDetail/>}/>  
      </Routes>
    </div>
  )
}

export default App
