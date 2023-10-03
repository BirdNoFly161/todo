import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
  const user = useSelector((state) => state.user.user);
  return (
    <div className="w-[calc(100vw - .5rem)] bg-primary h-12 flex justify-between p-2">
      <span className="text-secondary text-xl">Poor man{`'`}s todo</span>
      <div className="flex grow justify-center gap-4">
        <StyledLink link="/" title="Home" />

        <StyledLink link="/about" title="About" />
      </div>
      <div className="flex gap-2">
        {user ? (
          <span>{user.username}</span>
        ) : (
          <>
            {" "}
            <StyledLink title={"Sign up"} link="/signup"></StyledLink>
            <StyledLink title={"Login"} link="/login"></StyledLink>
          </>
        )}
      </div>
    </div>
  );
}

// eslint-disable-next-line no-unused-vars
const StyledButton = ({ title, onClick }) => {
  return (
    <button
      className="text-lg flex flex-col justify-center p-2 min-w-[5em] bg-secondary text-center rounded hover:scale-110 hover:shadow-surround hover:shadow-accent  hover:text-accent"
      onClick={onClick}
    >
      {title}
    </button>
  );
};

const StyledLink = ({ title, link }) => {
  return (
    <Link
      className="text-lg flex flex-col justify-center p-2 min-w-[5em] bg-secondary text-center rounded hover:scale-110 hover:shadow-surround hover:shadow-accent  hover:text-accent"
      to={link}
    >
      <span>{title}</span>
    </Link>
  );
};

export default Navbar;
