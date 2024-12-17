import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { saveTasksToLocal, getTasksFromLocal } from '../utils/lib';

const TodoContext = createContext();

const initialState = {
  tasks: [], 
};

const todoReducer = (state, action) => {
  let updatedTasks;

  switch (action.type) {
    case 'SET_TASKS':
      return { ...state, tasks: action.payload };

    case 'ADD_TASK':
      updatedTasks = [...state.tasks, action.payload];
      saveTasksToLocal(updatedTasks); 
      return { ...state, tasks: updatedTasks };

    case 'TOGGLE_TASK':
      updatedTasks = state.tasks.map((task) =>
        task.id === action.payload ? { ...task, completed: !task.completed } : task
      );
      saveTasksToLocal(updatedTasks); 
      return { ...state, tasks: updatedTasks };

    case 'DELETE_TASK':
      updatedTasks = state.tasks.filter((task) => task.id !== action.payload);
      saveTasksToLocal(updatedTasks); 
      return { ...state, tasks: updatedTasks };

    default:
      return state;
  }
};

export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  useEffect(() => {
    const fetchTasks = async () => {
      const localTasks = getTasksFromLocal();

      if (localTasks.length > 0) {
        dispatch({ type: 'SET_TASKS', payload: localTasks });
      } else {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
        const apiTasks = await response.json();
        dispatch({ type: 'SET_TASKS', payload: apiTasks });
        saveTasksToLocal(apiTasks);
      }
    };

    fetchTasks();
  }, []);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => {
  return useContext(TodoContext);
};
