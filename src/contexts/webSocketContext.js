// STOMP 웹소켓 연결 및 연결에 관한 핸들러 전역 상태 관리 Context

import { createContext, useContext, useMemo, useRef } from "react";
import { Client } from "@stomp/stompjs";

const WebSocketContext = createContext();

export const useWebSocketContext = () => useContext(WebSocketContext);

export const WebSocketProvider = ({ children }) => {
  const client = useRef();

  /**
   * 웹소켓 연결에 관한 설정 및 Activate하는 함수입니다.
   * @param {String} token 연결에 사용할 token 문자열
   */
  const connect = (token) => {
    client.current = new Client({
      brokerURL: `${process.env.REACT_APP_BASE_URL_WS}/ws-stomp`, // 종단점 지정
      connectHeaders: {
        // 요청 헤더 config
        Authorization: `Bearer ${token}`,
        Connection: "upgrade",
        Upgrade: "websocket",
      },
      reconnectDelay: 5000, // 연결 실패시 자동 재연결 지연시간
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      debug: (str) => {
        console.log(str); // 디버그 메시지 출력
      },
      onStompError: (frame) => {
        console.log("Broker reported error: " + frame.headers["message"]);
        console.log("Additional details: " + frame.body);
      },
      onConnect: (frame) => {
        // 커넥트 이벤트핸들러
        console.log("Websocket이 연결되었습니다.");
      },
    });
    client.current.activate();
  };

  /**
   * 웹소켓 연결을 deactivate하는 함수입니다.
   */
  const disconnect = (token) => {
    if (client.current) {
      client.current.deactivate();
      console.log("Websocket 연결을 성공적으로 해제했습니다.");
    } else {
      console.log(
        "에러: Websocket이 연결되어있지 않아 연결을 해제할 수 없습니다."
      );
    }
  };

  /**
   * 웹소켓 연결 후 데이터를 publish하는 함수입니다.
   * @param {String} destination publish 경로
   * @param {*} body 요청에 전달할 바디
   * @param {object} headers 요청에 전달할 헤더
   */
  const publish = (destination, body, headers) => {
    if (client.current) {
      client.current.publish({
        destination: destination,
        body: body,
        headers: headers,
      });
    } else {
      client.current.debug("에러: Client가 연결되지 않아 발행할 수 없습니다.");
    }
  };

  /**
   * 웹소켓 연결 후 데이터를 subscribe하는 함수입니다.
   * @param {String} destination subscribe 경로
   * @param {function} callback 수신한 메시지로 수행할 동작
   * @param {object} headers 요청에 전달할 헤더
   */
  const subscribe = (destination, callback, headers) => {
    if (client.current) {
      const sub = client.currunt.subscribe({
        destination: destination,
        callback: callback,
        headers: headers,
      });
      //  추후 unsubscribe를 위해 작성중인 코드...
      //   if (!(sub in subscribtions)) {
      //     setSubscribtions((prev) => ({ ...prev, sub }));
      //   }
    } else {
      client.current.debug("에러: Client가 연결되지 않아 구독할 수 없습니다.");
    }
  };

  const handlers = useMemo(
    () => ({
      connect,
      disconnect,
      subscribe,
      publish,
    }),
    []
  );

  return (
    <WebSocketContext.Provider value={handlers}>
      {children}
    </WebSocketContext.Provider>
  );
};
