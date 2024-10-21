This is a simple Task Management App built using Next.js, Zustand for state management, TypeScript, and LocalStorage for data persistence. Users can add, update, delete, complete, and filter tasks. All tasks are stored locally in the browser's LocalStorage.

Installation

1. Clone the Repository

git clone https://github.com/your-username/task-management-app.git
cd task-management-app
npm install
npm run dev
Open http://localhost:3000

The api Interactions were simulated using localStorage, We can add, fetch, delete, modify the data through the service layer.

First thing the data gets modified in local storage through the taskService. after that i used the updated data in local storage to update the global state in the application if needed.

Errors are handled both during local storage operations and also state update, in case of any error an error will be shown to the user, and some of the edge cases are handled by disabling the form and showing a loading state, this way we ensure that only one task is processed at a time, improving both stability and user experience.
