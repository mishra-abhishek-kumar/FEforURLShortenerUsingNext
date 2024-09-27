"use client";
import React, { useEffect, useRef, useState } from "react";
import { isUser as isUserService } from "../services/authService";
import { useRouter } from "next/navigation";
import {
	showErrorToast,
	showInformationToast,
	showSuccessToast,
} from "../utils/toastUtils";
import {
	getAdminParameters,
	getShortUrlID,
	makePAymentForAdditionalURLVisits,
	makePaymentForAdditonalUrls,
} from "../services/userService";

const BuyPremium = () => {
	const [isUser, setIsUSer] = useState(false);
	const router = useRouter();

	const [amtForExtraUrl, setAmountForExtraUrl] = useState("");
	const [extraUrlGranted, setExtraUrlGranted] = useState("");
	const [amtForExtraUrlHits, setAmountForExtraUrlHits] = useState("");
	const [extraUrlHits, setExtraUrlHits] = useState("");
	const urlInfo = useRef();

	const isUserCheck = async () => {
		try {
			let isUser = await isUserService();
			if (isUser) {
				setIsUSer(true);
				return;
			}
			router.push("/");
		} catch (error) {
			showInformationToast("Please login again");
			router.push("/sign-in");
		}
	};

	const getParameters = async () => {
		try {
			let response = await getAdminParameters({});

			if (response?.data) {
				setAmountForExtraUrl(response?.data?.amtForExtraUrls);
				setExtraUrlGranted(response?.data?.extraUrlGranted);
				setAmountForExtraUrlHits(response?.data?.amtForExtraVisit);
				setExtraUrlHits(response?.data?.extraVisitsGranted);
			}
		} catch (error) {
			alert(error.message);
		}
	};

	const handlePaymentForExtraUrls = () => {
		const data = {
			paymentFor: "Buying more no of URLs",
			amountPaid: amtForExtraUrl,
			paymentTime: new Date(),
		};

		makePaymentForAdditonalUrl(data);
	};

	const makePaymentForAdditonalUrl = async (data) => {
		try {
			const response = await makePaymentForAdditonalUrls(data);
			if (response?.data) {
				showSuccessToast("Payment Done Successfully");
				setTimeout(() => {
					router.push("/user-dashboard");
				}, 1000);
			}
		} catch (error) {
			alert(error.message);
		}
	};

	const handlePaymentForMoreURLVisit = async () => {
		try {
			const inputUrlInfo = urlInfo.current.value;

			const response = await getShortUrlID(inputUrlInfo);
			if (!response) {
				showErrorToast("ShortUrl Entered is incorrect");
				throw new Error("ShortUrl Entered is incorrect");
			}

			const urlIdFromResponse = response.data;

			const data = {
				paymentFor: "Buying more visits for URL",
				amountPaid: amtForExtraUrlHits,
				paymentTime: new Date(),
				urlId: urlIdFromResponse, // Use the response directly here
			};


			makePAymentForAdditionalURLVisit(data);
		} catch (error) {
			console.log(error.message);
		}
	};

	const makePAymentForAdditionalURLVisit = async (data) => {
		try {
			const response = await makePAymentForAdditionalURLVisits(data);
			if (response?.data) {
				showSuccessToast("Payment Done Successfully");
				setTimeout(() => {
					router.push("/user-dashboard");
				}, 1000);
			}
		} catch (error) {
			alert(error.message);
		}
	};

	useEffect(() => {
		isUserCheck();
		getParameters();
	}, []);

	return (
		<div className="flex justify-center items-center h-screen bg-white-100">
			{/* Container for both cards */}
			<div className="flex justify-center  space-x-28">
				{/* Card 1: Buy more URLs */}
				<div className="bg-white p-16 rounded-xl shadow-lg w-1/3">
					<h2 className="text-4xl font-semibold text-gray-800 mb-6">
						Buy More URLs
					</h2>
					<p className="text-gray-600 mb-8">
						With a one-time payment of <strong>₹{amtForExtraUrl}</strong>, you
						will get
						<strong> {extraUrlGranted} extra URLs</strong> for shortening!
					</p>
					<button
						className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition duration-300"
						onClick={handlePaymentForExtraUrls}
					>
						Buy Extra URLs
					</button>
				</div>

				{/* Card 2: Buy more visits for a URL */}
				<div className="bg-white p-16 rounded-xl shadow-lg w-1/3">
					<h2 className="text-4xl font-semibold text-gray-800 mb-6">
						Buy More Visits for a URL
					</h2>
					<p className="text-gray-600 mb-8">
						For just <strong>₹{amtForExtraUrlHits}</strong>, get{" "}
						<strong>{extraUrlHits} extra visits</strong> for an individual URL.
					</p>

					{/* Input field to add a URL */}
					<div className="mb-6">
						<label
							htmlFor="urlInput"
							className="block text-lg font-medium text-gray-600 mb-2"
						>
							Enter Short URL:
						</label>
						<input
							ref={urlInfo}
							id="urlInput"
							type="text"
							placeholder="Enter the Short URL here"
							className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
						/>
					</div>

					{/* Button to make payment */}
					<button
						className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition duration-300"
						onClick={handlePaymentForMoreURLVisit}
					>
						Buy Extra Visits
					</button>
				</div>
			</div>
		</div>
	);
};

export default BuyPremium;
