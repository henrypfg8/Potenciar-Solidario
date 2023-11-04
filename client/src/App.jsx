import { Route, Routes, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "./Redux/actions/postsActions";
import { getCategories } from "./Redux/actions/categoriesActions";
import { getOngs } from "./Redux/actions/ongsActions";
//
import "./App.css";
//
import Forum from "./components/Forum/Forum";
import Header from "./components/Header/Header";
import Home from "./views/HomeView/Home";
import PageHeader from "./components/PageHeader/PageHeader";
import ContainerForm from "./views/FormContainer/ContainerForm";
import QuestionDetail from "./components/QuestionsDetail/QuestionDetail";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import SearchBar from "./components/SearchBar/SearchBar";
import PostDetailView from "./views/PostDetailView/PostDetailView";
//
import Admin from "./views/admin/Admin";
import ProfileView from "./views/ProfileView/ProfileView";
import DrawerProfile from "./components/Profile/DrawerProfile";
import QuestionCreateView from "./views/QuestionCreateView/QuestionCreateView";

function App() {
  // eslint-disable-next-line no-unused-vars
  const { pathname } = useLocation();
  const posts = useSelector((state) => state.posts.posts);
  const dispatch = useDispatch();
  //Manejo de Header segun el scroll:
  const [isScrolled, setIsScrolled] = useState(false);

  const root = document.querySelector("#root");

  function scrollHandler() {
    if (root.scrollTop >= 100 || root.scrollY >= 100) setIsScrolled(true);
    else setIsScrolled(false);
  }

  useEffect(() => {
    root.addEventListener("scroll", scrollHandler);

    dispatch(getPosts());
    dispatch(getOngs());
    dispatch(getCategories());

    return () => {
      root.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  return (
    <div className="App">
      <DrawerProfile /> {/* Comentar si es necesario*/}
      <Header isScrolled={isScrolled} />

      <PageHeader />

      {pathname === "/" || pathname === "/foro" ? <SearchBar /> : null}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/formulario" element={<ContainerForm />} />
        <Route path="/detalle/:id" element={<PostDetailView />} />

        <Route path="/foro" element={<Forum />} />

        <Route path="/foro/crear" element={<QuestionCreateView />} />
        <Route path="/foro/:id" element={<QuestionDetail />} />

        {/* auth */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/profile" element={<ProfileView />} />
      </Routes>
    </div>
  );
}

export default App;
