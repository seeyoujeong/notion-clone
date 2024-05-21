import { Component } from "@/core";

class Home extends Component {
  template(): string {
    return `
      <div class="home">
        <h1>Hi there  👋</h1>
        <h2>노션 클로닝 with TS</h2>

        <h3>사용 가능한 명령어 목록</h3>
        <ul>
          <li># + space : 제목 1</li>
          <li>## + space : 제목 2</li>
          <li>### + space : 제목 3</li>
        </ul>
      </div>
    `;
  }
}

export default Home;
