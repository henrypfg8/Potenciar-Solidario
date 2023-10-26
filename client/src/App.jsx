import { Route, Routes, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react';
//
import './App.css'
//
import Forum from "./components/Forum/Forum"
import Header from './components/Header/Header';
import Home from './views/HomeView/Home';
import PageHeader from './components/PageHeader/PageHeader';
import ContainerForm from './views/FormContainer/ContainerForm';
import QuestionDetail from './components/QuestionsDetail/QuestionDetail';
import QuestionCreate from './components/QuestionCreate/QuestionCreate';

function App() {
  // eslint-disable-next-line no-unused-vars
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

        <Route path='/foro/crear' element={<QuestionCreate/>}/>
        <Route path='/foro' element={<Forum/>}/> 
        <Route path='/formulario' element={<ContainerForm/>}/>
        <Route path='/foro/:id' element={<QuestionDetail/>}/>  
      </Routes>
    </div>
  )
}

export default App
