import { Route, Routes, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getPosts,
  setLoading,
  hideLoading,
} from "./Redux/actions/postsActions";
import {
  getCategories,
  getForumCategories,
} from "./Redux/actions/categoriesActions";
import { getOngs } from "./Redux/actions/ongsActions";

import "./App.css";

import Forum from "./components/Forum/Forum";
import Header from "./components/Header/Header";
import Home from "./views/HomeView/Home";
import PageHeader from "./components/PageHeader/PageHeader";
import ContainerForm from "./views/FormContainer/ContainerForm";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import SearchBar from "./components/SearchBar/SearchBar";
import PostDetailView from "./views/PostDetailView/PostDetailView";
import Admin from "./views/admin/Admin";
import ProfileView from "./views/ProfileView/ProfileView";
import DrawerProfile from "./components/Profile/DrawerProfile";
import QuestionCreateView from "./views/QuestionCreateView/QuestionCreateView";
import QuestionView from "./views/QuestionView/QuestionView";
import QuestionDetail from "./components/QuestionsDetail/QuestionDetail";
import UserPostsView from "./views/UserPostsView/UserPostsView";
import BlurredBackground from "./components/BlurHome/BlurredBackground";

function App() {
  // eslint-disable-next-line no-unused-vars
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  //Manejo de Header segun el scroll:
  const [isScrolled, setIsScrolled] = useState(false);
  const root = document.querySelector("#root");

  function scrollHandler() {
    if (root.scrollTop >= 100 || root.scrollY >= 100) setIsScrolled(true);
    else setIsScrolled(false);
  }

  const token = localStorage.getItem("token");
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    root.addEventListener("scroll", scrollHandler);

    //si el token cambia o existe se vuelven a cargar los datos
    if (token) {
      dispatch(setLoading());
      setAuthenticated(true);
      dispatch(getPosts()).then(() => dispatch(hideLoading()));
      dispatch(getOngs());
      dispatch(getCategories());
      dispatch(getForumCategories());
    }

    return () => {
      root.removeEventListener("scroll", scrollHandler);
      setAuthenticated(false);
    };
  }, [token]);



  ///////////////////////////////////////

  return (
    <div className="App">
      <DrawerProfile />
      <Header isScrolled={isScrolled} />
      <PageHeader />
      {authenticated ? (
        <>
          {pathname === "/" || pathname === "/foro" ? <SearchBar /> : null}
          <Routes>
            {/* Rutas autenticadas */}
            <Route path="/" element={<Home />} />
            <Route path="/formulario/:id?" element={<ContainerForm />} />
            <Route path="/detalle/:id" element={<PostDetailView />} />
            <Route path="/foro" element={<Forum />} />
            <Route path="/foro/crear" element={<QuestionCreateView />} />
            <Route path="/foro/:id" element={<QuestionDetail />} />
            {/* Otras rutas autenticadas */}
            <Route path="/admin" element={<Admin />} />
            <Route path="/profile" element={<ProfileView />} />
            <Route path="/profile/posts" element={<UserPostsView />} />
          </Routes>
        </>
      ) : (
        <>
          {pathname === "/login" ? <Login /> : null}
          {pathname === "/register" ? <Register /> : null}
          {pathname !== "/register" &&
          pathname !== "/login" &&
          !authenticated ? (
            <BlurredBackground />
          ) : null}
        </>
      )}
    </div>
  );
}

export default App;
