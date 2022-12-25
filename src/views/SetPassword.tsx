/*
 * SetPassword.tsx
 * author: evan kirkiles
 * created on Sun Dec 25 2022
 * 2022 the nobot space,
 */

import { FormEventHandler, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Window from "../components/Window/Window";
import s from "../components/_apps/Login/Login.module.scss";
import logo from "../assets/ICONS/mpop.png";
import supabase from "../api/supabase";

export default function SetPasswordView() {
  const navigate = useNavigate();
  const password1Ref = useRef<HTMLInputElement>(null);
  const password2Ref = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit: FormEventHandler =async (e) => {
    e.preventDefault();
    if (!password1Ref.current || !password2Ref.current) return;
    if (password1Ref.current.value !== password2Ref.current.value) {
      setError("Passwords must match!");
    }
    const { error} = await supabase.auth.updateUser({
      password: password1Ref.current.value
    });
    if (error) {
      setError(error.message);
    } else {
      setError(null);
      navigate("/");
    }
  };

  return (
    <Layout>
      <Window title="Set Password">
        <form className={s.container} onSubmit={handleSubmit}>
          <img className={s.mpop_logo} src={logo} alt="MariapopOS logo" />
          Welcome to Mariapop-OS v4.3!
          <br />
          Please set your password {"<3"}.
          <div className={s.horizontal_rule}></div>
          <label className={s.input_label} htmlFor="password1">
            Password
          </label>
          <input
            id="password1"
            type="password"
            className={s.input_field}
            ref={password1Ref}
            placeholder="Password"
            required
          />
          <label className={s.input_label} htmlFor="password2">
            Confirm password
          </label>
          <input
            id="password2"
            type="password"
            className={s.input_field}
            ref={password2Ref}
            placeholder="Confirm password"
            required
          />
          <button className={s.submit_button} type="submit">
            SUBMIT
          </button>
          <div className={s.error_message}>{error}</div>
        </form>
      </Window>
    </Layout>
  );
}
