## 프로젝트 설명

바닐라 타입스크립트로 구현한 노션 클로닝 프로젝트입니다. <a href="https://notion-clone-two-delta.vercel.app/">🔗 배포 링크</a>

<kbd>
  <img height="500px" src="https://github.com/seeyoujeong/notion-clone/assets/40534414/f8f0947f-987d-42a8-8a6a-56d491b08f05" />
</kbd>
  
주요 기능은 아래와 같습니다.

- 최상위 혹은 특정 문서의 하위에 문서를 생성합니다.
- 특정 문서의 내용을 확인하고 수정 및 삭제를 할 수 있습니다.
  - 문서의 제목 및 내용을 수정하면 자동으로 저장됩니다.

## 구조도

<kbd>
  <img height="400px" src="https://github.com/seeyoujeong/notion-clone/assets/40534414/83dce91c-1302-4dbc-b915-d7d32b5b5edd" />
</kbd>

각 페이지/컴포넌트의 역할은 아래와 같습니다.

- App: 애플리케이션의 진입점
- Home: 루트 경로(/)에서 표시되는 내용을 담은 페이지
- Detail: URL에서 문서의 아이디값을 가져와 문서의 내용을 표시하는 페이지
- Header: 홈 버튼과 최상위 문서 생성 버튼을 가지는 컴포넌트
- DocumentList: 문서 목록을 표시하거나 특정 문서를 삭제하고 특정 문서의 하위 문서를 생성하는 컴포넌트
- DocumentEditor: 특정 문서의 내용을 표시하거나 수정하는 컴포넌트
