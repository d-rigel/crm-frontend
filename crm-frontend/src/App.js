import "./App.css";
import { DefaultLayout } from "./component/layout/DefaultLayout";
import { Entry } from "./pages/entry/Entry.page";

function App() {
  return (
    <div className="App">
      {/* <Entry /> */}
      <DefaultLayout>Send for the main content</DefaultLayout>
    </div>
  );
}

export default App;
