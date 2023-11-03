# 웹소켓 실시간 채팅방

### 사용한 기술

[주요 기술]

- UI: React, styled-component
- WebSocket 통신: StompJs
- 전역 상태관리: ContextAPI

[사용한 라이브러리]

- React(v.18)
- styled-components
- StompJs
- axios
- dotenv

### 설치 및 시작

1. `npm i` 명령으로 사용한 node 패키지를 설치합니다.

```bash
npm i
```

2. .env 파일을 생성해줍니다. API 서버 URL 및 임시 로그인 계정 변수가 정의되어있습니다.

```
REACT_APP_BASE_URL= ...
REACT_APP_BASE_URL_WS= ...
REACT_APP_USER_ID= ...
REACT_APP_USER_PW= ...
```

3. npm start로 실행합니다.

```bash
npm start
```
