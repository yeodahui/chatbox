import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../contexts/userContext";

const CreateRoomButton = () => {
  const { user } = useContext(UserContext);

  const createRoom = async () => {
    const me = user.username;
    const target = "jihyun2";
    const roomName = prompt("채팅방 이름을 입력하세요.");

    if (me && target && roomName) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/chatroom/CreateRoom`,
          {
            roomName: roomName,
            username: target,
          },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        console.log(response);
        // 이후 target 유저와 로그인된 유저, roomId를 이용해 생성한 채팅방 구독해야 함
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("채팅방 이름을 정확히 입력해주세요.");
    }
  };

  return (
    <>
      <button
        onClick={() => {
          createRoom();
        }}
      >
        jihyun2랑 새 채팅하긔
      </button>
    </>
  );
};

export default CreateRoomButton;
