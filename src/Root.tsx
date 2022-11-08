import { Outlet } from "react-router-dom";
import Header from "./screens/components/Header";

function Root() {
  return (
    <div>
      <Header />
      <Outlet context={{ darkMode: true }} />
    </div>
  );
}

export default Root;
