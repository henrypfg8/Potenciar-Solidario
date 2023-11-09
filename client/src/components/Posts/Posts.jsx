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
              startDate={post?.startDate}
              userID={post?.userID}
              likes={post?.likes}
              userLikes={post?.Likes}
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
