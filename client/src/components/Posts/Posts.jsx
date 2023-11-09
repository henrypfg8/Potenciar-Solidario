import Styles from "./posts.module.css";
//
import Post from "../Post/Post";
//
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
//
import { Oval } from "react-loader-spinner";

export default function Posts() {
  const loading = useSelector((state) => state.posts.loading);
  const posts = useSelector((state) => state.posts.posts);

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
  

  /////////////////////////////////////

  return (
    <div className={Styles.Posts}>
      <h1 style={{ marginTop: "10px" }}>Publicaciones de la cartelera</h1>

      <div className={Styles.Cards}>
        {!loading ? (
          posts?.reverse().map((post) => (
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
          <Oval
            className={Styles.Loader}
            height={80}
            width={80}
            color="#005692"
            wrapperStyle={{margin: 'auto auto'}}
            wrapperClass=""
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#a4d4ff"
            strokeWidth={3}
            strokeWidthSecondary={3}
            
          />
        )}
      </div>
    </div>
  );
}
