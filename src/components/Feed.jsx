import React, { useState } from "react";
import FeedContent from "./FeedContent";
import styles from "./Feed.module.css";
import { useSelector } from "react-redux";
import Loading from "./helper/Loading";

const Feed = () => {
  const [page, setPage] = useState([1]);
  const { user } = useSelector((state) => state.login);

  const handleClick = () => {
    setPage((page) => [...page, page.length + 1]);
  };

  return (
    <section>
      {user.data ? (
        <>
          <ul>
            {page.map((page) => (
              <FeedContent key={page} page={page} />
            ))}
          </ul>
          <button className={styles.loadMore} onClick={handleClick}></button>
        </>
      ) : (
        <Loading />
      )}
    </section>
  );
};

export default Feed;
