import "./App.css";
import { DefaultLayout } from "./component/layout/DefaultLayout";
// import { Entry } from "./pages/entry/Entry.page";
// import { Dashboard } from "./pages/dashboard/Dashboard.page";
import { AddTicket } from "./pages/new-ticket/AddTicket.page";

function App() {
  return (
    <div className="App">
      {/* <Entry /> */}
      <DefaultLayout>
        {/* <Dashboard /> */}
        <AddTicket />
      </DefaultLayout>
    </div>
  );
}

export default App;
