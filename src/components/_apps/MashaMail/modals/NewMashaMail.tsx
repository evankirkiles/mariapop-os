/*
 * NewMashaMail.tsx
 * author: evan kirkiles
 * created on Mon Dec 26 2022
 * 2022 the nobot space,
 */

import AsyncSelect from "react-select/async";
import Modal from "../../../Modal/Modal";
import { debounce } from "ts-debounce";
import s from "../MashaMail.module.scss";
import { listProfiles } from "../../../../api/models/profiles";
import { FormEventHandler, useState } from "react";
import { Mail, Profile } from "../../../../api/types";
import selectClassNames from "../../../../util/selectClassNames";
import { useMutation } from "react-query";
import { createMail, createMailRecipient } from "../../../../api/models/mail";
import useProfile from "../../../../hooks/useProfile";

interface NewMashaMailProps {
  defaultMail?: Partial<Mail>,
  defaultRecipients?: Profile[],
  onClose: () => void;
}
// debounce the fetch profiles function
const fetchProfiles = debounce(listProfiles, 300, { maxWait: 1200 });

export default function NewMashaMail({ defaultMail, defaultRecipients, onClose }: NewMashaMailProps) {
  // own profile
  const { profile } = useProfile();

  // form statefuls
  const [recipients, setRecipients] = useState<readonly Profile[]>(defaultRecipients || []);
  const [subject, setSubject] = useState<string>(defaultMail?.subject || "");
  const [body, setBody] = useState<string>(defaultMail?.contents || "");
  const [previous] = useState<number | undefined>(defaultMail?.previous ?? undefined);
  const validMessage = profile && recipients && subject && body;

  // mutation for submitting the new email
  const submitEmail = useMutation(async () => {
    // create the mail object
    let mail = await createMail({
      contents: body,
      subject: subject,
      sender_id: profile!.id,
      previous
    });
    // link all recipients
    for (let i = 0; i < recipients.length; i++) {
      await createMailRecipient({
        mail_id: mail.id,
        recipient_id: recipients[i].id,
      });
    }
  });

  // submit handling
  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    if (!validMessage) return;
    submitEmail
      .mutateAsync()
      .then(() => {
        // if successful, close the window
        onClose();
      })
      .catch((e) => {
        // if unsuccessful, show an error
        console.log(e);
      });
  };

  return (
    <Modal
      title={"Compose a New M-Mail"}
      closable={true}
      onClose={onClose}
      defaultPos={{
        x: 100,
        y: 100,
        width: 600,
        height: 700,
      }}
      minWidth={500}
      minHeight={500}
    >
      <form className={s.masha_mail_new_container} onSubmit={onSubmit}>
        <div className={s.masha_mail_upper_row}>
          To:
          <AsyncSelect
            isMulti
            required={true}
            placeholder={""}
            defaultOptions={true}
            loadOptions={async (search: string) => fetchProfiles(search)}
            getOptionLabel={(option: Profile) => option.name || option.username}
            getOptionValue={(option: Profile) => option.id}
            value={recipients}
            onChange={(profiles: readonly Profile[]) => setRecipients(profiles)}
            classNames={selectClassNames}
          />
        </div>
        <div className={s.masha_mail_upper_row}>
          Subject:
          <input
            type="text"
            placeholder="Write subject..."
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className={s.masha_mail_subject_line}
          />
        </div>
        <textarea
          required={true}
          className={s.masha_mail_text_area}
          placeholder="Write your message..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          spellCheck={false}
        ></textarea>
        <button
          type="submit"
          disabled={!validMessage}
          className={s.masha_mail_send_button}
        >
          Send
        </button>
      </form>
    </Modal>
  );
}
