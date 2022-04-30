import FeedContent from "./FeedContent";
import styles from "./Feed.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchPhotos } from "../store/photos";
import Loading from "./helper/Loading";
import { useEffect } from "react";

const Feed = () => {
  const { user } = useSelector((state) => state.login);
  const { page, loading, hasContent } = useSelector((state) => state.photos);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(fetchPhotos(page + 1));
  };

  useEffect(() => {
    dispatch(fetchPhotos(1));
  }, [dispatch]);

  return (
    <section>
      {user.data ? (
        <>
          <FeedContent />
          {hasContent && !loading && (
            <button className={styles.loadMore} onClick={handleClick}></button>
          )}
        </>
      ) : (
        <Loading />
      )}
    </section>
  );
};

export default Feed;
