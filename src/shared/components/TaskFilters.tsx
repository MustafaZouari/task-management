"use client";

import { Task, useTaskStore } from "@/store/taskStore";
import React, { useState } from "react";

const TaskFilters: React.FC = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const { filterTasks } = useTaskStore();

	const filteredTasks: Task[] = filterTasks(searchTerm);
	console.log(filteredTasks, "GF");
	console.log(searchTerm, "FF");

	return (
		<div className="mb-6">
			<input
				type="text"
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				placeholder="Search tasks..."
				className="rounded-xl px-4 my-10 py-3 w-full mb-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
			/>
			{filteredTasks.length > 0 ? (
				<ul className="bg-white rounded-lg shadow-md p-6 border border-black ">
					{filteredTasks.map((task: Task) => (
						<li key={task.id} className="text-lg mb-2">
							{task.title}
						</li>
					))}
				</ul>
			) : (
				<p className="text-gray-500">No tasks found</p>
			)}
		</div>
	);
};

export default TaskFilters;
