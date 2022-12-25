/*
 * MashaMail.tsx
 * author: evan kirkiles
 * created on Sun Dec 25 2022
 * 2022 the nobot space,
 */

import { App, AppProps } from "..";
import { useQuery } from "react-query";
import { useUser } from "@supabase/auth-helpers-react";
import icon from "../../../assets/GIFS/mail.png";
import s from "./MashaMail.module.scss";
import { listReceivedMail, mailKeys } from "../../../api/models/mail";
import { Permission } from "../../../util/permissions";
import React from "react";

const MashMailApp: React.FC<AppProps> = () => {
  const user = useUser();
  const mailQuery = useQuery(
    mailKeys.list(undefined),
    () => listReceivedMail(user!.id),
    {
      enabled: !!user,
    }
  );

  return (
    <div className={s.container}>
      <div className={s.inbox_column}>
        <div className={s.inbox_header}>INBOX (0)</div>
      </div>
      Masha Mail
    </div>
  );
};

export default {
  icon: icon,
  title: "Masha Mail",
  name: "MashaMail",
  // popuppable: true,
  component: React.memo(MashMailApp),
  permissions: Permission.OP,
} as App;
