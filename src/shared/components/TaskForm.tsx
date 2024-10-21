"use client";

import { useTaskStore } from "@/store/taskStore";
import React, { useState } from "react";

const TaskForm: React.FC = () => {
	const [title, setTitle] = useState("");
	const { addTask } = useTaskStore();
	const error = useTaskStore((state) => state.error);
	const loading = useTaskStore((state) => state.loading);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (title) {
			await addTask(title);
			setTitle("");
		}
	};

	return (
		<div>
			<form
				onSubmit={handleSubmit}
				className="flex flex-col md:flex-row gap-4 mb-6"
			>
				<input
					type="text"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					disabled={loading}
					placeholder="Add a new task..."
					className="border border-gray-300 rounded-xl px-4 py-3 flex-1 shadow-sm text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
				/>
				<button
					type="submit"
					disabled={loading}
					className="bg-indigo-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-indigo-600 shadow-lg transition"
				>
					{loading ? "Adding..." : "Add Task"}
				</button>
			</form>
			{error && <p className="text-red-500">{error}</p>}
		</div>
	);
};

export default TaskForm;
