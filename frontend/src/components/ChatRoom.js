import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import styles from "./ChatRoom.module.css";
import axios from "axios";

const ChatRoom = ({ realname, room_id }) => {
  const chatLogRef = useRef(null);
  const chatSocketRef = useRef(null);
  const email = localStorage.getItem("email");
  function removeDomain(email) {
    const atIndex = email.indexOf("@");
    if (atIndex !== -1) {
      return email.substring(0, atIndex);
    }
    return email;
  }
  const username = removeDomain(email);
  const { id } = useParams();
  const url = `ws://localhost:8000/ws/chat/${id}/`;

  useEffect(() => {
    const chatSocket = new WebSocket(url);
    chatSocketRef.current = chatSocket;

    chatSocket.onmessage = function (e) {
      const data = JSON.parse(e.data);
      chatLogRef.current.value += `${data.message}\n`;
      scrollToBottom();
    };

    chatSocket.onclose = function (e) {
      console.error("Chat socket closed unexpectedly");
    };

    return () => {
      chatSocketRef.current.close();
    };
  }, [room_id]);

  const scrollToBottom = () => {
    chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
  };

  const handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      // Enter key
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    const messageInputDom = document.querySelector("#chat-message-input");
    const message = messageInputDom.value;

    chatSocketRef.current.send(
      JSON.stringify({
        message: message,
        username: username,
      })
    );

    messageInputDom.value = "";
  };

  const handleGoHome = () => {
    window.location.href = "http://localhost:3000/";
  };

  return (
    <div className={styles.container}>
      <h1 id="title">{username}님의 채팅</h1>
      <div></div>
      <textarea
        className={styles.textfield}
        id="chat-log"
        cols="100"
        rows="20"
        ref={chatLogRef}
        readOnly
      ></textarea>
      <br />
      <input
        className={styles.text}
        id="chat-message-input"
        type="text"
        size="100"
        placeholder="여기에 입력해주세요"
        onKeyUp={handleKeyUp}
      />
      <br />
      <div className={styles.btn}>
        <button
          className={styles.home}
          id="go-home-button"
          onClick={handleGoHome}
        >
          홈으로
        </button>
        <input
          className={styles.submit}
          id="chat-message-submit"
          type="button"
          value="보내기"
          onClick={handleSubmit}
        />
      </div>

      <script>{/* Remove the script code as it won't work in React */}</script>
    </div>
  );
};

export default ChatRoom;
