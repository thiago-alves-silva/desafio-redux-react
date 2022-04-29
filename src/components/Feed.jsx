import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPhotos } from "../store/photos";
import Image from "./helper/Image";
import styles from "./Feed.module.css";

const Feed = () => {
  const [page, setPage] = useState(1);
  const state = useSelector((state) => state.photos);
  const dispatch = useDispatch();

  const handleClick = () => {
    setPage((page) => page + 1);
  };

  useEffect(() => {
    dispatch(fetchPhotos(page));
  }, [dispatch, page]);

  return (
    <section>
      {state.data.length ? (
        <>
          <ul>
            {state.data.map((photo) => (
              <li key={photo.id} className={styles.item}>
                <Image
                  src={photo.src}
                  alt={photo.title}
                  width="60"
                  height="60"
                />
                <span className={styles.nome}>{photo.title}</span>
                <span className={styles.acessos}>{photo.acessos}</span>
              </li>
            ))}
          </ul>
          <button onClick={handleClick}>Carregar mais</button>
        </>
      ) : (
        <p>Carregando...</p>
      )}
    </section>
  );
};

export default Feed;
