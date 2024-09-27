import React from "react";
import Pagination from "./Pagination";
import { formatHeaders } from "../../app/utils/tableHeaderSanitize";

const Tables = ({ data, page, limit, setLimit, setPage, totalCountOfData }) => {
	if (data.length === 0) {
		return <p className="text-center p-4">No data available</p>;
	}

	// Get table headers dynamically from the object keys
	const headers = data.length > 0 ? Object.keys(data[0]) : [];
	const updatedHeaders = formatHeaders(headers);

	return (
		<div className="relative px-5 max-w-full">
			{" "}
			{/* Limit container width */}
			<div className="absolute top-0 right-0">
				<Pagination
					page={page}
					limit={limit}
					setLimit={setLimit}
					setPage={setPage}
					totalCountOfData={totalCountOfData}
				/>
			</div>
			<div className="pt-0">
				<h1 className="text-2xl font-bold mb-4">Users</h1>
				<div className="overflow-x-auto max-w-full">
					{/* Ensure table scrolls if content overflows */}
					<table className="min-w-full table-auto bg-white border border-gray-200 shadow-md max-w-full">
						<thead>
							<tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
								{updatedHeaders.map((header) => (
									<th key={header} className="py-3 px-6 text-left">
										{header}
									</th>
								))}
							</tr>
						</thead>
						<tbody className="text-gray-600 text-sm">
							{data.map((row) => (
								<tr
									key={row.id}
									className="border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
								>
									{headers.map((header) => (
										<td
											key={header}
											className="py-3 px-6 text-left overflow-hidden max-w-5"
										>
											{/* Handle boolean values explicitly */}
											{typeof row[header] === "boolean"
												? row[header].toString()
												: row[header]}
										</td>
									))}
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default Tables;
