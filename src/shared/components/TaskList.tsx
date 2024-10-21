"use client";

import { Task, useTaskStore } from "@/store/taskStore";
import React, { useEffect } from "react";

const TaskList: React.FC = () => {
	const { tasks, fetchTasks, toggleTaskCompletion, deleteTask } =
		useTaskStore();

	const loading = useTaskStore((state) => state.loading);

	useEffect(() => {
		fetchTasks();
	}, [fetchTasks]);

	return (
		<div className=" rounded-lg    p-6">
			<h2 className="text-2xl font-semibold mb-6">Tasks</h2>
			{loading && <p className="text-blue-500">Loading...</p>}

			{!loading && tasks.length === 0 ? (
				<p className="text-gray-500">No tasks available</p>
			) : (
				tasks.map((task: Task) => (
					<div
						key={task.id}
						className={`flex justify-between items-center p-4 mb-4 rounded-lg shadow-sm bg-gradient-to-r ${
							task.completed
								? "from-green-400 to-green-600 text-white"
								: "from-white to-gray-50"
						}`}
					>
						<div className="flex items-center gap-4  ">
							<input
								type="checkbox"
								checked={task.completed}
								onChange={() => toggleTaskCompletion(task.id)}
								className="h-6 w-6 text-green-500 rounded focus:ring-2 focus:ring-green-400 transition"
							/>
							<span
								className={`${
									task.completed
										? "line-through text-gray-300"
										: "text-gray-800"
								} text-lg font-medium`}
							>
								{task.title}
							</span>
						</div>
						<button
							onClick={() => deleteTask(task.id)}
							className="text-red-500 hover:text-red-600 transition font-semibold"
						>
							Delete
						</button>
					</div>
				))
			)}
		</div>
	);
};

export default TaskList;
