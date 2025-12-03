const SortIcon = ({ active, direction }) => {
  if (!active) {
    return (
      <svg
        className="w-4 h-4 text-gray-400 opacity-50 group-hover:opacity-100 transition-opacity"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M7 15l5 5 5-5" />
        <path d="M7 9l5-5 5 5" />
      </svg>
    );
  }

  return direction === "asc" ? (
    <svg
      className="w-4 h-4 text-blue-600"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M12 3.75a.75.75 0 01.75.75v13.19l5.47-5.47a.75.75 0 111.06 1.06l-6.75 6.75a.75.75 0 01-1.06 0l-6.75-6.75a.75.75 0 111.06-1.06l5.47 5.47V4.5a.75.75 0 01.75-.75z"
        clipRule="evenodd"
        transform="scale(1, -1) translate(0, -24)"
      />
    </svg>
  ) : (
    <svg
      className="w-4 h-4 text-blue-600"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M12 3.75a.75.75 0 01.75.75v13.19l5.47-5.47a.75.75 0 111.06 1.06l-6.75 6.75a.75.75 0 01-1.06 0l-6.75-6.75a.75.75 0 111.06-1.06l5.47 5.47V4.5a.75.75 0 01.75-.75z"
        clipRule="evenodd"
      />
    </svg>
  );
};

const SalesTable = ({
  data,
  isLoading,
  isFetching,
  sortConfig,
  onSort,
  pagination,
  onPagination,
  hasHistory,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors select-none min-w-[150px] group"
                onClick={() => onSort("date")}
              >
                <div className="flex items-center justify-between gap-2">
                  <span>Date</span>
                  <div className="bg-gray-100 group-hover:bg-white p-1 rounded-md">
                    <SortIcon
                      active={sortConfig.key === "date"}
                      direction={sortConfig.direction}
                    />
                  </div>
                </div>
              </th>

              <th
                scope="col"
                className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider min-w-[200px]"
              >
                Customer Info
              </th>

              <th
                scope="col"
                className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider min-w-[150px]"
              >
                Phone
              </th>

              <th
                scope="col"
                className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors select-none min-w-[100px] group"
                onClick={() => onSort("price")}
              >
                <div className="flex items-center justify-between gap-2">
                  <span>Total Price</span>
                  <div className="bg-gray-100 group-hover:bg-white p-1 rounded-md">
                    <SortIcon
                      active={sortConfig.key === "price"}
                      direction={sortConfig.direction}
                    />
                  </div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.length > 0 ? (
              // Displaying 50 items per page
              data.slice(0, 50).map((item, index) => (
                <tr
                  key={item._id || index}
                  className="hover:bg-blue-50/40 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {new Date(item.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold mr-3">
                        {item.customerEmail
                          ? item.customerEmail.charAt(0).toUpperCase()
                          : "?"}
                      </div>
                      <span
                        className="truncate max-w-[180px]"
                        title={item.customerEmail}
                      >
                        {item.customerEmail || "Unknown"}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                    {item.customerPhone || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      ${item.price ? parseFloat(item.price).toFixed(2) : "0.00"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="px-6 py-16 text-center text-gray-500"
                >
                  <div className="flex flex-col items-center justify-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">
                      No sales found
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {isLoading
                        ? "Loading data..."
                        : "Try adjusting your search or filters."}
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex items-center justify-between">
        <button
          disabled={!hasHistory || isFetching}
          onClick={() => onPagination("prev")}
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <svg
            className="mr-2 h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Previous
        </button>

        <div className="text-xs text-gray-400 hidden sm:block">
          {isFetching
            ? "Loading..."
            : `Showing ${Math.min(50, data.length)} of ${data.length} results`}
        </div>

        <button
          disabled={!pagination?.next || isFetching}
          onClick={() => onPagination("next", pagination.next)}
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Next
          <svg
            className="ml-2 h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SalesTable;
