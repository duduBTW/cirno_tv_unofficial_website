import React, { ReactElement, useCallback, useEffect, useState } from "react";
import styles from "./Chat.module.scss";

import tmi from "tmi.js";
import { AnimateSharedLayout, motion } from "framer-motion";

import sanitizeHtml from "sanitize-html";

interface Message {
  user?: string;
  message: string;
  messageHtml?: string;
  color?: string;
  id: string;
}

const cleanHtml = (message: string) =>
  sanitizeHtml(message, {
    allowedTags: ["img"],
    allowedAttributes: {
      img: ["src"],
    },
    allowedIframeHostnames: ["www.static-cdn.jtvnw.net"],
  });

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

  return cleanHtml(messageHTML);
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
          message: cleanHtml(message),
          messageHtml:
            tags["emotes"]?.length > 0
              ? getMessageHTML(message, { emotes: tags["emotes"] })
              : null,
          user: tags["display-name"],
          color: tags["color"],
          id: tags["id"],
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
      <AnimateSharedLayout>
        <motion.div layout className={styles.messages}>
          {messages.map(({ user, message, color, messageHtml, id }) => (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={styles.message}
              layout
              key={id}
            >
              <span style={{ color }} className={styles.user}>
                {user}
              </span>
              {messageHtml ? (
                <span
                  className={styles.message_content}
                  dangerouslySetInnerHTML={{ __html: messageHtml }}
                />
              ) : (
                <span className={styles.message_content}>{`${message}`}</span>
              )}
            </motion.div>
          ))}
        </motion.div>
      </AnimateSharedLayout>
    </motion.div>
  );
}

function Title() {
  const { title } = styles;
  const first =
    "https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_6578c8c6c68a4645b840fe2b7c07e471/default/light/1.0";
  const second =
    "https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_10567e4830694a73aa18243f2486398f/default/light/1.0";

  const [image, setImage] = useState(first);

  return (
    <h3 className={title}>
      <span style={{ marginRight: 20 }}>Chat</span>
      <img
        onMouseEnter={() => setImage(second)}
        onMouseLeave={() => setImage(first)}
        src={image}
        alt="icon"
      />
    </h3>
  );
}
