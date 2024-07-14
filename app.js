const express = require('express');
const app = express();
const { tasks } = require('./task.json');
tasks.forEach(item => item.createdOn = new Date());
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const ascendingOrder = (tasks) => {
    return tasks.slice().sort((a, b) => new Date(a.createdOn) - new Date(b.createdOn));
}

const descendingOrder = (tasks) => {
    return tasks.slice().sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn));
}

const isValidpriority = (priority) => {
    return !['low', 'medium', 'high'].includes(priority?.toLowerCase());
}

app.get('/tasks', (req, res) => {
    let allTasks = tasks;
    const { completed, sortEle, order } = req.query;
    if (completed?.toLowerCase() === "false" || completed?.toLowerCase() === 'true') {
        allTasks = allTasks.filter(task =>
            task.completed.toString()
            === completed.toLowerCase());
    }
    if (sortEle?.toLowerCase() === 'date') {
        if (order?.toLowerCase() === 'desc') {
            allTasks = descendingOrder(allTasks);
        } else {
            allTasks = ascendingOrder(allTasks);
        }
    }
    res.status(200).json(allTasks);
});

app.get('/tasks/:taskId', (req, res) => {
    if (!tasks.length) {
        return res.status(204).send();
    }
    const taskId = parseInt(req.params.taskId);
    const task = tasks.find(task => task.id === taskId);
    if (!task) {
        return res.status(404).json({ message: 'Task not found with ID: ' + taskId });
    }
    res.status(200).json(task);
});

app.post('/tasks', (req, res) => {
    const { body } = req;
    const { title, description, completed, priority } = body;
    if (typeof title !== 'string' ||
        typeof description !== 'string' ||
        typeof completed !== 'boolean' ||
        !title ||
        !description) {
        return res.status(400).json(
            {
                message: 'Invalid body. "title" and "description" should be strings, and "completed" should be a boolean.'
            });
    }
    if (priority !== undefined && priority !== null && isValidpriority(priority)) {
        return res.status(400).json({ message: 'Invalid priority level. Allowed values are: "low", "medium", "high".' });
    }
    const task = {
        "id": Date.now(),
        createdOn: new Date(),
        title,
        description,
        completed,
        priority,
    }
    tasks.push(task);
    res.status(201).json(task);
});

app.put('/tasks/:taskId', (req, res) => {
    if (!tasks.length) {
        return res.status(204).send();
    }
    const { body } = req;
    const { title, description, completed, priority } = body;
    if (typeof title !== 'string' || typeof description !== 'string' || typeof completed !== 'boolean' || !title || !description) {
        return res.status(400).json({ message: 'Invalid body. "title" and "description" should be strings, and "completed" should be a boolean.' });
    }
    if (priority !== undefined && priority !== null && isValidpriority(priority)) {
        return res.status(400).json({ message: 'Invalid priority level. Allowed values are: "low", "medium", "high".' });
    }
    const taskId = parseInt(req.params.taskId);
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex === -1) {
        return res.status(404).json({ message: 'Task not found with ID: ' + taskId });
    }
    const updatedTask = {
        ...tasks[taskIndex],
        title,
        description,
        completed,
        priority
    };
    tasks[taskIndex] = updatedTask;
    res.status(200).json(updatedTask);
});

app.delete('/tasks/:taskId', (req, res) => {
    if (!tasks.length) {
        return res.status(204).send();
    }
    const taskId = parseInt(req.params.taskId);
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex === -1) {
        return res.status(404).json({ message: 'Task not found with ID: ' + taskId });
    }
    tasks.splice(taskIndex, 1);
    res.status(200).json({
        message: `Task with ID ${taskId} deleted successfully`
    });
});

app.get('/tasks/priority/:level', (req, res) => {
    const { level } = req.params;
    if (isValidpriority(level)) {
        return res.status(400).json({ message: 'Invalid priority level. Allowed values are: "low", "medium", "high".' });
    }
    const filteredTasks = tasks.filter(task => task.priority?.toLowerCase() === level?.toLowerCase());

    res.status(200).json(filteredTasks);
});

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});



module.exports = app;