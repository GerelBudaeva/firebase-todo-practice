import {useState} from 'react';
import {addDoc, collection, Timestamp} from 'firebase/firestore';
import db from './connectDB';
import 'bootstrap/dist/css/bootstrap.min.css'
const CreateTaskForm = () => {

    const [title, setTitle] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(title);
        addDoc(collection(db, 'tasks'), {
            title,
            created: Timestamp.now()
        }).then(res => console.log(res))
            .catch(err => console.log(err))

        setTitle('');
    }

    return (
        <form className='input-group mb-3'>
            <input
                type="text"
                placeholder="Enter task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className='form-control'
            />
            <button type="submit" className='btn btn-primary' onClick={handleSubmit}>Add task</button>
        </form>
    );
};

export default CreateTaskForm;
