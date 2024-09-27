import React from "react";
import Limit from "./Limit";

const Pagination = ({ page, limit, setLimit, setPage, totalCountOfData }) => {
	const noOfPages = Math.ceil(totalCountOfData / limit);
	let pageNos = [];
	for (let index = 1; index <= noOfPages; index++) {
		pageNos[index] = index;
	}

	let pageNosElements = pageNos.map((p) => {
		const isSelected = p === page;

		return (
			<a
				key={p}
				href="#"
				aria-current={isSelected ? "page" : undefined}
				className={`relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 
                    ${
											isSelected
												? "bg-blue-600 text-white"
												: "bg-white text-gray-900 hover:bg-gray-100"
										} 
                    border border-gray-300`}
				onClick={(e) => {
					e.preventDefault();
					setPage(p);
				}}
			>
				{p}
			</a>
		);
	});

	return (
		<>
			<div className="flex items-center justify-between border-t px-5">
				<div className="flex items-center gap-x-5">
					<Limit setLimit={setLimit} />
					<div className="inline-flex -space-x-px">
						{/* Previous button */}
						<a
							href="#"
							className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
							onClick={(e) => {
								e.preventDefault();
								setPage((prev) => (prev - 1 === 0 ? noOfPages : prev - 1));
							}}
						>
							<svg
								className="h-5 w-5"
								viewBox="0 0 20 20"
								fill="currentColor"
								aria-hidden="true"
							>
								<path
									fillRule="evenodd"
									d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
									clipRule="evenodd"
								/>
							</svg>
						</a>

						{/* Page numbers */}
						{pageNosElements}

						{/* Next button */}
						<a
							href="#"
							className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
							onClick={(e) => {
								e.preventDefault();
								setPage((prev) => (prev + 1 > noOfPages ? 1 : prev + 1));
							}}
						>
							<svg
								className="h-5 w-5"
								viewBox="0 0 20 20"
								fill="currentColor"
								aria-hidden="true"
							>
								<path
									fillRule="evenodd"
									d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
									clipRule="evenodd"
								/>
							</svg>
						</a>
					</div>
				</div>
			</div>
		</>
	);
};

export default Pagination;
