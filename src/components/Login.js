import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {

    const [userName, setUserName] = useState('amaldas');
    const [password, setPassword] = useState('amal@123');
    const navigate = useNavigate();

    useEffect(()=>{
        const auth = localStorage.getItem('bUApp');
        if(auth) navigate('/');
    },[]);

    const handleLogin = async (e) => {
        e.preventDefault();
        let result = await fetch('http://localhost:3300/api/user/login',{
            method: 'POST',
            body: JSON.stringify({"username":userName,"password":password}),
            headers:{
                'Content-Type':'application/json'
            }
        });
        result = await result.json();
        
        localStorage.setItem("bUApp",JSON.stringify(result));
        navigate('/');
        console.warn(result);
    }

    return(
        <div className="w-[400px] m-auto p-4 box-border border border-gray-400 rounded-md mt-3">
            <h2>Please login to continue</h2>
            <form onSubmit={handleLogin} className="flex flex-col flex-wrap justify-center items-center">
                <input className="w-full border-gray-400 border my-3 p-2 rounded-md" type="text" placeholder="username" value={userName} onChange={(e)=>setUserName(e.target.value)}/>
                <input className="w-full border-gray-400 border my-3 p-2 rounded-md" type="text" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <button type="submit" className="bg-orange-500 p-2 text-white rounded-md max-w-[100px] mb-3">Login</button>
                <div>
                    Not already a member? <Link className="text-orange-500 underline" to="/signup">Signup</Link> here
                </div>
            </form>
        </div>
    )
}

export default Login;