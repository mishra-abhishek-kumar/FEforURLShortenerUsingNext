"use client";
import React, { useRef, useEffect, useState } from "react";
import { isAdmin as isAdminService } from "../services/authService";
import { showInformationToast, showSuccessToast } from "../utils/toastUtils";
import { updateUserParameters } from "../services/userService";
import { useRouter } from "next/navigation";

const EditParameters = () => {
	const router = useRouter();
	const [isAdmin, setIsAdmin] = useState(false);
	const formRef = useRef(); // Single ref for the form

	const isAdminCheck = async () => {
		try {
			let isAdmin = await isAdminService();
			if (isAdmin) {
				setIsAdmin(true);
				return;
			}
			navigation("/");
		} catch (error) {
			showInformationToast("Please login again");
			router.push("/sign-in");
		}
	};

	// Submit handler
	const handleSubmit = (e) => {
		e.preventDefault();

		// Accessing form data
		const formData = new FormData(formRef.current);

		// Extracting values from the form using field names
		const data = {
			freeVisits: formData.get("freeVisits"),
			extraVisitPayment: formData.get("extraVisitPayment"),
			extraVisits: formData.get("extraVisits"),
			urlPayment: formData.get("urlPayment"),
			extraUrls: formData.get("extraUrls"),
		};

		updateParameters(data);
	};

	const updateParameters = async (data) => {
		try {
			const response = await updateUserParameters(data);
			if (response?.data) {
				showSuccessToast("Successfully updated user parameters");
				setTimeout(() => {
					router.push("/dashboard");
				}, 1000);
				formRef.current.reset();
			}
		} catch (error) {
			alert(error.message);
		}
	};

	useEffect(() => {
		isAdminCheck();
	}, []);

	return (
		<>
			{isAdmin && (
				<div className="flex justify-center items-center h-screen bg-white-100">
					<form
						ref={formRef}
						className="bg-white p-8 rounded-xl shadow-md w-full max-w-lg mx-auto"
						onSubmit={handleSubmit}
					>
						<h2 className="text-3xl font-semibold mb-8 text-center text-gray-800">
							URL Visit and Payment Settings
						</h2>

						{/* Input fields with 'name' attributes */}
						<div className="mb-6">
							<label className="block text-lg font-medium text-gray-600 mb-2">
								Free Visits Allowed Per URL
							</label>
							<input
								name="freeVisits"
								type="number"
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
								placeholder="E.g., 5"
							/>
						</div>

						<div className="mb-6">
							<label className="block text-lg font-medium text-gray-600 mb-2">
								Payment Amount for Extra Visits
							</label>
							<input
								name="extraVisitPayment"
								type="number"
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
								placeholder="E.g., 10.00 (in Rupees)"
							/>
						</div>

						<div className="mb-6">
							<label className="block text-lg font-medium text-gray-600 mb-2">
								Extra Visits Granted After Payment
							</label>
							<input
								name="extraVisits"
								type="number"
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
								placeholder="E.g., 100"
							/>
						</div>

						<div className="mb-6">
							<label className="block text-lg font-medium text-gray-600 mb-2">
								Payment Amount for Additional URLs
							</label>
							<input
								name="urlPayment"
								type="number"
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
								placeholder="E.g., 25.00 (in Rupees)"
							/>
						</div>

						<div className="mb-6">
							<label className="block text-lg font-medium text-gray-600 mb-2">
								Extra URLs Granted After Payment
							</label>
							<input
								name="extraUrls"
								type="number"
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
								placeholder="E.g., 10"
							/>
						</div>

						{/* Submit button */}
						<button
							type="submit"
							className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
						>
							Submit
						</button>
					</form>
				</div>
			)}
		</>
	);
};

export default EditParameters;
