import Styles from "./posts.module.css";
//
import Post from "../Post/Post";
//
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
//
import NoPosts_Icon from "../../assets/NoPosts_Icon";
import Oval_Loader from "../../assets/Oval_Loader";

export default function Posts() {
  const loading = useSelector((state) => state.posts.loading);
  const posts = useSelector((state) => state.posts.posts)
  // .filter(
  //   (post) => post.status === true
  // );

  const orderBy = useSelector((state) => state.posts.orderBy);

  function transformarFecha(inputFecha) {
    // Parsea la fecha en el formato "yyyy-MM-dd"
    const fechaParseada = new Date(inputFecha);

    // Obtiene los componentes de la fecha
    const dia = fechaParseada.getDate() + 1;
    const mes = fechaParseada.getMonth() + 1; // Los meses son indexados desde 0
    const año = fechaParseada.getFullYear();

    // Formatea la fecha en el nuevo formato "dd-MM-yyyy"
    const fechaFormateada = `${dia < 10 ? "0" : ""}${dia}-${
      mes < 10 ? "0" : ""
    }${mes}-${año}`;

    return fechaFormateada;
  }

  let orderedPosts = [...posts];

  if (orderBy.ordering === "creationDate") {
    orderedPosts.sort((a, b) =>
      orderBy.direction === "asc"
        ? a.creationDate > b.creationDate
          ? -1
          : 1
        : a.creationDate > b.creationDate
        ? 1
        : -1
    );
  } else if (orderBy.ordering === "title") {
    orderedPosts.sort((a, b) =>
      orderBy.direction === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title)
    );
  } else if (orderBy.ordering === "date") {
    orderedPosts.sort((a, b) =>
      orderBy.direction === "asc"
        ? a.startDate - b.startDate
        : b.startDate - a.startDate
    );
  } else if (orderBy.ordering === "popularity") {
    orderedPosts.sort((a, b) =>
      orderBy.direction === "asc" ? b.likes - a.likes : a.likes - b.likes
    );
  }

  /////////////////////////////////////

  return (
    <div className={Styles.Posts}>
      <h1 style={{ marginTop: "10px" }}>Publicaciones de la cartelera</h1>

      {(posts?.length === 0 && !loading) || (!posts && !loading) ? (
        <div className={Styles.Posts__NoPosts}>
          <NoPosts_Icon className={Styles.NoPosts__icon} />
          <h3 className={Styles.NoPosts__Text}>
            No se encontraron publicaciones.
          </h3>
        </div>
      ) : (
        <div className={Styles.Cards}>
          {!loading && orderedPosts.length > 0 ? (
            orderedPosts.map((post) => (
              <Post
                key={post.id}
                id={post?.id}
                title={post?.title}
                organization={post?.organization}
                category={post?.category}
                description={post?.description}
                image={post?.image}
                startDate={transformarFecha(post?.startDate)}
                userID={post?.userID}
                likes={post?.likes}
                Likes={post?.Likes}
              />
            ))
          ) : (
            <Oval_Loader/>
          )}
        </div>
      )}
    </div>
  );
}
