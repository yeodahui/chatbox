// 임시 로그인으로 accessToken을 받아 로컬스토리지에 저장하는 모듈
import axios from "axios";

export const getUserToken = () => {
  try {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/v1/users/login`, {
        username: process.env.REACT_APP_USER_ID,
        password: process.env.REACT_APP_USER_PW,
      })
      .then(({ data }) => {
        const token = data.data.accessToken;
        if (token) {
          localStorage.setItem("token", token);
          console.log("ls에 토큰을 저장했습니다.");
        } else {
          console.log("잘못된 데이터: ls에 토큰 저장에 실패했습니다.");
        }
      });
  } catch (e) {
    console.error("통신 실패: 토큰 받아오기에 실패했습니다.");
    console.error(e.response.status);
    console.error(e.response.data);
    console.error(e.response.headers);
  }
};
