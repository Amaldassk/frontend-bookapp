import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {

    const [userName, setUserName] = useState();
    const [password, setPassword] = useState();
    const [displayName, setDisplayName] = useState();
    const navigate = useNavigate();

    const handleSignin = async (e) => {
        e.preventDefault();
        let result = await fetch('http://localhost:3300/api/user/signup',{
            method:'POST',
            body:JSON.stringify({"username":userName, "password":password, "display_name":displayName}),
            headers:{
                'Content-Type':'application/json'
            }
        });
        result = await result.json();
        navigate('/login');
        console.warn(result);
    }

    return(
        <div className="w-[400px] m-auto p-4 box-border border border-gray-400 rounded-md mt-3">
            <h2>Please register here</h2>
            <form onSubmit={handleSignin} className="flex flex-row flex-wrap justify-center">
                <input className="w-full border-gray-400 border my-3 p-2 rounded-md" type="text" placeholder="username" value={userName} onChange={(e)=>setUserName(e.target.value)}/>
                <input className="w-full border-gray-400 border my-3 p-2 rounded-md" type="text" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <input className="w-full border-gray-400 border my-3 p-2 rounded-md" type="text" placeholder="password" value={displayName} onChange={(e)=>setDisplayName(e.target.value)}/>
                <button type="submit" className="bg-orange-500 p-2 text-white rounded-md">Register</button>
            </form>
        </div>
    )
}

export default Signup;