import { Route, Routes, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react';
//
import './App.css'
//
import Forum from './views/Forum/Forum';
import ForumDetail from './components/ForumDetail/ForumDetail';
import QuestionCreate from './components/question/QuestionCreate';
import Header from './components/Header/Header';
import Home from './views/HomeView/Home';
import PageHeader from './components/PageHeader/PageHeader';

function App() {
  const location = useLocation()

  //Manejo de Header segun el scroll:
  const [ isScrolled, setIsScrolled ] = useState(false);

  const root = document.querySelector('#root');

  function scrollHandler () {
    if (root.scrollTop  >= 100 || root.scrollY >= 100) setIsScrolled(true);
    else setIsScrolled(false);
  
  }
  
  useEffect(() => {
    root.addEventListener('scroll', scrollHandler)

    return () => {
      root.removeEventListener('scroll', scrollHandler)
    }
  })

 
  return (
    <div className='App'>
     
      <Header isScrolled={isScrolled}/>
      <PageHeader />

      <Routes>

        <Route path='/' element={<Home/>} />

        <Route path='/foro/create' element={<QuestionCreate/>}/>
        <Route path='/foro' element={<Forum/>}/>
        <Route path='/foro/:id' element={<ForumDetail/>}/>  
      </Routes>
    </div>
  )
}

export default App
