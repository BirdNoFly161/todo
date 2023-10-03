import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import API from "../../../api";

function Users() {
    const [users, setUsers] = useState([]);

    useEffect(()=>{
        const init= async function (){
            let response = await API.get('/users/');
            response = await response.json();
            setUsers(response.users);
        }
        init()
    }, []);

  return (
    <div className="w-full flex flex-col items-center rounded">
        {users.map((user, index)=><UserPanel key={index} username={user.username}/>)}
    </div>
  )
}

const UserPanel = ({username})=>{
    const navigate= useNavigate();
    return (
        <div className="w-1/3 bg-primary flex justify-between px-4 py-2 rounded">
            <span className="text-lg flex flex-col justify-center p-2 min-w-[5em] bg-secondary text-center rounded">{username}</span>
            <button className="text-lg flex flex-col justify-center p-2 min-w-[5em] bg-secondary text-center rounded hover:scale-110 hover:shadow-surround hover:shadow-accent  hover:text-accent"
            onClick={()=> navigate('/home')}
            >More</button>
        </div>
    )
}

export default Users