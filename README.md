Task Management API

    This is a simple Task Management API built with Express.js that allows you to create, read, update, and delete tasks. The tasks are stored in a JSON file (task.json). This API also supports filtering tasks based on their completion status and sorting them by creation date. Additionally, tasks can be filtered by their priority level.

Features:

Create a new task
Retrieve all tasks
Retrieve a specific task by its ID
Update a task
Delete a task
Filter tasks by their completion status
Sort tasks by their creation date (ascending or descending)
Filter tasks by their priority level (low, medium, high)
Prerequisites
Node.js (v18.x or later)
npm (v9.x or later)

Getting Started

Installation

    Clone the repository:

        git clone https://github.com/DineshKumarRreddy/task-manager.git

        cd task-manager

Install the dependencies:

    npm i

Running the Server

    npm start

The server will start listening on port 3000. You can access the API at http://localhost:3000.

API Endpoints

Get All Tasks

URL: /tasks
Method: GET

Query Parameters:
completed (optional): Filter tasks by completion status (true or false)
sortEle (optional): Element to sort by (date)
order (optional): Sorting order (asc or desc)
Response:
Status: 200 OK
Body: List of all tasks
Get Task by ID

URL: /tasks/:taskId
Method: GET

Response:
Status: 200 OK
Body: The task with the specified ID
Status: 404 Not Found if the task is not found

Create a New Task
URL: /tasks
Method: POST

Body:
title (string): The title of the task
description (string): The description of the task
completed (boolean): The completion status of the task
priority (string): The priority level of the task (low, medium, high)
Response:
Status: 201 Created
Body: The created task
Status: 400 Bad Request if the request body is invalid

Update a Task
URL: /tasks/:taskId
Method: PUT

Body:
title (string): The title of the task
description (string): The description of the task
completed (boolean): The completion status of the task
priority (string): The priority level of the task (low, medium, high)
Response:
Status: 200 OK
Body: The updated task
Status: 404 Not Found if the task is not found
Status: 400 Bad Request if the request body is invalid

Delete a Task
URL: /tasks/:taskId
Method: DELETE

Response:
Status: 200 OK
Body: Message confirming the deletion
Status: 404 Not Found if the task is not found

Filter Tasks by Priority
URL: /tasks/priority/:level
Method: GET

Response:
Status: 200 OK
Body: List of tasks with the specified priority level
Status: 400 Bad Request if the priority level is invalid
