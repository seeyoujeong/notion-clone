## 프로젝트 설명

바닐라 타입스크립트로 구현한 노션 클로닝 프로젝트입니다. <a href="https://notion-clone-two-delta.vercel.app/">🔗 배포 링크</a>

<kbd>
  <img height="500px" src="https://github.com/seeyoujeong/notion-clone/assets/40534414/8b6e0904-134f-4168-aaca-b4cd8d928284" />
</kbd>

###

`문서 목록 조회`

- 사용자가 생성한 문서 목록을 조회할 수 있습니다.
- 특정 문서의 하위 문서를 토글 버튼을 이용해 조회할 수 있습니다.

`문서 생성 및 편집`

- 문서 목록에서 새 페이지 버튼 혹은 특정 문서의 `+` 버튼을 클릭하면 문서를 생성할 수 있습니다.
- 문서를 선택하면 제목과 내용을 추가 및 수정이 가능합니다.
- 명령어를 입력하면 서식 전환이 가능합니다.
- 문서의 제목과 내용은 자동으로 저장됩니다.

`문서 삭제`

- 문서 목록에서 특정 문서의 쓰레기통 아이콘을 클릭하면 문서를 삭제할 수 있습니다.

## 구조도

<kbd>
  <img height="400px" src="https://github.com/seeyoujeong/notion-clone/assets/40534414/5b14c35f-be3a-4185-8dcb-490ee49982a6" />
</kbd>

###

각 페이지/컴포넌트의 역할은 아래와 같습니다.

- App: 애플리케이션의 진입점
- Home: 루트 경로(/)에서 표시되는 내용을 담은 페이지
- Detail: URL에서 문서의 아이디값을 가져와 문서의 내용을 표시하는 페이지
- Header: 홈 버튼과 최상위 문서 생성 버튼을 가지는 컴포넌트
- DocumentList: 문서 목록을 표시하거나 특정 문서를 삭제하고 특정 문서의 하위 문서를 생성하는 컴포넌트
- DocumentEditor: 특정 문서의 내용을 표시하거나 수정하는 컴포넌트
- EditorTitle: 특정 문서의 제목 영역을 나타내는 컴포넌트
- EditorContent: 특정 문서의 내용 영역을 나타내며 에디터의 기능이 포함된 컴포넌트
