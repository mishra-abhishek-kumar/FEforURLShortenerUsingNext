"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getAllUser } from "../services/userService";
import Tables from "../../components/table/Tables";
import { isAdmin as isAdminService } from "../services/authService";
import { showInformationToast } from "../utils/toastUtils";
import Logout from "../../components/logoutbtn/Logout";

const Dashboard = () => {
	const router = useRouter();
	const searchParams = useSearchParams(); // Reading search params from the URL

	const [data, setData] = useState([]);
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(5);
	const [totalCountOfData, setTotalCountOfData] = useState(0);
	const [isAdmin, setIsAdmin] = useState(false);

	const [firstName, setFirstName] = useState(
		searchParams.get("firstName") || ""
	);
	const [lastName, setLastName] = useState(searchParams.get("lastName") || "");
	const [email, setEmail] = useState(searchParams.get("email") || "");
	const [lowerLimitUrls, setLowerLimitUrls] = useState(
		searchParams.get("lowerLimitUrls") || ""
	);
	const [upperLimitUrls, setUpperLimitUrls] = useState(
		searchParams.get("upperLimitUrls") || ""
	);
	const [flag, setFlag] = useState(false);

	// Check if the user is an admin
	const isAdminCheck = async () => {
		try {
			let isAdmin = await isAdminService();
			if (isAdmin) {
				setIsAdmin(true);
			} else {
				router.push("/"); // Redirect to home if not admin
			}
		} catch (error) {
			showInformationToast("Please login again");
			router.push("/sign-in"); // Redirect to sign-in if error occurs
		}
	};

	// Fetch users
	const getUsers = async () => {
		try {
			let response = await getAllUser({
				limit,
				page,
				firstName,
				lastName,
				email,
				lowerLimitUrls,
				upperLimitUrls,
			});

			let updatedData = response.data.map((user) => ({
				...user,
				info: (
					<button
						className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600"
						onClick={() => router.push(`/url/${user.id}`)} // Use Next.js router
					>
						View
					</button>
				),
			}));
			setData(updatedData);
			setTotalCountOfData(response?.headers["x-total-count"]);
		} catch (error) {
			alert(error.message);
		}
	};

	useEffect(() => {
		isAdminCheck();
	}, []);

	useEffect(() => {
		getUsers();
	}, [limit, page, flag]);

	// Update the URL with search params
	const handleSearchParamsUpdate = () => {

		const params = new URLSearchParams({
			firstName,
			lastName,
			email,
			lowerLimitUrls,
			upperLimitUrls,
			limit,
			page: 1,
		});

		// Update the URL with the new search params
		router.push(`?${params.toString()}`);
	};

	const handleReset = () => {
		setFirstName("");
		setLastName("");
		setEmail("");
		setLowerLimitUrls("");
		setUpperLimitUrls("");
		setFlag((prev) => !prev); // Trigger refetch
		router.push("/dashboard"); // Clear search params from the URL
	};

	return (
		<>
			{isAdmin && (
				<>
					<Logout />

					<div className="flex items-start justify-center max-h-fit pt-16">
						<h2 className="text-3xl font-bold text-center mb-6 text-gray-700">
							Welcome, Abhishek
						</h2>
					</div>

					<form
						onSubmit={(e) => {
							e.preventDefault();
							setPage(1);
							handleSearchParamsUpdate(); // Update search params on submit
							getUsers(); // Fetch new users
						}}
						className="flex items-center px-5"
					>
						<div className="grid gap-6 mb-6 md:grid-cols-5 mt-10">
							{/* First Name */}
							<div>
								<input
									type="text"
									id="first_name"
									className="bg-white border border-gray-300 text-sm rounded-lg p-2.5"
									placeholder="FIRSTNAME"
									onChange={(e) => setFirstName(e.target.value)}
									value={firstName}
								/>
							</div>

							{/* Last Name */}
							<div>
								<input
									type="text"
									id="last_name"
									className="bg-white border border-gray-300 text-sm rounded-lg p-2.5"
									placeholder="LASTNAME"
									onChange={(e) => setLastName(e.target.value)}
									value={lastName}
								/>
							</div>

							{/* Email */}
							<div>
								<input
									type="email"
									id="email"
									className="bg-white border border-gray-300 text-sm rounded-lg p-2.5"
									placeholder="EMAIL"
									onChange={(e) => setEmail(e.target.value)}
									value={email}
								/>
							</div>

							{/* Lower Limit URLs */}
							<div>
								<input
									type="text"
									id="lower_limit_url"
									className="bg-white border border-gray-300 text-sm rounded-lg p-2.5"
									placeholder="LOWER LIMIT OF URLs"
									onChange={(e) => setLowerLimitUrls(e.target.value)}
									value={lowerLimitUrls}
								/>
							</div>

							{/* Upper Limit URLs */}
							<div>
								<input
									type="text"
									id="upper_limit_url"
									className="bg-white border border-gray-300 text-sm rounded-lg p-2.5"
									placeholder="UPPER LIMIT OF URLs"
									onChange={(e) => setUpperLimitUrls(e.target.value)}
									value={upperLimitUrls}
								/>
							</div>

							<button
								type="submit"
								className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600"
							>
								SUBMIT
							</button>
							<button
								type="button"
								onClick={handleReset}
								className="bg-transparent border border-gray-300 text-gray-900 py-2 px-4 rounded-lg shadow-md hover:bg-gray-100"
							>
								RESET
							</button>
						</div>
					</form>

					<Tables
						data={data}
						page={page}
						limit={limit}
						setLimit={setLimit}
						setPage={setPage}
						totalCountOfData={totalCountOfData}
					/>
				</>
			)}
		</>
	);
};

export default Dashboard;
