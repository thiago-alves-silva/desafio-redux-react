import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchPhotos } from "../store/photos";
import Image from "./helper/Image";
import styles from "./FeedContent.module.css";
import Loading from "./helper/Loading";

const FeedContent = ({ page }) => {
  const [photos, setPhotos] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetch = async () => {
      const { payload } = await dispatch(fetchPhotos(page));
      setPhotos(payload);
    };
    fetch();
  }, [dispatch, page]);

  return (
    <>
      {photos?.map((photo) => (
        <li key={photo.id} className={styles.item}>
          <Image src={photo.src} alt={photo.title} width="60" height="60" />
          <span className={styles.nome}>{photo.title}</span>
          <span className={styles.acessos}>{photo.acessos}</span>
        </li>
      )) || <Loading />}
    </>
  );
};

export default FeedContent;
