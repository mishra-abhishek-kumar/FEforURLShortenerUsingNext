import axios from "axios";

export const getAllUser = async (params, headers) => {
	try {
		const token = localStorage.getItem("accessToken");
		if (!token) {
			throw new Error("Unauthorized Access");
		}
		const response = await axios
			.get("http://127.0.0.1:20200/api/v1/user/", {
				params,
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

export const getUserURLsforAdmin = async (userId, params, headers) => {
	try {
		const token = localStorage.getItem("accessToken");
		if (!token) {
			throw new Error("Unauthorized Access");
		}
		const response = await axios
			.get(`http://127.0.0.1:20200/api/v1/url/${userId}`, {
				params,
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

export const getUserURLs = async (params, headers) => {
	try {
		const token = localStorage.getItem("accessToken");
		const userId = localStorage.getItem("userId");
		if (!token) {
			throw new Error("Unauthorized Access");
		}

		const response = await axios
			.get(`http://127.0.0.1:20200/api/v1/url/${userId}`, {
				params,
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

export const createShortUrl = async (inputUrl) => {
	try {
		const token = localStorage.getItem("accessToken");
		const userId = localStorage.getItem("userId");

		if (!token) {
			throw new Error("Unauthorixed Access");
		}

		const response = await axios
			.post(
				`http://127.0.0.1:20200/api/v1/url/${userId}`,
				{ longUrl: inputUrl },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			.catch((e) => {
				console.log(e);
				throw new Error(e.response.data.message);
			});
		return response;
	} catch (error) {
		throw error;
	}
};

export const updateUserParameters = async (data) => {
	try {
		const token = localStorage.getItem("accessToken");
		const userId = localStorage.getItem("userId");

		const response = await axios.post(
			"http://127.0.0.1:20200/api/v1/updateParameter/",
			data,
			{
				headers: {
					Authorization: `Bearer ${token}`,
					UserId: userId, // Sending userId in headers
				},
			}
		);
		return response;
	} catch (error) {
		console.error(
			"Updation failed:",
			error.response ? error.response.data : error.message
		);
	}
};

export const getAdminParameters = async () => {
	try {
		const token = localStorage.getItem("accessToken");
		if (!token) {
			throw new Error("Unauthorized Access");
		}

		const response = await axios.get(
			"http://127.0.0.1:20200/api/v1/user/getParameter",
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);

		return response;
	} catch (error) {
		throw error;
	}
};

export const makePaymentForAdditonalUrls = async (data) => {
	try {
		const token = localStorage.getItem("accessToken");
		const userId = localStorage.getItem("userId");

		const updatedData = { ...data, userId: userId };

		const response = await axios.post(
			"http://127.0.0.1:20200/api/v1/user/additonal-url-payment/",
			updatedData,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);

		return response;
	} catch (error) {
		console.error(
			"Payment failed:",
			error.response ? error.response.data : error.message
		);
	}
};

export const getShortUrlID = async (shortUrl) => {
	try {
		const token = localStorage.getItem("accessToken");
		const userId = localStorage.getItem("userId");

		const parts = shortUrl.split("/");
		const lastSegment = parts[parts.length - 1];

		const response = await axios.get(
			`http://127.0.0.1:20200/api/v1/shorturl/${lastSegment}`,
			{
				headers: { authorization: `Bearer ${token}` },
			}
		);

		return response;
	} catch (error) {
		console.error(
			"Cannot find shortUrl:",
			error.response ? error.response.data : error.message
		);
	}
};

export const makePAymentForAdditionalURLVisits = async (data) => {
	try {
		const token = localStorage.getItem("accessToken");
		const userId = parseInt(localStorage.getItem("userId"));

		const updatedData = { ...data, userId: userId };

		console.log("updatedData>>>>>", updatedData);

		const response = await axios.post(
			"http://127.0.0.1:20200/api/v1/additonal-url-visit-payment/",
			updatedData,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);

		return response;
	} catch (error) {
		console.error(
			"Payment failed:",
			error.response ? error.response.data : error.message
		);
	}
};
