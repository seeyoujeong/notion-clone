import { Component } from "@/core";

class Home extends Component {
  template(): string {
    return `
      <div class="home">
        <h1>Hi there  👋</h1>
        <h2>노션 클로닝 with TS</h2>
      </div>
    `;
  }
}

export default Home;
