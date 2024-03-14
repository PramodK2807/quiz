import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Quiz from "./Components/Quiz";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <Quiz />
    </RecoilRoot>
  );
}

export default App;
