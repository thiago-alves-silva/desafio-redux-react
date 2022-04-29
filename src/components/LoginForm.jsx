import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { login } from "../store/login";
import styles from "./LoginForm.module.css";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { token, user } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await dispatch(login({ username, password }));
    if (token.data) {
      navigate("/conta");
    }
  };

  useEffect(() => {
    setLoading(token.loading || user.loading);
  }, [token.loading, user.loading]);

  useEffect(() => {
    setError(token.error || user.error);
  }, [token.error, user.error]);

  if (token.data) return <Navigate to="/conta" />;
  return (
    <section>
      <form onSubmit={handleSubmit}>
        <label className={styles.label}>
          Usuário
          <input
            type="text"
            className={styles.input}
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            autoComplete="username"
            disabled={loading}
          />
        </label>
        <label className={styles.label}>
          Senha
          <input
            type="password"
            className={styles.input}
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            autoComplete="current-password"
            disabled={loading}
          />
        </label>
        <button className={styles.button} disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </button>
        <p
          className={styles.error}
          dangerouslySetInnerHTML={{ __html: error }}
        ></p>
      </form>
    </section>
  );
};

export default LoginForm;
