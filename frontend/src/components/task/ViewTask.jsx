import { useEffect, useState } from "react";
import { setTaskStatus, viewTask } from "./taskService";
import SQLPlayground from "../SQLPlayground/SQLPlayground";
import './ViewTask.css'; // Import the CSS file for styles

const ViewTask = () => {
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(0);
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const fetchedTasks = await viewTask();
                setTasks(fetchedTasks.tasks);
                if(fetchedTasks) setSelectedTask(fetchedTasks?.tasks[0]);
                console.log(fetchedTasks)
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };
        fetchTasks();
    }, []);
    console.log(selectedTask)
    const handleTaskClick = async() => {
        console.log(selectedTask)
        try{
            const setTask=await setTaskStatus(selectedTask?.task._id);
        }
        catch(err){
            console.log(err);
        }
    }
    return (
        <div className="view-task-container">
            <div className="sidebar-task">
                <h3 className="sidebar-title">Tasks</h3>
                <ul className="task-list">
                    {tasks?.map((task) => (
                        <li
                            key={task?.task1?.id}
                            className={`task-item ${selectedTask?.task1?.id === task?.task1?.id ? 'active' : ''}`}
                            onClick={() => setSelectedTask(task)}
                        >
                            {task?.task1?.title}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="content task-content-style p-5">
                {selectedTask?.task1 ? (
                    <>
                        <h2 className="task-title">{selectedTask?.task1?.title}</h2>
                        <div className={selectedTask?.task.status=="pending"?"pending":"completed"}>Status : {selectedTask?.task.status.toUpperCase()}</div>
                        <p className="task-description">{selectedTask?.task1?.description}</p>
                        <p className="task-date">
                            Created on: {new Date(selectedTask?.task1?.createdAt).toLocaleDateString()}
                        </p>
                        <div className="task-sql-playground py-5">
                            <SQLPlayground />
                        </div>
                        <div className="mark" onClick={handleTaskClick}>Mark as Completed</div>
                    </>
                ) : (
                    <p className="placeholder">Select a task to view details</p>
                )}
            </div>
        </div>
    );
};

export default ViewTask;