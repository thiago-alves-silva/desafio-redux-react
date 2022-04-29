import React, { useState } from "react";
import FeedContent from "./FeedContent";
import styles from "./Feed.module.css";

const Feed = () => {
  const [page, setPage] = useState([1]);

  const handleClick = () => {
    setPage((page) => [...page, page.length + 1]);
  };

  return (
    <section>
      <ul>
        {page.map((page) => (
          <FeedContent key={page} page={page} />
        ))}
      </ul>
      <button className={styles.loadMore} onClick={handleClick}></button>
    </section>
  );
};

export default Feed;
