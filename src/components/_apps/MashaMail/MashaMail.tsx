/*
 * MashaMail.tsx
 * author: evan kirkiles
 * created on Sun Dec 25 2022
 * 2022 the nobot space,
 */

import { App, AppProps } from "..";
import AsyncSelect from "react-select/async";
import { useQuery } from "react-query";
import { useUser } from "@supabase/auth-helpers-react";
import icon from "../../../assets/GIFS/mail.png";
import logo from "../../../assets/ICONS/mpop.png";
import s from "./MashaMail.module.scss";
import { listReceivedMail, mailKeys } from "../../../api/models/mail";
import { Permission } from "../../../util/permissions";
import React, { useState } from "react";
import selectClassNames from "../../../util/selectClassNames";
import NewMashaMail from "./modals/NewMashaMail";
import rectifyDateFormat from "../../../util/rectifyDateFormat";
import { Mail, MailWithSender, Profile } from "../../../api/types";
import useProfile from "../../../hooks/useProfile";

interface MashaMailWindows {
  key: string;
  defaultMail?: Partial<Mail>;
  defaultRecipients?: Profile[];
}

const MashaMailApp: React.FC<AppProps> = () => {
  const { profile } = useProfile();
  const [mashaMails, setMashaMails] = useState<MashaMailWindows[]>([]);
  const [selectedMail, setSelectedMail] = useState<MailWithSender | null>(null);

  const { data } = useQuery(
    mailKeys.list("received"),
    () => listReceivedMail(profile!.id),
    {
      enabled: !!profile,
    }
  );

  return (
    <div className={s.container}>
      <div className={s.inbox_column}>
        <div className={s.inbox_header}>INBOX (0)</div>
        <div className={s.inbox_message_container}>
          <div className={s.inbox_message_container_sized}>
            {data?.map((mail) => (
              <div
                className={[
                  s.inbox_message,
                  selectedMail && mail.id === selectedMail.id ? "selected" : "",
                ].join(" ")}
                key={mail.id}
                onClick={() => setSelectedMail(mail)}
              >
                <div className={s.mail_mini_date}>
                  {new Date(rectifyDateFormat(mail.created_at)).toDateString()}
                </div>
                <div className={s.mail_mini_subject}>{mail.subject}</div>
                <div className={s.mail_mini_contents}>{mail.contents}</div>
                <div className={s.mail_mini_from}>
                  from {mail.sender.name || mail.sender.username}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div
          className={s.compose_new_button}
          onClick={() => {
            setMashaMails([
              ...mashaMails,
              {
                key: (Math.random() + 1).toString(36).substring(2, 7),
              },
            ]);
          }}
        >
          COMPOSE
          <br />
          NEW
        </div>
      </div>
      <div className={s.message_container}>
        {selectedMail ? (
          <>
            <div className={s.message_from_line}>
              From:
              <AsyncSelect
                className={s.select_container}
                isMulti
                isDisabled={true}
                getOptionLabel={(option: Profile) =>
                  option.name || option.username
                }
                getOptionValue={(option: Profile) => option.id}
                placeholder={""}
                value={[selectedMail.sender]}
                classNames={selectClassNames}
              />
            </div>
            <div className={s.message_from_line}>
              To:
              <AsyncSelect
                className={s.select_container}
                isMulti
                isDisabled={true}
                getOptionLabel={(option: Profile) =>
                  option.name || option.username
                }
                getOptionValue={(option: Profile) => option.id}
                placeholder={""}
                value={[profile!]}
                classNames={selectClassNames}
              />
            </div>
            <div className={s.message_subject}>{selectedMail.subject}</div>
            <textarea
              className={s.masha_mail_text_area}
              placeholder="Write your message..."
              value={selectedMail.contents || ""}
              readOnly={true}
              spellCheck={false}
            ></textarea>
            <div
              className={s.reply_button}
              onClick={() => {
                setMashaMails([
                  ...mashaMails,
                  {
                    key: (Math.random() + 1).toString(36).substring(2, 7),
                    defaultMail: {
                      subject: `RE: ${selectedMail.subject}`,
                      previous: selectedMail.id
                    },
                    defaultRecipients: [selectedMail.sender]
                  },
                ]);
              }}
            >
              REPLY
            </div>
          </>
        ) : (
          <div className={s.no_message_container}>
            <img src={logo} className={s.mpop_logo} alt="mpop logo" />
            Select a piece of mail
            <br />
            to view it here!
          </div>
        )}
      </div>
      {mashaMails.map(({ key, defaultMail, defaultRecipients }) => (
        <NewMashaMail
          key={key}
          defaultMail={defaultMail}
          defaultRecipients={defaultRecipients}
          onClose={() => {
            const index = mashaMails.findIndex(
              ({ key: newKey }) => key === newKey
            );
            mashaMails.splice(index, 1);
            setMashaMails([...mashaMails]);
          }}
        />
      ))}
    </div>
  );
};

export default {
  icon: icon,
  title: "Masha Mail",
  name: "MashaMail",
  // popuppable: true,
  component: React.memo(MashaMailApp),
  permissions: Permission.OP,
} as App;
