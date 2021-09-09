import React, { ReactElement, useCallback, useEffect, useState } from "react";
import styles from "./Chat.module.scss";

import tmi from "tmi.js";
import { motion } from "framer-motion";

interface Message {
  user?: string;
  message: string;
  messageHtml?: string;
  color?: string;
}

function getMessageHTML(message, { emotes }: { emotes: any }) {
  if (!emotes) return message;

  // store all emote keywords
  // ! you have to first scan through
  // the message string and replace later
  const stringReplacements: any[] = [];

  // iterate of emotes to access ids and positions
  Object.entries(emotes).forEach(([id, positions]) => {
    // use only the first position to find out the emote key word
    // @ts-ignore
    const position = positions[0];
    const [start, end] = position.split("-");
    const stringToReplace = message.substring(
      parseInt(start, 10),
      parseInt(end, 10) + 1
    );

    stringReplacements.push({
      stringToReplace: stringToReplace,
      replacement: `<img src="https://static-cdn.jtvnw.net/emoticons/v1/${id}/1.0">`,
    });
  });

  // generate HTML and replace all emote keywords with image elements
  const messageHTML = stringReplacements.reduce(
    (acc, { stringToReplace, replacement }) => {
      // obs browser doesn't seam to know about replaceAll
      return acc.split(stringToReplace).join(replacement);
    },
    message
  );

  return messageHTML;
}

export default function Chat(): ReactElement {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const client = new tmi.Client({
      channels: ["cirno_tv"],
    });

    client.connect();

    client.on("message", onMessage);

    return () => {
      client.disconnect();
    };
  }, []);

  const onMessage = useCallback((channel, tags, message, self) => {
    setMessages((m) => {
      const arr = [
        ...m,
        {
          message: message,
          messageHtml: getMessageHTML(message, { emotes: tags["emotes"] }),
          user: tags["display-name"],
          color: tags["color"],
        },
      ];

      return arr.slice(arr.length - 20, arr.length);
    });
  }, []);

  const { chat_container } = styles;

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      transition={{ delay: 0.35 }}
      animate={{ opacity: 1, x: 0 }}
      className={chat_container}
    >
      <Title />
      <div className={styles.messages}>
        {messages.map(({ user, message, color, messageHtml }, index) => (
          <div className={styles.message} key={index}>
            <span style={{ color }} className={styles.user}>
              {user}
            </span>
            {messageHtml ? (
              <span
                className={styles.message_content}
                dangerouslySetInnerHTML={{ __html: messageHtml }}
              />
            ) : (
              <span className={styles.message_content}>{message}</span>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function Title() {
  const { title } = styles;

  return (
    <h3 className={title}>
      <span style={{ marginRight: 20 }}>Chat</span>
      <img
        src="https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_6578c8c6c68a4645b840fe2b7c07e471/default/light/1.0"
        alt=""
      />
    </h3>
  );
}
