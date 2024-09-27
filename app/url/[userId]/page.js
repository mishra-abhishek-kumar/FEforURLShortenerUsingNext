"use client"; // To specify client-side rendering

import React, { useEffect, useState } from "react";
import { getUserURLsforAdmin } from "../../services/userService";
import Tables from "../../../components/table/Tables";
import { usePathname, useRouter, useSearchParams } from "next/navigation"; // Next.js hooks for routing
import { isAdmin as isAdminService } from "../../services/authService";

const User = () => {
	const router = useRouter(); // useRouter from Next.js
	const pathname = usePathname();
	const searchParams = useSearchParams(); // To manage query params in Next.js
	const [userId, setUserId] = useState(pathname.split("/").pop()); // Fetching dynamic route param
	const [isAdmin, setisAdmin] = useState(false);
	const [data, setData] = useState([]);
	const [page, setPage] = useState(() => searchParams.get("page") || 1);
	const [limit, setLimit] = useState(() => searchParams.get("limit") || 5);
	const [totalCountOfData, setTotalCountOfData] = useState();

	// Fetch URL filters from search params
	const [longUrl, setLongUrl] = useState(
		() => searchParams.get("longUrl") || ""
	);
	const [shortUrl, setShortUrl] = useState(
		() => searchParams.get("shortUrl") || ""
	);
	const [lowerLimit, setLowerLimit] = useState(
		() => searchParams.get("lowerLimit") || ""
	);
	const [upperLimit, setUpperLimit] = useState(
		() => searchParams.get("upperLimit") || ""
	);
	const [isRenewed, setIsRenewed] = useState(
		() => searchParams.get("isRenewed") || ""
	);
	const [isExpired, setIsExpired] = useState(
		() => searchParams.get("isExpired") || ""
	);
	const [flag, setFlag] = useState(false);

	// Check if the user is an admin
	const isAdminCheck = async () => {
		try {
			let isAdmin = await isAdminService();
			if (isAdmin) {
				setisAdmin(true);
				return;
			}
			router.push("/"); // Redirect to home if not admin
		} catch (error) {
			router.push("/");
		}
	};

	// Fetch URLs based on user filters and pagination
	const getUrls = async (userId) => {
		try {
			let response = await getUserURLsforAdmin(
				userId,
				{
					limit,
					page,
					longUrl,
					shortUrl,
					lowerLimit,
					upperLimit,
					isRenewed,
					isExpired,
				},
				{}
			);
			setData(response?.data);
			setTotalCountOfData(response?.headers["x-total-count"]);
		} catch (error) {
			alert(error.message);
		}
	};

	useEffect(() => {
		isAdminCheck();
	}, []);

	// Listen for searchParams changes and update state
	useEffect(() => {
		setPage(() => searchParams.get("page") || 1);
		setLimit(() => searchParams.get("limit") || 5);
		setLongUrl(() => searchParams.get("longUrl") || "");
		setShortUrl(() => searchParams.get("shortUrl") || "");
		setLowerLimit(() => searchParams.get("lowerLimit") || "");
		setUpperLimit(() => searchParams.get("upperLimit") || "");
		setIsRenewed(() => searchParams.get("isRenewed") || "");
		setIsExpired(() => searchParams.get("isExpired") || "");
	}, [searchParams]); // Re-run the effect when searchParams change

	useEffect(() => {
		if (userId) {
			getUrls(userId);
		}
	}, [userId, limit, page, flag]);

	const handleReset = (e) => {
		e.preventDefault();
		setLongUrl("");
		setShortUrl("");
		setLowerLimit("");
		setUpperLimit("");
		setIsRenewed("");
		setIsExpired("");
		router.replace(`/url/${userId}`); // Reset URL parameters
		setFlag((prev) => !prev); // Trigger refetch
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setPage(1);
		const queryParams = {
			longUrl,
			shortUrl,
			lowerLimit,
			upperLimit,
			isRenewed,
			isExpired,
			limit,
			page: 1,
		};

		// Construct the URL with query parameters
		const urlWithParams = `${pathname}?${new URLSearchParams(
			queryParams
		).toString()}`;
		router.replace(urlWithParams); // Set the URL with query parameters
		getUrls(userId); // Trigger API call with new params
	};

	return (
		<>
			<form onSubmit={handleSubmit} className="flex items-center px-5">
				<div className="grid gap-6 mb-6 md:grid-cols-6 mt-10">
					<div>
						<input
							type="text"
							id="long_url"
							className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
							placeholder="LONGURL"
							onChange={(e) => setLongUrl(e.target.value)}
							value={longUrl}
						/>
					</div>
					<div>
						<input
							type="text"
							id="short_url"
							className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
							placeholder="SHORTURL"
							onChange={(e) => setShortUrl(e.target.value)}
							value={shortUrl}
						/>
					</div>
					<div>
						<input
							type="text"
							id="no_of_times_visited"
							className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
							placeholder="LOWER LIMIT OF NOOFTIMESVISITED"
							onChange={(e) => setLowerLimit(e.target.value)}
							value={lowerLimit}
						/>
					</div>
					<div>
						<input
							type="text"
							id="lower_limit_url"
							className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
							placeholder="UPPER LIMIT OF NOOFTIMESVISITED"
							onChange={(e) => setUpperLimit(e.target.value)}
							value={upperLimit}
						/>
					</div>
					<div>
						<input
							type="text"
							id="is_renewed"
							className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
							placeholder="ISRENEWED"
							onChange={(e) => setIsRenewed(e.target.value)}
							value={isRenewed}
						/>
					</div>
					<div>
						<input
							type="text"
							id="is_expired"
							className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
							placeholder="ISEXPIRED"
							onChange={(e) => setIsExpired(e.target.value)}
							value={isExpired}
						/>
					</div>

					<button
						type="submit"
						className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 active:bg-blue-700"
					>
						SUBMIT
					</button>
					<button
						onClick={handleReset}
						className="bg-transparent border border-gray-300 text-gray-900 py-2 px-4 rounded-lg shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 active:bg-gray-200"
					>
						RESET
					</button>
				</div>
			</form>

			<Tables data={data} totalCountOfData={totalCountOfData} />
		</>
	);
};

export default User;
