import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

const ChatRoom = ({ realname, room_id }) => {
  const chatLogRef = useRef(null);
  const chatSocketRef = useRef(null);
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
    const username = "realname";

    chatSocketRef.current.send(
      JSON.stringify({
        message: message,
        username: username,
      })
    );

    messageInputDom.value = "";
  };

  const handleRoomDelete = () => {
    const confirmation = window.confirm("채팅방을 삭제하시겠습니까?");

    if (confirmation) {
      chatSocketRef.current.send(
        JSON.stringify({
          type: "chat.delete_room",
        })
      );
      window.location.href = "http://localhost:3000/";
    }
  };

  const handleGoHome = () => {
    window.location.href = "http://localhost:3000/";
  };

  return (
    <div id="container">
      <h1 id="title">
        환영합니다, <span>{realname}님</span>
      </h1>
      <div>
        <button id="go-home-button" onClick={handleGoHome}>
          홈으로
        </button>
        <button id="chat-room-delete-button" onClick={handleRoomDelete}>
          채팅방 삭제하기
        </button>
      </div>
      <textarea
        id="chat-log"
        cols="100"
        rows="20"
        ref={chatLogRef}
        readOnly
      ></textarea>
      <br />
      <input
        id="chat-message-input"
        type="text"
        size="100"
        onKeyUp={handleKeyUp}
      />
      <br />
      <input
        id="chat-message-submit"
        type="button"
        value="Send"
        onClick={handleSubmit}
      />
      <script>{/* Remove the script code as it won't work in React */}</script>
    </div>
  );
};

export default ChatRoom;
