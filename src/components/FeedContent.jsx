import { useSelector } from "react-redux";
import Image from "./helper/Image";
import styles from "./FeedContent.module.css";
import Loading from "./helper/Loading";

const FeedContent = () => {
  const { data, loading } = useSelector((state) => state.photos);

  return (
    <>
      <ul>
        {data?.map((photo) => (
          <li key={photo.id} className={`anime-left ${styles.item}`}>
            <Image src={photo.src} alt={photo.title} width="60" height="60" />
            <span className={styles.nome}>{photo.title}</span>
            <span className={styles.acessos}>{photo.acessos}</span>
          </li>
        ))}
      </ul>
      {loading && <Loading />}
    </>
  );
};

export default FeedContent;
