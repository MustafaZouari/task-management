export const loadFromLocalStorage = (key: string) => {
	if (typeof window !== "undefined") {
		const data = localStorage.getItem(key);
		return data ? JSON.parse(data) : null;
	}
	return null;
};

export const saveToLocalStorage = (key: string, data: unknown) => {
	if (typeof window !== "undefined") {
		localStorage.setItem(key, JSON.stringify(data));
	}
};
