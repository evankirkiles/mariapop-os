/*
 * Login.tsx
 * author: evan kirkiles
 * created on Fri Dec 23 2022
 * 2022 the nobot space,
 */
import s from "./Login.module.scss";

export default function Login() {
  return (
    <div className={s.container}>
      <div className={s.terminal}>
        <div>{"Welcome to Mariapop OS 4.3!"}</div>
        <div>{"> "}Type your username here...</div>
      </div>
    </div>
  );
}
