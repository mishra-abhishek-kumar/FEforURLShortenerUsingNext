export const formatHeaders = (headers) => {
	return headers.map((header) => {
		// Capitalize the first letter and replace camel case with spaces
		return header
			.split(/(?=[A-Z])/) // Split by capital letters to handle camel case
			.join(" ") // Join the parts with a space
			.replace(/(^\w|\s\w)/g, (m) => m.toUpperCase()) // Capitalize the first letter of each word
			.replace(/([A-Z])([A-Z])/g, "$1 $2") // Add space between uppercase letters if needed
			.trim(); // Remove any leading/trailing whitespace
	});
};
