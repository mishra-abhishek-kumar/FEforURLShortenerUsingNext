import React from "react";

const Limit = ({ setLimit }) => {
	return (
		<>
			<form className="max-w-sm mx-auto">
				<select
					name="users"
					id="users"
					onChange={(e) => {
						setLimit(e.target.value);
					}}
					defaultValue="5"
					className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 dark:focus:border-blue-500"
				>
					<option value="5">5</option>
					<option value="10">10</option>
					<option value="20">20</option>
				</select>
			</form>
		</>
	);
};

export default Limit;
