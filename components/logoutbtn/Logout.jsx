import React, { useState, useEffect, useRef } from "react";
import { UserIcon } from "@heroicons/react/solid"; // Importing Heroicons user icon
import { userLogout } from "../../app/services/authService";
import { showSuccessToast } from "../../app/utils/toastUtils";
import { isAdmin as isAdminService } from "../../app/services/authService";
import { useRouter } from "next/navigation";

const Logout = () => {
	const router = useRouter();
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const dropdownRef = useRef(null);
	const [isAdmin, setisAdmin] = useState(false);

	// Toggle dropdown visibility
	const toggleDropdown = () => {
		isAdminCheck();
		setDropdownOpen(!dropdownOpen);
	};

	// Close dropdown if clicked outside
	const handleClickOutside = (event) => {
		if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
			setDropdownOpen(false);
		}
	};

	const logoutUser = async () => {
		try {
			const response = await userLogout();
			if (!response?.data) {
				throw new Error("yash shah");
			}
			localStorage.clear();

			showSuccessToast("Logged out successfully");
			setTimeout(() => {
				router.push("/");
			}, 1000);
		} catch (error) {
			alert(error.message);
		}
	};

	const isAdminCheck = async () => {
		try {
			let isAdmin = await isAdminService();
			if (isAdmin) {
				setisAdmin(true);
			}
		} catch (error) {
			setisAdmin(false);
		}
	};

	const handleClick = (event) => {
		const innerText = event.target.innerText;

		if (innerText == "Edit Parameters") {
			router.push("/edit-parameters");
		}
		if (innerText == "Buy Premium") {
			router.push("/buy-premium");
		}
	};

	// Add event listener for clicks outside
	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<div className="relative">
			{/* Logout button with user icon, white background, black border */}
			<button
				className="absolute top-20 right-5 bg-white text-black p-2 rounded-full border-2 border-black hover:bg-gray-100 z-50 flex items-center justify-center"
				onClick={toggleDropdown}
			>
				<UserIcon className="h-6 w-6 text-black" /> {/* Black user icon */}
			</button>

			{/* Dropdown menu */}
			{dropdownOpen && (
				<div
					ref={dropdownRef}
					className="absolute top-28 right-7 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg z-50"
				>
					<ul>
						<li
							className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
							onClick={handleClick}
						>
							{isAdmin ? "Edit Parameters" : "Buy Premium"}
						</li>
						<li
							className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
							onClick={logoutUser}
						>
							Logout
						</li>
					</ul>
				</div>
			)}
		</div>
	);
};

export default Logout;
