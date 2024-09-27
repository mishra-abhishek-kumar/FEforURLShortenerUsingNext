import ".././globals.css";

export const metadata = {
	title: "User - Sign-Up",
	description: "URL Shortener sign-Up page",
};

export default function SignUpRootLayout({ children }) {
	return (
		<>
			<Toast />
			{children}
		</>
	);
}
