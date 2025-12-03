const TransactionFilters = ({ inputs, onInputChange, onApply }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
      <div className="p-6 border-b border-gray-100 bg-gray-50/50">
        <h2 className="text-base font-semibold leading-6 text-gray-900">
          Filter Transactions
        </h2>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          <FilterInput
            label="Start Date"
            type="date"
            value={inputs.startDate}
            onChange={(e) => onInputChange("startDate", e.target.value)}
          />

          <FilterInput
            label="End Date"
            type="date"
            value={inputs.endDate}
            onChange={(e) => onInputChange("endDate", e.target.value)}
          />

          <div className="space-y-1">
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">
              Min Price
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-400 font-bold text-lg">$</span>
              </div>
              <input
                type="number"
                placeholder="0.00"
                value={inputs.minPrice}
                onChange={(e) => onInputChange("minPrice", e.target.value)}
                className="block w-full pl-10 rounded-lg border-gray-300 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2.5 transition-colors"
              />
            </div>
          </div>

          <FilterInput
            label="Email"
            type="text"
            placeholder="user@example.com"
            value={inputs.email}
            onChange={(e) => onInputChange("email", e.target.value)}
            icon={
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              />
            }
          />

          <FilterInput
            label="Phone"
            type="text"
            placeholder="+1 555..."
            value={inputs.phone}
            onChange={(e) => onInputChange("phone", e.target.value)}
            icon={
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            }
          />
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onApply}
            className="inline-flex items-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
          >
            <svg
              className="-ml-1 mr-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

const FilterInput = ({ label, type, placeholder, value, onChange, icon }) => (
  <div className="space-y-1">
    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">
      {label}
    </label>
    <div className="relative">
      {icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {icon}
          </svg>
        </div>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`block w-full rounded-lg border-gray-300 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2.5 transition-colors ${
          icon ? "pl-10" : "pl-3"
        }`}
      />
    </div>
  </div>
);

export default TransactionFilters;
