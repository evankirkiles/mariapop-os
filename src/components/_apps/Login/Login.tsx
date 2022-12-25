/*
 * Login.tsx
 * author: evan kirkiles
 * created on Sun Dec 25 2022
 * 2022 the nobot space, 
 */

import { App, AppProps } from ".."  
import icon from "../../../assets/GIFS/acc.gif";
import { Permission } from "../../../util/permissions";
import logo from "../../../assets/ICONS/mpop.png";
import s from "./Login.module.scss";
import { FormEventHandler, useRef, useState } from "react";
import supabase from "../../../api/supabase";

const LoginApp: React.FC<AppProps> = () => {
  
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const onFormSubmit: FormEventHandler = async (e) => {
    if (!emailRef.current || !passwordRef.current) return;
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({ email: emailRef.current.value, password: passwordRef.current.value })
    if (error) { setError(error.message); }
    return false;
  }

  return (
    <form className={s.container} onSubmit={onFormSubmit}>
      <img className={s.mpop_logo} src={logo} alt="MariapopOS logo" />
      Welcome to Mariapop-OS v4.3!<br />Please login to authenticate {"<3"}.
      <div className={s.horizontal_rule}></div>
      <label className={s.input_label} htmlFor="email">Email</label>
      <input id="email" type="email" className={s.input_field} ref={emailRef} placeholder="Email" required />
      <label className={s.input_label} htmlFor="password">Password</label>
      <input id="password" type="password" className={s.input_field} ref={passwordRef} placeholder="Password" required />
      <button className={s.submit_button} type="submit">SUBMIT</button>
      <div className={s.error_message}>{error}</div>
    </form>
  )
}

export default {
  icon: icon,
  title: "Login",
  name: 'login',
  notClosable: true,
  notResizable: true,
  component: LoginApp,
  permissions: Permission.BASIC
} as App;