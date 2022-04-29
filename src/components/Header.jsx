import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/login";
import styles from "./Header.module.css";

const Header = () => {
  const { user, token } = useSelector((state) => state.login);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(logout());
  };

  return (
    <header className={`container ${styles.header}`}>
      <h1>Mini Dogs</h1>
      <button
        disabled={!user.data}
        className={`${styles.logout} ${
          token.loading || user.loading ? styles.loading : ""
        } ${user.data ? styles.logged : ""}`}
        onClick={handleClick}
      ></button>
    </header>
  );
};

export default Header;
