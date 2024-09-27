import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Toast = () => {
	return (
		<ToastContainer
			hideProgressBar={true}
			closeOnClick={true}
			pauseOnHover={false}
			draggable
			theme="colored"
		/>
	);
};

export default Toast;
