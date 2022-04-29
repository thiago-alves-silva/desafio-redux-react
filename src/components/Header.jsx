import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/login";
import styles from "./Header.module.css";

const Header = () => {
  const {
    user: { loading, data },
  } = useSelector((state) => state.login);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(logout());
  };

  return (
    <header className={`container ${styles.header}`}>
      <h1>Mini Dogs</h1>
      <button disabled={!data} onClick={handleClick}>
        Logout
      </button>
    </header>
  );
};

export default Header;
