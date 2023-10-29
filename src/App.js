import "./App.css";
import { getUserToken } from "./modules/getUserToken";

function App() {
  if (localStorage.getItem("token") === undefined) {
    getUserToken();
  } else {
    console.log("토큰이 저장되어있습니다.");
  }
  return <></>;
}

export default App;
