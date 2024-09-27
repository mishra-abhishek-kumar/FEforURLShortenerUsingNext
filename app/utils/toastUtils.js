import { toast } from "react-toastify";

// Success Toast Wrapper
export const showSuccessToast = (message) => {
	toast.success(message, {
		autoClose: 3000,
	});
};

// Error Toast Wrapper
export const showErrorToast = (message) => {
	toast.error(message, {
		autoClose: 3000,
	});
};

// Warning Toast Wrapper
export const showWarningToast = (message) => {
	toast.success(message, {
		autoClose: 3000,
	});
};

// Information Toast Wrapper
export const showInformationToast = (message) => {
	toast.error(message, {
		autoClose: 3000,
	});
};
