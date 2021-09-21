import "./App.css";
import { DefaultLayout } from "./component/layout/DefaultLayout";
import { Entry } from "./pages/entry/Entry.page";
import { Dashboard } from "./pages/dashboard/Dashboard.page";

function App() {
  return (
    <div className="App">
      {/* <Entry /> */}
      <DefaultLayout>
        <Dashboard />
      </DefaultLayout>
    </div>
  );
}

export default App;
