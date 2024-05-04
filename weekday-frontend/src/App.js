import "./App.css";
import Body from "./components/Body";
import appStore from "./utils/appStore";
import { Provider } from "react-redux";

function App() {
  return (
    <div className="App">
      <Provider store={appStore}>
        <h1>WeekDay</h1>
        <Body />
      </Provider>
    </div>
  );
}

export default App;
