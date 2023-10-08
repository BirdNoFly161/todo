import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../redux/user/userSlice";
import { setAuthToken } from "../redux/user/userSlice";
import { navLinks } from "../constants";
import { BiMenu } from "react-icons/bi";
import API from "../../api";

function Navbar() {
  return (
    <>
      <DesktopNavbar links={navLinks} />
      <MobileNavbar links={navLinks} />
    </>
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
      className="sm:text-md lg:text-lg xl:text-xl flex flex-col justify-center p-2 min-w-[5em] bg-secondary text-center rounded hover:scale-110 hover:shadow-surround hover:shadow-accent  hover:text-accent"
      to={link}
    >
      <span>{title}</span>
    </Link>
  );
};

function DesktopNavbar({ links }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  return (
    <div className="sm:flex hidden w-[calc(100vw - .5rem)] bg-primary h-12 justify-between p-2">
      <span className="flex items-center text-secondary sm:text-md lg:text-xl">
        Poor man{`'`}s todo
      </span>
      <div className="flex grow justify-center gap-3">
        {links.map((link, index) => (
          <StyledLink key={index} link={link.link} title={link.title} />
        ))}
      </div>
      <div className="flex gap-2">
        {user ? (
          <>
            <span className="text-lg flex flex-col justify-center p-2 min-w-[5em] bg-secondary text-center rounded">
              {user.username}
            </span>
            <button
              className="sm:text-md lg:text-lg flex flex-col justify-center p-2 min-w-[5em] bg-secondary text-center rounded hover:scale-110 hover:shadow-surround hover:shadow-accent  hover:text-accent"
              onClick={async () => {
                let response = await API.post("/users/logout", null);
                dispatch(setAuthToken(null));
                dispatch(setUser(null));
                API.setAuthToken(null);
                console.log(response);
              }}
            >
              Logout
            </button>
          </>
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

function MobileNavbar({ links }) {
  return (
    <div className="sm:hidden flex w-[calc(100vw - .5rem)] bg-primary h-12 justify-center p-2">
      <button className="flex items-center">
        <BiMenu className="h-10 w-10" />
      </button>
      <span className="flex justify-center items-center grow text-secondary text-xl">
        Poor man{`'`}s todo
      </span>
    </div>
  );
}

export default Navbar;
