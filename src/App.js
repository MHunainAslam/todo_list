import React from 'react';
import { useTodoContext } from './context/Todocontext';
import Todo from './components/Todo';
import './App.css';

const App = () => {
  const { state, dispatch } = useTodoContext();

  const addTask = (title) => {
    const newTask = { id: state?.tasks?.[state.tasks.length - 1].id + 1, title, completed: false };
    dispatch({ type: 'ADD_TASK', payload: newTask });
  };

  const toggleTask = (id) => {
    dispatch({ type: 'TOGGLE_TASK', payload: id });
  };

  const deleteTask = (id) => {
    dispatch({ type: 'DELETE_TASK', payload: id });
  };

  return (
    <div className="container min-vh-100 d-flex justify-content-center align-items-center">
      <div className="row w-100 justify-content-center">
        <div className="col-lg-6 col-md-9">
          <div className="card rounded-4">
            <div className="card-body py-4 px-4">
              <h1 className='mb-4 text-success'>Todo List <i class="bi bi-card-checklist"></i></h1>
              <Todo
                AddTask={addTask}
                Tasks={state.tasks}
                ToggleComplete={toggleTask}
                Delete={deleteTask}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
