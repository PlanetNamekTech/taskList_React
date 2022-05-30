import { useState, useEffect } from 'react' //Hooks
// State for dynamic data
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import About from './components/About'
import Footer from './components/Footer'
import TaskDetails from './components/TaskDetails'


const App = ()  => {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])

  // Fetch Tasks
   // Using json-server to imitate a backend
   const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }


  // Fetch Task
   const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
  }

// Add Task
const addTask = async (task) => {
  const response = await fetch('http://localhost:5000/tasks', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(task)
  })

  const data = await response.json()

  setTasks([...tasks, data])

  // Multiple ways to add to state
  // const id = Math.floor(Math.random() * 10000) + 1
  // const newTask = {id, ...task }
  // setTasks([...tasks, newTask])
}

// Delete a Task
const deleteTask = async (id) => {
  await fetch(`http://localhost:5000/tasks/${id}`, {
    method: 'DELETE'
  })

  setTasks(tasks.filter((task) => task.id !==id))
}

// Toggle reminder (true/false)
const toggleReminder = async (id) => {
  const taskToToggle = await fetchTask(id)
  const updatedTask = {...taskToToggle, reminder: !taskToToggle.reminder}
  const response = await fetch(`http://localhost:5000/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(updatedTask)
  })

  const data = await response.json()

  setTasks(tasks.map(( task) => task.id === id ? {...task, reminder: data.reminder } : task))
}

  return ( // Below is all JSX
  <Router>
    <div className="container">
      <Header 
      onAdd={() => setShowAddTask(!showAddTask)} 
      showAdd={showAddTask} 
      />
      <Routes>
      <Route
        path='/'
        element= { 
          <>
            {showAddTask && <AddTask onAdd={addTask} />}
            {tasks.length > 0 ? ( 
            <Tasks 
            tasks={tasks} 
            onDelete={deleteTask} 
            onToggle={toggleReminder}
            /> 
          ) : (
             'Empty List'
             )}
        </>
        }
        />
        <Route path='/about' element={<About />} />
        <Route path='/task/:id' element={<TaskDetails />} />
        </Routes>
        <Footer />
    </div>
    </Router>
  )
}

export default App;
