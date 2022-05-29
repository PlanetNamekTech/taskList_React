import Header from './components/Header'
import Tasks from './components/Tasks'
import { useState } from 'react'
// State for dynamic data

const App = ()  => {
  const [tasks, setTasks] = useState(
    [
        {
            id: 1,
            text: 'Doctors Appointment',
            day: 'Feb 5th at 2:30pm',
            reminder: true,
        },
        {
            id: 2,
            text: 'Meeting at School',
            day: 'Feb 6th at 1:30pm',
            reminder: true,
        }, 
        {
            id: 3,
            text: 'Grocery Shopping',
            day: 'Feb 5th at 4:30pm',
            reminder: false,
        }
    ]
)

// Delete a Task
const deleteTask = (id) => {
  setTasks(tasks.filter((task) => task.id !==id))
}

// Toggle reminder (true/false)
const toggleReminder = (id) => {
  setTasks(tasks.map(( task) => task.id === id ? {...task, reminder: !task.reminder } : task))
}

  return ( // Below is all JSX
    <div className="container">
      <Header />
      {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} /> : 'Empty List'}
    </div>
  );
}

export default App;
