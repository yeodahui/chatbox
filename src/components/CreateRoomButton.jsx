import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../contexts/userContext";
import { ChatListContext } from "../contexts/chatListContext";
import { useWebSocketContext } from "../contexts/webSocketContext";
import { getChatList } from "../modules/getChatList";

const CreateRoomButton = () => {
  const { user } = useContext(UserContext);
  const { publish } = useWebSocketContext();
  const { setChatList } = useContext(ChatListContext);

  /**
   * 새 대화방을 생성하는 함수입니다.
   */
  const createRoom = async () => {
    const myUsername = user.username;
    const targetUsername = prompt("대화상대 username을 입력해주세요.");
    const roomTitle = prompt("채팅방 이름을 입력하세요.");

    if (!(myUsername && targetUsername && roomTitle)) {
      // 필요한 데이터 없을 시 함수 실행 종료합니다.
      console.error(
        "채팅방을 생성할 대화상대 혹은 채팅방 이름을 정확히 입력해주세요."
      );
      return;
    }

    // 필요한 데이터가 존재할 경우 계속합니다.
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/chatroom/CreateRoom`,
        {
          roomName: roomTitle,
          username: targetUsername,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      // response.data.data는 다음과 같은 형식의 객체가 담깁니다.
      // { id: number, roomName: String, username: String, ownUserName: String, userCount: number }
      const data = response.data.data;
      const { id, roomName, username, ownUserName } = data;

      const destination = `/pub/chat/${id}`;
      const headers = {
        Authorization: `Bearer ${user.token}`,
      };

      // 대화 상대 및 로그인한 유저를 대화방에 입장시킵니다.
      if (id && roomName && username && ownUserName) {
        // 로그인된 유저 입장
        publish(
          destination,
          {
            type: "ENTER",
            roomId: id,
            username: username,
            message: "enter",
          },
          headers
        );
        // 대화상대 입장
        publish(
          destination,
          {
            type: "ENTER",
            roomId: id,
            username: ownUserName,
            message: "enter",
          },
          headers
        );
        // 입장한 채팅방 목록을 다시 불러옵니다.
        getChatList(user.token, (data) => {
          setChatList(data);
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
      onClick={() => {
        createRoom();
      }}
    >
      새 채팅방 생성하기
    </button>
  );
};

export default CreateRoomButton;
