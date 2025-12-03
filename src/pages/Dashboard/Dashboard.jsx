import RevenueChart from "./RevenueChart";
import SalesTable from "./SalesTable";
import TransactionFilters from "./TransactionFilters";
import { useSalesDashboard } from "./useSalesDashboard";

const Dashboard = () => {
  const {
    inputs,
    handleInputChange,
    applyFilters,
    data,
    isLoading,
    isError,
    isFetching,
    sortedTableData,
    handleSort,
    sortConfig,
    handlePagination,
    pageHistory,
  } = useSalesDashboard();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Sales Dashboard
            </h1>
            <p className="mt-2 text-gray-600">
              Overview of sales performance and transaction history.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {(isLoading || isFetching) && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 animate-pulse">
                Syncing data...
              </span>
            )}
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white border border-gray-200 text-gray-600 shadow-sm">
              {sortedTableData.length} Records
            </span>
          </div>
        </div>

        {/* Error Banner */}
        {isError && (
          <div className="mb-6 rounded-lg bg-red-50 p-4 border-l-4 border-red-500">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">
                  There was an error fetching the sales data. Please check your
                  connection or try again.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Components */}
        <TransactionFilters
          inputs={inputs}
          onInputChange={handleInputChange}
          onApply={applyFilters}
        />

        <RevenueChart data={data?.chartData || []} />

        <SalesTable
          data={sortedTableData}
          isLoading={isLoading}
          isFetching={isFetching}
          sortConfig={sortConfig}
          onSort={handleSort}
          pagination={data?.pagination}
          onPagination={handlePagination}
          hasHistory={pageHistory.length > 0}
        />
      </div>
    </div>
  );
};

export default Dashboard;
