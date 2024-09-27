"use client";

import { useRouter } from "next/navigation";

const Home = () => {
	const route = useRouter();

	return (
		<div className="min-h-screen flex flex-col">
			{/* Header */}
			<header className="bg-white shadow w-full py-4 px-8 flex justify-between items-center">
				<h1 className="text-3xl font-bold text-blue-600">URL Shortener</h1>
				<div>
					<button
						className="mr-4 text-blue-600 hover:text-blue-800 font-semibold"
						onClick={() => route.push("/sign-in")}
					>
						Login
					</button>
					<button
						className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
						onClick={() => route.push("/sign-up")}
					>
						Sign Up
					</button>
				</div>
			</header>

			{/* Hero Section */}
			<section className="flex-grow flex flex-col justify-center items-center text-center py-16">
				<h2 className="text-4xl font-bold text-gray-800">
					Simplify & Track Your URLs Effortlessly
				</h2>
				<p className="text-gray-600 mt-4">
					Manage, track, and shorten your URLs to boost your online presence.
				</p>
				<button
					className="mt-6 bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
					onClick={() => route.push("/sign-in")}
				>
					Get Started
				</button>
			</section>

			{/* Features Section */}
			<section className="py-16 bg-white">
				<h3 className="text-center text-2xl font-bold mb-8">Key Features</h3>
				<div className="flex justify-around">
					<div className="w-1/4 text-center">
						<i className="fas fa-link text-blue-600 text-4xl"></i>
						<h4 className="text-xl font-bold mt-4">Custom Short URLs</h4>
						<p className="text-gray-600 mt-2">
							Make your URLs professional and memorable with custom aliases.
						</p>
					</div>
					<div className="w-1/4 text-center">
						<i className="fas fa-chart-line text-blue-600 text-4xl"></i>
						<h4 className="text-xl font-bold mt-4">Analytics & Tracking</h4>
						<p className="text-gray-600 mt-2">
							Monitor clicks and user behavior with advanced analytics.
						</p>
					</div>
					<div className="w-1/4 text-center">
						<i className="fas fa-qrcode text-blue-600 text-4xl"></i>
						<h4 className="text-xl font-bold mt-4">QR Code Generation</h4>
						<p className="text-gray-600 mt-2">
							Generate QR codes for offline sharing.
						</p>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className="bg-gray-800 text-white py-4 text-center mt-auto">
				<p>&copy; 2024 URL Shortener. All rights reserved.</p>
			</footer>
		</div>
	);
};

export default Home;
