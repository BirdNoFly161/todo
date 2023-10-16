import Checkmark from "../components/svg/checkmark";
import { useState } from "react";

function Home() {
  const [toggle, setToggle] = useState(false);
  return (
    <span onClick={() => setToggle(!toggle)}>
      <Checkmark className="bg-primary" checked={toggle} />
    </span>
  );
}

export default Home;
