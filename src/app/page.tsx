import TaskFilters from "@/shared/components/TaskFilters";
import TaskForm from "@/shared/components/TaskForm";
import TaskList from "@/shared/components/TaskList";

export default function Home() {
	return (
		<div className="container mx-auto w-full  min-h-screen p-4">
			<h1 className="text-2xl font-bold text-center mb-8">
				Task Manager
			</h1>
			<TaskForm />
			<TaskFilters />
			<TaskList />
		</div>
	);
}
