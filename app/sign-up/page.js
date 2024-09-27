"use client";
import React, { useState } from "react";
// import { userSignUp } from "../../service/authService";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SignUp = () => {
	const route = useRouter();

	const [formData, setFormData] = useState({
		firstname: "",
		lastname: "",
		email: "",
		password: "",
		isAdmin: false,
		dob: "",
		gender: "",
	});

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData({
			...formData,
			[name]: type === "checkbox" ? checked : value,
		});
	};

	const handleSubmit = async (e) => {
		try {
			e.preventDefault();
			const data = {
				firstName: formData.firstname,
				lastName: formData.lastname,
				email: formData.email,
				password: formData.password,
				isAdmin: formData.isAdmin,
				dob: formData.dob,
				gender: formData.gender,
			};

			let response = await userSignUp(data);
			console.log(response.data);
			toast.success("Account created successfully!");

			// Redirect to sign-in after successful signup
			setTimeout(() => {
				route.push("/sign-in");
			}, 2500);
		} catch (error) {
			toast.error("Failed to create an account.");
			console.error("error", error);
		}
	};

	return (
		<div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-300 via-blue-300 to-pink-300">
			<div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
				<h2 className="text-3xl font-bold text-center text-gray-800">
					Create an Account
				</h2>

				<form className="space-y-6" onSubmit={handleSubmit}>
					{/* Firstname Input */}
					<div>
						<label
							htmlFor="firstname"
							className="block text-sm font-medium text-gray-700"
						>
							First Name
						</label>
						<input
							type="text"
							id="firstname"
							name="firstname"
							value={formData.firstname}
							onChange={handleChange}
							className="w-full px-3 py-2 mt-1 border rounded-lg border-gray-300 focus:ring focus:ring-indigo-200"
							placeholder="John"
							required
						/>
					</div>

					{/* Lastname Input */}
					<div>
						<label
							htmlFor="lastname"
							className="block text-sm font-medium text-gray-700"
						>
							Last Name
						</label>
						<input
							type="text"
							id="lastname"
							name="lastname"
							value={formData.lastname}
							onChange={handleChange}
							className="w-full px-3 py-2 mt-1 border rounded-lg border-gray-300 focus:ring focus:ring-indigo-200"
							placeholder="Doe"
							required
						/>
					</div>

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

					{/* Date of Birth (DOB) Input */}
					<div>
						<label
							htmlFor="dob"
							className="block text-sm font-medium text-gray-700"
						>
							Date of Birth
						</label>
						<input
							type="date"
							id="dob"
							name="dob"
							value={formData.dob}
							onChange={handleChange}
							className="w-full px-3 py-2 mt-1 border rounded-lg border-gray-300 focus:ring focus:ring-indigo-200"
							required
						/>
					</div>

					{/* Gender Selection */}
					<div>
						<label
							htmlFor="gender"
							className="block text-sm font-medium text-gray-700"
						>
							Gender
						</label>
						<select
							id="gender"
							name="gender"
							value={formData.gender}
							onChange={handleChange}
							className="w-full px-3 py-2 mt-1 border rounded-lg border-gray-300 focus:ring focus:ring-indigo-200"
							required
						>
							<option value="">Select Gender</option>
							<option value="male">Male</option>
							<option value="female">Female</option>
							<option value="other">Other</option>
						</select>
					</div>

					{/* Is Admin (Checkbox) */}
					<div className="flex items-center">
						<input
							type="checkbox"
							id="isAdmin"
							name="isAdmin"
							checked={formData.isAdmin}
							onChange={handleChange}
							className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring focus:ring-indigo-200"
						/>
						<label
							htmlFor="isAdmin"
							className="ml-2 text-sm font-medium text-gray-700"
						>
							Is Admin?
						</label>
					</div>

					{/* Submit Button */}
					<button
						type="submit"
						className="w-full px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:ring focus:ring-indigo-300"
					>
						Sign Up
					</button>
				</form>
				{/* Sign In Link */}
				<p className="text-center text-sm text-gray-600">
					Already have an account?{" "}
					<Link href="/sign-in" className="text-indigo-600 hover:underline">
						Sign In
					</Link>
				</p>
			</div>
		</div>
	);
};

export default SignUp;
