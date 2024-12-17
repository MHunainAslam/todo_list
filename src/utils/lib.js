export const saveTasksToLocal = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };
  
  export const getTasksFromLocal = () => {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  };
  