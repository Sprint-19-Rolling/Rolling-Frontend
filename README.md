# ✉️ Rolling - 롤링

![readme-banner](https://github.com/user-attachments/assets/55646ec3-ab74-410a-b5fe-690128f6aa5b)

## 🚩 프로젝트 소개

**Rolling**은 누구나 쉽게 온라인 롤링페이퍼를 만들어 소중한 사람에게 메시지와 이모지 리액션으로 마음을 전할 수 있는 서비스입니다.

모달, 토스트, 에디터, API 연동 등 다양한 컴포넌트와 커스텀 훅(useHook)을 직접 구현하며 프로젝트를 완성했습니다.

[✉️ 롤링 바로가기>](https://rolling-7team.vercel.app/)

## 📅 프로젝트 수행

- `프로젝트 기간`: 2025.09.24 ~ 2025.10.16
- `프로젝트 주제 선정 및 진행 계획 수립`: 2025.09.22 ~ 2025.09.24
- `프로젝트 기능 구현`: 2025.09.25 ~ 2025.10.12
- `프로젝트 중간 점검`: 2025.10.09
- `버그 / 테스팅`: 2025.10.11 ~ 2025.10.13
- `팀 소통 및 일정 관리`: 코어타임에 Discord로 모여서 작업 + GitHub 이슈로 진행 상황 트래킹

## 💁 팀원 소개

| <img src="https://avatars.githubusercontent.com/u/117738875?v=4" width="150"/> | <img src="https://avatars.githubusercontent.com/u/76269203?v=4" width="150"/> | <img src="https://avatars.githubusercontent.com/u/221239670?v=4" width="150"/> | <img src="https://avatars.githubusercontent.com/u/217933138?v=4" width="150"/> | <img src="https://avatars.githubusercontent.com/u/221279400?v=4" width="150"/> |
| :----------------------------------------------------------------------------: | :---------------------------------------------------------------------------: | :----------------------------------------------------------------------------: | :----------------------------------------------------------------------------: | :----------------------------------------------------------------------------: |
|                      [이아름](https://github.com/aahreum)                      |                    [양은지](https://github.com/eunji0124)                     |                    [최희락](https://github.com/Greensod-96)                    |                      [차혁](https://github.com/heoc0523)                       |                     [선기훈](https://github.com/seongihun)                     |
|                                   팀장 `FE`                                    |                                   팀원 `FE`                                   |                                   팀원 `FE`                                    |                                   팀원 `FE`                                    |                                   팀원 `FE`                                    |

## 📋 역할 분배

### 이아름

**UI**

**공통 컴포넌트**
- Footer
- Button, LinkButton
- 레이아웃 컴포넌트(MainLayout, PostLayout)
- Title
- Error

**페이지 컴포넌트**
- 메인 페이지 구현
- 

**기능**
- 전역 에러 관리(Error Context) 및 토스트 알림 시스템(Toast Context) 구현

**기타**
- 프로젝트 초기 세팅 (ESLint, Prettier, Husky)
- SEO 및 메타태그 설정 (OG/Twitter 카드, 파비콘)
- GitHub Wiki 문서화
- README 작성

### 양은지

**UI**

**공통 컴포넌트**
- 개별 프로필
- 그룹 프로필

**페이지 컴포넌트**
- 메시지 추가 페이지 - 프로필 선택 영역
- 롤링페이퍼 생성 페이지 - 탭 버튼 UI 제작
- 롤링페이퍼 생성 페이지 - 탭 콘텐츠 UI 제작
- 롤링페이퍼 생성 페이지 - 페이지 레이아웃 구성
- 롤링페이퍼 생성 페이지 - 전체 디자인 및 반응형 구현 + 생성 API 연동
- 롤링페이퍼 리스트 페이지 - 배경색 적용 기능


**기능**

**Axios**
- 공통 및 팀 API 인스턴스 설정
- 공통 API 오류 처리 로직 구현
- 롤링페이퍼 생성 페이지 오류 처리 및 API 분리
- API 함수 단위 리팩토링

### 최희락

### 차혁

### 선기훈

**UI**

- 드롭다운 컴포넌트 구현
- 편집 토글 버튼 구현
- 삭제하기 버튼 반응형 구현

**기능**

- vercel 배포 연동
- PR 생성 시 Vercel Preview가 자동으로 배포되도록 GitHub Actions 워크플로우 추가
- 롤링페이퍼 삭제 api 연결
- 롤링페이퍼 메세지 삭제 api 연결

## 🧑‍💻 기술 스택

### 라이브러리

<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/react_router-CA4245?style=for-the-badge&logo=react-router&logoColor=white"> <img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white"> <img src="https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white"> <img src="https://img.shields.io/badge/react_context-61DAFB?style=for-the-badge&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/react_quill-2F2F2F?style=for-the-badge&logo=react&logoColor=white"> <img src="https://img.shields.io/badge/emoji_picker_react-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">

- `React` → UI 라이브러리
- `React Router` → 클라이언트 라우팅
- `Axios` → HTTP 요청
- `Tailwind CSS` → 유틸리티 기반 CSS
- `React Context` → 전역 상태 관리
- `React Quill New` → 리치 텍스트 에디터
- `emoji-picker-react` → 이모지 선택 UI

### 빌드 & 개발 도구

<img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white"> <img src="https://img.shields.io/badge/vite-646CFF?style=for-the-badge&logo=vite&logoColor=white"> <img src="https://img.shields.io/badge/vite_plugin_react-646CFF?style=for-the-badge&logo=react&logoColor=white"> <img src="https://img.shields.io/badge/vite_plugin_svgr-FF6347?style=for-the-badge&logo=react&logoColor=white">

- `npm` → 패키지 매니저
- `Vite` → 프론트엔드 빌드 도구
- `@vitejs/plugin-react` → Vite React 지원 플러그인
- `vite-plugin-svgr` → SVG를 React 컴포넌트로 변환

### 코드 품질 & 포맷팅

<img src="https://img.shields.io/badge/eslint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white"> <img src="https://img.shields.io/badge/prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white"> <img src="https://img.shields.io/badge/husky-000000?style=for-the-badge&logo=husky&logoColor=white"> <img src="https://img.shields.io/badge/lintstaged-4B32C3?style=for-the-badge&logo=git&logoColor=white"> <img src="https://img.shields.io/badge/commitlint-FF0000?style=for-the-badge&logo=git&logoColor=white">

- `ESLint` → 코드 린트
- `Prettier` → 코드 포맷팅
- `Husky` → 커밋 전 린트/포맷 자동화
- `lint-staged` → 커밋 전 파일 단위 린트
- `Commitlint` → 커밋 메시지 컨벤션 검사

### 배포 & CI/CD

<img src="https://img.shields.io/badge/vercel-000000?style=for-the-badge&logo=vercel&logoColor=white"> <img src="https://img.shields.io/badge/github_actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white">

- `Vercel` → 프론트엔드 배포
- `GitHub Actions` → Preview 링크 자동 생성 및 배포 워크플로우 구현

### 협업 도구

<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"> <img src="https://img.shields.io/badge/notion-000?style=for-the-badge&logo=notion&logoColor=white"> <img src="https://img.shields.io/badge/discord-5865F2?style=for-the-badge&logo=discord&logoColor=white"> <img src="https://img.shields.io/badge/figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white">

- `GitHub` → 코드 버전 관리, 위키 문서화, 이슈 트래킹
- `Notion` → 문서화 및 일정 관리
- `Figma` → UI/UX 디자인
- `Discord` → 팀 커뮤니케이션

## 🗂️ 디렉토리 구조

```plaintext
📦 Rolling-Frontend
 ┣ 📂.github                    # GitHub 이슈 및 PR 템플릿 관리
 ┣ 📂.husky                     # Git Hook 설정 (pre-commit, commit-msg)
 ┣ 📂.vscode                    # VSCode 개발 환경 설정 (확장, 스니펫, 설정 등)
 ┣ 📂public                     # 웹폰트 리소스, 브라우저 탭 아이콘, 오픈그래프용 대표 이미지
 ┣ 📂src
 ┃ ┣ 📂apis                     # API 요청 모듈
 ┃ ┣ 📂assets                   # 정적 리소스
 ┃ ┣ 📂components               # UI 컴포넌트
 ┃ ┃ ┣ 📂common                 # 버튼, 모달, 인풋 등 공용 컴포넌트
 ┃ ┃ ┣ 📂main                   # 메인 페이지 전용 컴포넌트
 ┃ ┃ ┣ 📂post                   # 롤링페이퍼 작성 탭 관련 컴포넌트
 ┃ ┃ ┗ 📂rolling-paper-list     # 메시지 카드, 토스트, 토글 등 리스트 관련 컴포넌트
 ┃ ┣ 📂constants                # 상수 정의
 ┃ ┣ 📂context                  # 전역 상태 관리
 ┃ ┣ 📂hooks                    # 커스텀 훅
 ┃ ┣ 📂pages                    # 라우트 단위 페이지
 ┃ ┣ 📂router                   # 라우팅 설정
 ┃ ┣ 📂style                    # 전역 스타일, Tailwind 유틸, Quill 커스텀 CSS
 ┃ ┗ 📂utils                    # 공용 유틸 함수
 ┣ 📜App.jsx
 ┣ 📜main.jsx
 ┣ 📜index.html
 ┣ 📜vite.config.js             # Vite 빌드 설정
 ┣ 📜vercel.json                # Vercel 배포 설정
 ┣ 📜eslint.config.js           # ESLint 규칙
 ┣ 📜commitlint.config.js       # Commitlint 규칙
 ┣ 📜.prettierrc.json           # Prettier 포맷 설정
 ┣ 📜.prettierignore
 ┣ 📜.gitignore
 ┣ 📜.env                       # 환경 변수 파일
 ┗ 📜README.md

```

## ✨ 페이지 소개

### 🖥️ 메인 페이지

|                                                                         PC                                                                          |                                                                         Tablet                                                                          |                                                                         Mobile                                                                          |
| :-------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------: |
| <img width="100%" alt="Rolling 서비스 메인 페이지 PC 화면" src="https://github.com/user-attachments/assets/c0945b67-9839-44f7-ad24-c5c7b94f0f3c" /> | <img width="100%" alt="Rolling 서비스 메인 페이지 Tablet 화면" src="https://github.com/user-attachments/assets/035aaf9b-0a5a-4168-8add-654775b8e0ca" /> | <img width="100%" alt="Rolling 서비스 메인 페이지 Mobile 화면" src="https://github.com/user-attachments/assets/79734a5f-dfaf-4ea4-8206-c1dbd21a8356" /> |

### 🖥️ 리스트 페이지

### 🖥️ 롤링페이퍼 생성 페이지
**롤링페이퍼 생성하기**
| 롤링페이퍼 생성 | 에러 처리 |
| :---: | :---: |
| <img width="100%" alt="롤링페이퍼 생성 성공" src="https://github.com/user-attachments/assets/8ab87ffd-ce3c-4113-9396-9d6cd232d551" /> | <img width="100%" alt="롤링페이퍼 생성 에러" src="https://github.com/user-attachments/assets/5e743b70-1bf7-45be-9f28-fcf474a7cec8" /> |

**반응형**

|                                                                         PC                                                                          |                                                                         Tablet                                                                          |                                                                         Mobile                                                                          |
| :-------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------: |
| <img width="100%" alt="롤링페이퍼 생성  PC 화면" src="https://github.com/user-attachments/assets/7ab7fe19-0260-481c-bc05-48811054a60b" /> | <img width="100%" alt="롤링페이퍼 생성 Tablet 화면" src="https://github.com/user-attachments/assets/44637d2c-3e62-451a-b7ba-cdd0906ed820" /> | <img width="100%" alt="롤링페이퍼 생성 Mobile 화면" src="https://github.com/user-attachments/assets/01c59a7d-d00a-41c9-9b38-9eac30e858bc" /> |

### 🖥️ 롤링페이퍼 리스트 페이지

### 🖥️ 롤링페이퍼 리스트 편집 페이지

### 🖥️ 롤링페이퍼 메세지 등록 페이지

## 👀 플로우 차트

<img width="auto" height="auto" alt="서비스 플로우 차트" src="https://github.com/user-attachments/assets/ec375ab1-991f-4c80-9492-37d8e9b4ff64" />

## 🔗 Link

- [🚀 배포 사이트](https://rolling-7team.vercel.app/)
- [📝 Wiki](https://github.com/Sprint-19-Rolling/frontend/wiki)
- 팀 노션(추가 예정)
- 발표 자료(추가 예정)
- 시연 영상(추가 예정)
