import Navbar from "../components/Navbar";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import api from "../../api";

function Home() {
    //const [loading, setLoading] = useState(false);
    useEffect(() => {
        async function init() {
            let response = (await api("/users/token", "GET", null));
            response = await response.json();
            console.log(response);

        }
        init();
    }, []);

    return (
        <>
            <Navbar />
            <div className="flex flex-col justify-center items-center p-6">
                <Outlet />
            </div>
            {/*
            <button
                className="flex justify-center w-1/3 bg-secondary hover:scale-110 hover:shadow-surround hover:shadow-accent  hover:text-accent rounded px-2 py-1"
                onClick={async () => {
                    setLoading(true);
                    let response = await api("/users/token", "GET", null);
                    setLoading(false);
                    console.log(response);
                }}
            >
                {!loading ? "Test the token ! " : "Loading"}
            </button>
              */}
            <Toaster />
        </>
    );
}

export default Home;
