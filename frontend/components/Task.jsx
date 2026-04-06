
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Task = () => {

    const [title, setTitle] = useState("");
    const [inputText, setInputText] = useState("");
    const [operation, setOperation] = useState("");
    const [tasks, setTasks] = useState([]);

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    console.log("Token:", userInfo.token);

    const fetchTasks = async () => {
        try {
            const res = await fetch("http://localhost:3000/apii/getTasks",{
                headers: {
                "Authorization": `Bearer ${userInfo.token}`
            }
            });

            const data = await res.json(); // 👈 YE LINE ADD KARO

            console.log(data); // debug

            setTasks(data.tasks); // 👈 ab kaam karega
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchTasks();

        // Polling every 2 seconds to see updates
        const interval = setInterval(fetchTasks, 2000);
        return () => clearInterval(interval);
    }, []);

    const handlesubmit = async (e) => {
        e.preventDefault();

        

        const data = { title, input: inputText, operation };

        try {
            const res = await fetch('http://localhost:3000/apii/tasks', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${userInfo.token}`
                },
                body: JSON.stringify(data)
            });

            const result = await res.json();

            if (result.success === true) {
                alert("ADDED TASK");
                setTitle("");
                setInputText("");
                setOperation("");
                fetchTasks();
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>

            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-6 border my-5 p-5 rounded shadow">
                        <h1 className='text-center'>Add Task</h1>
                        <form onSubmit={handlesubmit}>
                            <div className='mb-3'>
                                <label className='label-control'>Title</label>
                                <input type="text" className='form-control' value={title} onChange={(e) => setTitle(e.target.value)} required />
                            </div>
                            <div className='mb-3'>
                                <label className='label-control'>Input Text</label>
                                <input type="text" className='form-control' value={inputText} onChange={(e) => setInputText(e.target.value)} required />
                            </div>
                            <div className='mb-3'>
                                <label className='label-control mb-2'>Operation</label>
                                <select className="form-control" value={operation}
                                    onChange={(e) => setOperation(e.target.value)} required>
                                    <option value="">Select Operation</option>
                                    <option value="uppercase">Uppercase</option>
                                    <option value="lowercase">Lowercase</option>
                                    <option value="reverse">Reverse</option>
                                    <option value="wordcount">Word Count</option>
                                </select>
                            </div>
                            <div>
                                <button className='btn btn-primary'>Add Task</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className='container'>
                <div>
                    <h2>Tasks</h2>

                    


                        <table className="table table-bordered mt-4">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Input</th>
                                    <th>Operation</th>
                                    <th>Status</th>
                                    <th>Result</th>
                                </tr>
                            </thead>

                            <tbody>
                                {tasks?.map((task) => (
                                    <tr key={task._id}>
                                        <td>{task.title}</td>
                                        <td>{task.input}</td>
                                        <td>{task.operation}</td>

                                        <td>
                                            {task.status === "pending" && "⏳ Pending"}
                                            {task.status === "running" && "⚙️ Running"}
                                            {task.status === "success" && "✅ Success"}
                                            {task.status === "failed" && "❌ Failed"}
                                        </td>

                                        <td>{task.result || "Processing..."}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    
                </div>
            </div>

        </>
    )
}

export default Task