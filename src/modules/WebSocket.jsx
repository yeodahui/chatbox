import React, { useState, useEffect, useRef } from "react";
import { Client, Stomp } from "@stomp/stompjs";
import { getTokenFromLS } from "./appendAuth";
import SockJS from "sockjs-client";

const WS_URL = `${process.env.REACT_APP_BASE_URL_WS}/ws-stomp`;
// const WS_URL = `${process.env.REACT_APP_BASE_URL}/ws-stomp`;
const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqaWh5dW4xIiwiYXV0aCI6IlJPTEVfVVNFUiIsImV4cCI6MTY5ODU4OTY0MH0.81x_kWxrvRKDOFrjV0kU_JW98zb78WOCLbZV2cC305s";

// const WebSocketComponent = () => {
//   useEffect(() => {
//     const sock = new WebSocket(WS_URL);
//     const ws = Stomp.over(sock);
//     ws.configure({
//       brokerURL: WS_URL,
//       connectHeaders: {
//         Authorization: `Bearer ${token}`,
//         Connection: "upgrade",
//         Upgrade: "websocket",
//       },
//       onConnect: (frame) => {
//         console.log("wow");
//         console.log(frame);
//       },
//       onStompError : (frame) => {
//         console.log("Broker reported error: " + frame.headers["message"]);
//         console.log("Additional details: " + frame.body);
//       },
//     })
//     console.log(ws);

//   //   ws.connect(
//   //     {
//   //       Authorization: `Bearer ${token}`,
//   //       // Host: "localhost",
//   //       Connection: "upgrade",
//   //       Upgrade: "websocket",
//   //     },
//   //     () => {
//   //       console.log("success");
//   //     }
//   //   );
//   // }, []);
//   return (
//     <div>
//       <h1>WebSocket Messages</h1>
//     </div>
//   );
// };

const WebSocketComponent = () => {
  useEffect(() => {
    // 웹소켓 연결 설정
    const client = new Client({
      brokerURL: WS_URL,
      connectHeaders: {
        Authorization: `Bearer ${token}`,
        Connection: "upgrade",
        Upgrade: "websocket",
      },
      debug: function (str) {
        console.log(str);
      },
      reconnectDelay: 15000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    // console.log(client);

    client.onConnect = function (frame) {
      console.log("connected");
    };
    client.onStompError = function (frame) {
      console.log("Broker reported error: " + frame.headers["message"]);
      console.log("Additional details: " + frame.body);
    };

    console.log(client);

    client.activate();

    return () => {
      // 컴포넌트 언마운트 시 웹소켓 연결 해제
      if (client) {
        client.deactivate();
      }
    };
  }, []);

  return (
    <div>
      <h1>WebSocket Messages</h1>
    </div>
  );
};

export default WebSocketComponent;
