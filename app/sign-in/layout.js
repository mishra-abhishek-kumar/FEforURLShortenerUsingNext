import Toast from "@/components/toast";
import ".././globals.css";

export const metadata = {
	title: "User - Sign-In",
	description: "URL Shortener sign-In page",
};

export default function SignInRootLayout({ children }) {
	return (
		<>
			<Toast />
			{children}
		</>
	);
}
