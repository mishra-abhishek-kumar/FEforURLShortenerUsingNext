import axios from "axios";

export const userLogin = async (data) => {
	try {
		const response = await axios.post(
			"http://127.0.0.1:20200/api/v1/login",
			data
		);

		return response;
	} catch (error) {
		console.error(
			"Login failed:",
			error.response ? error.response.data : error.message
		);
	}
};

export const userSignUp = async (data) => {
	try {
		const response = await axios.post(
			"http://127.0.0.1:20200/api/v1/user/",
			data
		);

		return response;
	} catch (error) {
		console.error(
			"SignUp failed:",
			error.response ? error.response.data : error.message
		);
	}
};

export const userLogout = async () => {
	try {
		const token = localStorage.getItem("accessToken");
		const userId = localStorage.getItem("userId");

		const response = await axios.get("http://127.0.0.1:20200/api/v1/logout", {
			headers: {
				Authorization: `Bearer ${token}`,
				UserId: userId, // Sending userId in headers
			},
		});

		return response;
	} catch (error) {
		console.error(
			"Logout failed:",
			error.response ? error.response.data : error.message
		);
	}
};

export const isAdmin = async (headers) => {
	try {
		const token = localStorage.getItem("accessToken");
		if (!token) {
			throw new Error("Unauthorized Access");
		}
		const response = await axios
			.get("http://127.0.0.1:20200/api/v1/isAdmin/", {
				headers: { ...headers, authorization: `Bearer ${token}` },
			})
			.catch((e) => {
				console.log(e);
				throw new Error(e.response.data.message);
			});
		return response;
	} catch (error) {
		throw error;
	}
};

export const isUser = async (headers) => {
	try {
		const token = localStorage.getItem("accessToken");
		if (!token) {
			throw new Error("Unauthorized Access");
		}
		const response = await axios
			.get("http://127.0.0.1:20200/api/v1/isUser/", {
				headers: { ...headers, authorization: `Bearer ${token}` },
			})
			.catch((e) => {
				console.log(e);
				throw new Error(e.response.data.message);
			});

		return response;
	} catch (error) {
		throw error;
	}
};
