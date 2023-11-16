import Styles from "./post.module.css";
//
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
//
import CalendarIcon from "../../assets/CalendarIcon";
import { Like, LikeActive, Comment } from "../../assets/SocialIcons/";
import { PostOptions_Icon } from "../../assets/PostOptions_Icons";
import Post_Options from "./Post_Options/Post_Options";
import { like, disLike } from "../../Redux/actions/postsActions";

import { configureHeaders } from "../../Redux/auth/configureHeaders ";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

//////////////////////////////

const Post = (props) => {
  const config = configureHeaders();
  const [refreshData, setRefreshData] = useState(false);
  //
  const dispatch = useDispatch();
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(props.likes);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  const start_date = props?.startDate?.split("-");

  const token = jwtDecode(localStorage.getItem("token"));

  const likeHandler = (e) => {
    e.preventDefault();

    if (!isLiked) {
      setIsLiked(true);
      const newLikes = likes + 1;
      setLikes(newLikes);
      dispatch(like(props.id));
    } else {
      setIsLiked(false);
      const newLikes = likes - 1;
      setLikes(newLikes);

      dispatch(disLike(props.id));
    }
  };

  const postOptionsHandler = (e) => {
    e.preventDefault();
    setIsOptionsOpen(!isOptionsOpen);
  };

  useEffect(() => {
    if (props?.Likes?.some((like) => like.userId === token.id)) {
      setIsLiked(true);
    }
  }, []);


  /////////////////////////////////////////////////

  return (
    <Link to={`/detalle/${props?.id}`} className={Styles.Post}>
      <h1 className={Styles.Post__title}>{props?.title}</h1>

      

      <div className={Styles.Post__OrganizationAndCategory}>
        <div className={Styles.OrganizationContainer}>
          <h2 className={Styles.organization}> Organización: </h2>
          <h2 className={Styles.organizationName}>{props?.organization}</h2>
        </div>
        <p className={Styles.Post__category}>{props?.category}</p>
        
      </div>

      <div className={Styles.Post__description}>
        {props?.image ? (
          <>
            <img className={Styles.imageBlur} src={props?.image} alt="imagen" />
            <img className={Styles.image} src={props?.image} alt="imagen" />
          </>
        ) : (
          <p>{props?.description}</p>
        )}
      </div>

      <div className={Styles.Post__BottomBar}>
        <CalendarIcon className={Styles.BottomBar__calendarIcon} />

        <p className={Styles.BottomBar__startDate}>{props?.startDate}</p>

        <div className={Styles.BottomBar__SocialIcons}>
          <div
            className={Styles.SocialIcons__likeContainer}
            onClick={likeHandler}
          >
            {isLiked ? (
              <LikeActive className={Styles.likeIcon} />
            ) : (
              <Like className={Styles.likeIcon} />
            )}

            <p className={Styles.likeNumber}>{likes}</p>
          </div>

          <div className={Styles.SocialIcons__commentContainer}>
            <Comment className={Styles.commentIcon} />

            <p className={Styles.likeNumber}> {props?.PublicationComments.length} </p>
          </div>
        </div>

        {props?.userID === token.id ? (
          <div
            className={Styles.BottomBar__OptionsContainer}
            onClick={postOptionsHandler}
          >
            <PostOptions_Icon className={Styles.BottomBar__optionsIcon} />
            {isOptionsOpen && (
              <Post_Options id={props.id} setRefreshData={setRefreshData} />
            )}
          </div>
        ) : null}
      </div>
    </Link>
  );
};

export default Post;
