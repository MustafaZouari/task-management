import { taskService } from "@/services/taskService";
import { create } from "zustand";

export interface Task {
	id: string;
	title: string;
	completed: boolean;
}

interface TaskState {
	tasks: Task[];
	loading: boolean;
	error: string | null;

	fetchTasks: () => Promise<void>;
	addTask: (title: string) => Promise<void>;
	toggleTaskCompletion: (id: string) => Promise<void>;
	updateTask: (id: string, title: string) => Promise<void>;
	deleteTask: (id: string) => Promise<void>;
	filterTasks: (searchTerm: string) => Task[];
}

export const useTaskStore = create<TaskState>((set) => ({
	tasks: [],
	loading: false,
	error: null,

	fetchTasks: async () => {
		set({ loading: true, error: null });
		try {
			const tasks = await taskService.getTasks();
			set({ tasks });
		} catch (error) {
			console.error("Error fetching tasks:", error);
			set({ error: "Failed to load tasks" });
		} finally {
			set({ loading: false });
		}
	},
	addTask: async (title: string) => {
		if (!title.trim()) {
			set({ error: "Task title cannot be empty" });
			return;
		}

		const newTask: Task = {
			id: Date.now().toString(),
			title,
			completed: false,
		};
		set({ loading: true });
		try {
			await taskService.addTask(newTask);
			const tasks = await taskService.getTasks();
			set({ tasks, error: null });
		} catch (error) {
			console.error("Error adding task:", error);
			set({ error: "Failed to add task" });
		} finally {
			set({ loading: false });
		}
	},

	toggleTaskCompletion: async (id: string) => {
		set({ loading: true });
		try {
			const tasks = await taskService.getTasks();
			const updatedTasks = tasks.map((task) =>
				task.id === id ? { ...task, completed: !task.completed } : task
			);
			await taskService.saveTasks(updatedTasks);
			set({ tasks: updatedTasks, error: null });
		} catch (error) {
			console.error("Error toggling task completion:", error);
			set({ error: "Failed to update task status" });
		} finally {
			set({ loading: false });
		}
	},

	updateTask: async (id: string, title: string) => {
		if (!title.trim()) {
			set({ error: "Task title cannot be empty" });
			return;
		}

		const updatedTask: Task = { id, title, completed: false };
		set({ loading: true });
		try {
			await taskService.updateTask(updatedTask);
			const tasks = await taskService.getTasks();
			set({ tasks, error: null });
		} catch (error) {
			console.error("Error updating task:", error);
			set({ error: "Failed to update task" });
		} finally {
			set({ loading: false });
		}
	},
	deleteTask: async (id: string) => {
		set({ loading: true });
		try {
			await taskService.deleteTask(id);
			const tasks = await taskService.getTasks();
			set({ tasks, error: null });
		} catch (error) {
			console.error("Error deleting task:", error);
			set({ error: "Failed to delete task" });
		} finally {
			set({ loading: false });
		}
	},

	filterTasks: (searchTerm: string): Task[] => {
		const state = useTaskStore.getState();
		if (searchTerm.trim() === "") {
			return [];
		}
		return state.tasks.filter((task) => {
			return task.title.toLowerCase().includes(searchTerm.toLowerCase());
		});
	},
}));
