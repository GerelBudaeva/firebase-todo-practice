import CreateTaskForm from './CreateTaskForm';
import TaskList from './TaskList';
import {useState} from 'react';
import EditTaskForm from './EditTaskForm';

function App() {

    const [editTaskId, setEditTaskId] = useState(null);

    const onEdit = (id) => {
        console.log(id)
        setEditTaskId(id)
    }

    const onEditCancel = () => {
        setEditTaskId(null)
    }

    return (
        <div className="container mt-3" >
            <CreateTaskForm/>
            <TaskList onEdit={onEdit}/>
            <EditTaskForm id={editTaskId} onCancel={onEditCancel}/>
        </div>
    );
}

export default App;
