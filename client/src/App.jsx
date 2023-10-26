import { NavLink, Route, Routes, useLocation } from 'react-router-dom'
import './App.css'

import QuestionDetail from './components/QuestionsDetail/QuestionDetail'
import Forum from './components/Forum/Forum'

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
        {/* <Route path='/foro/create' element={<Que/>}/> */}
        <Route path='/foro' element={<Forum/>}/>
        <Route path='/foro/:id' element={<QuestionDetail/>}/>  
      </Routes>
    </div>
  )
}

export default App
