import { Task } from "@/store/taskStore";

const STORAGE_KEY = "tasks";

export const taskService = {
	getTasks: async (): Promise<Task[]> => {
		try {
			const storedTasks = localStorage.getItem(STORAGE_KEY);
			if (!storedTasks) {
				return [];
			}
			return JSON.parse(storedTasks);
		} catch (error) {
			console.error("Error fetching tasks from LocalStorage:", error);
			return [];
		}
	},
	saveTasks: async (tasks: Task[]): Promise<void> => {
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
		} catch (error) {
			console.error("Error saving tasks to LocalStorage:", error);
		}
	},

	addTask: async (task: Task): Promise<void> => {
		try {
			const tasks = await taskService.getTasks();
			const updatedTasks = [...tasks, task];
			await taskService.saveTasks(updatedTasks);
		} catch (error) {
			console.error("Error adding task:", error);
		}
	},

	updateTask: async (updatedTask: Task): Promise<void> => {
		try {
			const tasks = await taskService.getTasks();
			const updatedTasks = tasks.map((task) =>
				task.id === updatedTask.id ? updatedTask : task
			);
			await taskService.saveTasks(updatedTasks);
		} catch (error) {
			console.error("Error updating task:", error);
		}
	},

	deleteTask: async (taskId: string): Promise<void> => {
		try {
			const tasks = await taskService.getTasks();
			const filteredTasks = tasks.filter((task) => task.id !== taskId);
			await taskService.saveTasks(filteredTasks);
		} catch (error) {
			console.error("Error deleting task:", error);
		}
	},
};
