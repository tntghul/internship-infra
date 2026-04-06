import React,{useState} from 'react'

const signup = () => {

    const [name , setName] = useState("");
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");

    const handlesubmit = async(e) =>{
        e.preventDefault();

        const data = {name, email , password};

        try {
            const res = await fetch(`http://localhost:3000/api/signup`,{
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify(data)
            });

            const result = await res.json();
            console.log(result); 

            if (result.success === true){
                alert("Signup Successfully");
                setName("");
                setEmail("");
                setPassword("");
            }else{
                alert("Failed to Signup");
            }
            
        } catch (error) {
            console.log(error);
        }

    }
    return (
        <>

            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-6 my-5 border rounded p-5 shadow">
                        <form onSubmit={handlesubmit}>
                            <h1 className='text-center'>Signup</h1>
                            <div>
                                <label className='label-control'>Name</label>
                                <input type="text" className='form-control' value={name} onChange={(e)=>setName(e.target.value)} required />
                            </div>
                            <div className='my-3'>
                                <label className='label-control'>Email</label>
                                <input type="email" className='form-control' value={email} onChange={(e)=>setEmail(e.target.value)} required/>
                            </div>
                            <div>
                                <label className='label-control'>Password</label>
                                <input type="password" className='form-control' value={password} onChange={(e=>setPassword(e.target.value))} required/>
                            </div>
                         
                            <div className='mt-3'>
                               <button type='submit' className='btn btn-primary'>Signup</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default signup