import Noteboard from "../components/svg/noteboard";
import { useState } from "react";

function Home() {
  const [toggle, setToggle] = useState(false);
  return (
    <span onClick={() => setToggle(!toggle)}>
      <Noteboard />
    </span>
  );
}

export default Home;
