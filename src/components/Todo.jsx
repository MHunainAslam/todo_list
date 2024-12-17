import React, { useState } from 'react';

const Todo = ({ AddTask, Tasks, ToggleComplete, Delete }) => {
    const [task, setTask] = useState('');

    const handleAdd = (e) => {
        e.preventDefault()
        if (task.trim()) {
            AddTask(task.trim());
            setTask('');
        }
    };

    return (
        <>
            <form action="">
                <div class="input-group border-2 rounded-5 my-4">
                    <input
                        type="text"
                        placeholder="Add a new task..."
                        value={task}
                        className='form-control '
                        onChange={(e) => setTask(e.target.value)}
                    />
                    <button class="input-group-text" type='submit' id="basic-addon2" onClick={handleAdd}>ADD</button>
                </div>
            </form>
            <ul className="p-2">
                {Tasks?.length == 0 &&
                    <li className="d-flex justify-content-between align-items-top my-3">
                        <span className={`text-success`}>
                            No Todo Found!
                        </span>
                    </li>
                }
                {Tasks.map((task) => (
                    <li key={task.id} className="d-flex justify-content-between align-items-top my-3">
                        <div className="d-flex">
                            <i class={`bi fs-5 ${task.completed ? "bi-check2-circle text-success" : "bi-circle"} `}
                                onClick={() => ToggleComplete(task.id)}>

                            </i>
                            <span className={`mx-3 ${task.completed && "text-success"}`}>{task.title}</span>
                        </div>
                        <i onClick={() => Delete(task.id)} class="bi bi-trash fs-5 text-danger"></i>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default Todo;
