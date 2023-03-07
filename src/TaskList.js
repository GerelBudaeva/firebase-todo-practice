import db from './connectDB';
import {collection, query, onSnapshot, orderBy, deleteDoc, doc, updateDoc} from 'firebase/firestore';
import {useEffect, useState} from 'react';

function TaskList(props) {

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const taskColRef = query(collection(db, 'tasks'), orderBy('created', 'asc'));
        onSnapshot(taskColRef, (snapshot) => {
            setTasks(snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })))
        })
    }, [])

    const deleteTaskHandler = (id) => {
        deleteDoc(doc(db, 'tasks', id))
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    const onToggleDone = (id, newStatus) => {
        updateDoc(doc(db, 'tasks', id), {completed: newStatus})
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }


    return (
        <ul className='list-group'>
            {tasks.map(task => <li
                className='list-group-item'
                key={task.id}>
                <div className='row'>
                    <div className='col-8'>
                {task.completed ? <s>{task.title}</s> : task.title}
                    </div>
                    <div className='col-4'>
                <button onClick={() => deleteTaskHandler(task.id)}> Delete</button>
                <button onClick={() => onToggleDone(task.id, !task.completed)}>Done</button>
                <button onClick={() => props.onEdit(task.id)}>Edit</button>
                    </div>
                </div>
            </li>)}

        </ul>

    );
}

export default TaskList;
