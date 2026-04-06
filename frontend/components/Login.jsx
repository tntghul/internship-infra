import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'

const Login = () => {

    const [email, setEmail] = useState("");
    const [password , setPassword] = useState("");
    const navigate = useNavigate();

    const handlelogin = async(e)=>{
        e.preventDefault();

        const data = {
            email, password
        };

        try {
            const res = await fetch('http://localhost:3000/api/login',{
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify(data)
            });

            const result = await res.json();

            if(result.success === true){
                alert("Successfully Login");
                setEmail("");
                setPassword("");
                localStorage.setItem("userInfo", JSON.stringify(result));
                console.log(result);
                navigate("/task");
            } else{
                alert("Failed to login");
            }
            
        } catch (error) {
            console.log("Failed to login");
        }
    }
  return (
    <>
    <div className="container">
        <div className="row justify-content-center">
            <div className="col-lg-6 border p-5 rounded shadow">
                <form onSubmit={handlelogin}>
                    <h1 className='text-center pb-3'>Login</h1>
                    <div>
                        <label className='label-form'>Email</label>
                        <input type="email" className='form-control' value={email} onChange={(e)=>setEmail(e.target.value)}  required/>
                    </div>
                    <div>
                        <label className='label-control'>Password</label>
                        <input type="password" className='form-control' value={password} onChange={(e)=>setPassword(e.target.value)} required/>
                    </div>
                    <div className='my-3'>
                        <button className='btn btn-primary'>Login</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    </>
  )
}

export default Login