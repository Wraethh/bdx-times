import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useUser } from "../../contexts/User/UserContext"
import styles from "./Login.module.css"

export default function Login() {
  const [loginError, setLoginError] = useState<Error | null>(null)
  const { user, loginUser } = useUser();
  const navigate = useNavigate();

  const tryToLogin = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      username: { value: string };
      password: { value: string };
    };
    try {
      await loginUser?.(target.username.value, target.password.value);
    } catch (error) {
      setLoginError(error as Error)
    }
  }

  useEffect(() => {
    if (user) navigate("/")
  }, [user, navigate])

  return (
    <div className={styles.login}>
      { loginError ? (
        <p>Failed to login, your username or password is incorrect</p>
        ) : null }
      <form onSubmit={tryToLogin}>
        <label htmlFor="username">
          Username
          <input type="text" id="username" name="username" />
        </label>
        <label htmlFor="password">
          Password
          <input type="password" id="password" name="password" />
        </label>
        <button>Submit</button>
      </form>
    </div>
  )
}
