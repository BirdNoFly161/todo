import Checkmark from "../components/svg/checkmark";
import Noteboard from "../components/svg/noteboard";
import Test from "../components/Test";
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
