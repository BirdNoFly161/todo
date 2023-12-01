import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../redux/user/userSlice";
import { setAuthToken } from "../redux/user/userSlice";
import { navLinks } from "../constants";
import { BiMenu } from "react-icons/bi";
import { BiChevronDown } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import API from "../../api";
import { useState } from "react";

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

function DesktopNavbar({ links }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  return (
    <div className="sm:flex hidden w-[calc(100vw - .5rem)] bg-primary h-12 justify-between p-2">
      <span className="flex items-center sm:text-md lg:text-xl">
        <Link to={"/"}>
          <span className="font-medium text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] hover:text-accent transition-all">
            {"Poor man's todo"}
          </span>
        </Link>
      </span>
      <div className="flex grow justify-center gap-3">
        {links.map((link, index) => (
          <StyledLink key={index} link={link.link} title={link.title} />
        ))}
      </div>
      <div className="flex items-center justify-center gap-2">
        {user ? (
          <>
            <span className="text-lg flex flex-col justify-center bg-background text-center w-10 h-10 rounded-full">
              <img className="rounded-full" src={user.image} alt="" />
            </span>
            <button
              className="sm:text-md lg:text-lg flex flex-col justify-center items-center px-2 py-1 min-w-[5em] bg-background border border-border text-center rounded hover:scale-110 transition-all"
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
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  return (
    <>
      <div className="sm:hidden flex w-[calc(100vw - .5rem)] bg-primary h-12 justify-center p-2">
        <button
          className="flex items-center"
          onClick={() => setToggle(!toggle)}
        >
          {toggle ? (
            <BiChevronDown className="h-10 w-10" />
          ) : (
            <BiMenu className="h-10 w-10" />
          )}
        </button>
        <span className="flex justify-center items-center grow  text-xl">
          <Link to={"/"}>
            <span className="text-white font-normal drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] hover:text-accent transition-all">
              {"Poor man's todo"}
            </span>
          </Link>
        </span>
      </div>
      <div
        className={`${
          toggle ? "flex" : "hidden"
        } fixed flex-col justify-between w-2/3 h-[calc(100%-3rem)] bg-primary ${
          toggle ? "animate-appearLeft" : ""
        }`}
      >
        <div className="flex flex-col justify-center">
          {links.map((link, index) => (
            <StyledLinkMobile key={index} {...link} setToggle={setToggle} />
          ))}
        </div>

        <div className="flex justify-center items-center p-4">
          <div className="flex gap-2">
            {user ? (
              <>
                <span className="text-lg flex flex-col justify-center bg-background text-center w-fit h-fit rounded-full">
                  <FaUserCircle className="w-10 h-10" />
                </span>
                <button
                  className="sm:text-md lg:text-lg flex flex-col justify-center items-center p-2 min-w-[5em] bg-background text-center border border-border rounded hover:scale-110y transition-all"
                  onClick={async () => {
                    let response = await API.post("/users/logout", null);
                    dispatch(setAuthToken(null));
                    dispatch(setUser(null));
                    API.setAuthToken(null);
                    console.log(response);
                    setToggle(false);
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                {" "}
                <StyledLinkMobile
                  title={"Sign up"}
                  link="/signup"
                  setToggle={setToggle}
                ></StyledLinkMobile>
                <StyledLinkMobile
                  title={"Login"}
                  link="/login"
                  setToggle={setToggle}
                ></StyledLinkMobile>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

const StyledLink = ({ title, link }) => {
  return (
    <Link
      className="sm:text-md lg:text-lg xl:text-xl flex flex-col justify-center px-2 py-1 min-w-[5em] bg-background text-center rounded hover:scale-110 transition-all"
      to={link}
    >
      <span>{title}</span>
    </Link>
  );
};

const StyledLinkMobile = ({ title, link, setToggle }) => {
  return (
    <Link
      className="sm:text-md lg:text-lg xl:text-xl flex flex-col justify-center py-4 px-2 min-w-[5em]w-full bg-background rounded text-center hover:scale-110 transition-all"
      to={link}
      onClick={() => setToggle(false)}
    >
      <span>{title}</span>
    </Link>
  );
};

export default Navbar;
