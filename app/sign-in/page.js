"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { userLogin } from "../services/authService";
import { showErrorToast, showSuccessToast } from "../utils/toastUtils";
import { isAdmin as isAdminService } from "../services/authService";

const SignIn = () => {
	const route = useRouter();
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const [isAdmin, setIsAdmin] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	// Check if the user is an admin
	const isAdminCheck = async () => {
		try {
			const isAdmin = await isAdminService();
			setIsAdmin(isAdmin);
			return isAdmin;
		} catch (error) {
			return false;
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			// Log in the user
			let response = await userLogin(formData);

			// Store the token in localStorage
			localStorage.setItem("accessToken", response.data.token);
			localStorage.setItem("userId", response.data.userId);

			// Check if the user is an admin
			const isAdmin = await isAdminCheck();

			showSuccessToast("Logged in successfully");

			setTimeout(() => {
				if (isAdmin) {
					route.push("/dashboard");
				} else {
					route.push("/user-dashboard");
				}
			}, 1000);
		} catch (error) {
			const errorMessage =
				error.response && error.response.data
					? error.response.data.message
					: "Failed to log in";
			showErrorToast(errorMessage);
		}
	};

	return (
		<div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-300 via-blue-300 to-pink-300">
			<div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
				<h2 className="text-3xl font-bold text-center text-gray-800">
					Sign In
				</h2>

				<form className="space-y-6" onSubmit={handleSubmit}>
					{/* Email Input */}
					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium text-gray-700"
						>
							Email
						</label>
						<input
							type="email"
							id="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							className="w-full px-3 py-2 mt-1 border rounded-lg border-gray-300 focus:ring focus:ring-indigo-200"
							placeholder="you@example.com"
							required
						/>
					</div>

					{/* Password Input */}
					<div>
						<label
							htmlFor="password"
							className="block text-sm font-medium text-gray-700"
						>
							Password
						</label>
						<input
							type="password"
							id="password"
							name="password"
							value={formData.password}
							onChange={handleChange}
							className="w-full px-3 py-2 mt-1 border rounded-lg border-gray-300 focus:ring focus:ring-indigo-200"
							placeholder="••••••••"
							required
						/>
					</div>

					{/* Submit Button */}
					<button
						type="submit"
						className="w-full px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:ring focus:ring-indigo-300"
					>
						Sign In
					</button>
				</form>

				{/* Sign Up Link */}
				<p className="text-center text-sm text-gray-600">
					Don't have an account?{" "}
					<Link href="/sign-up" className="text-indigo-600 hover:underline">
						Sign Up
					</Link>
				</p>
			</div>
		</div>
	);
};

export default SignIn;
