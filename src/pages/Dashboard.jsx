import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const Dashboard = () => {
  const [token, setToken] = useState(null);
  
  // Data States
  const [chartData, setChartData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Bonus: Cache State
  const [dataCache, setDataCache] = useState({});

  // Pagination
  const [nextPageToken, setNextPageToken] = useState(null);
  const [prevPageToken, setPrevPageToken] = useState(null);

  // Filters
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // Sorting
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  // 1. Get Token
  useEffect(() => {
    const getAuthToken = async () => {
      try {
        const res = await axios.post('https://autobizz-425913.uc.r.appspot.com/getAuthorize', {
          tokenType: "frontEndTest"
        });
        setToken(res.data.token);
      } catch (err) {
        console.error("Auth Error", err);
        setError("Failed to authorize.");
      }
    };
    getAuthToken();
  }, []);

  // 2. Fetch Data (With Caching)
  const fetchSalesData = async (cursorType = null, cursorToken = null) => {
    if (!token) return;

    setLoading(true);
    setError(null);

    // Create a unique key for the current request
    const cacheKey = JSON.stringify({
      startDate, endDate, minPrice, email, phone, cursorType, cursorToken
    });

    // Check Cache first
    if (dataCache[cacheKey]) {
      const cached = dataCache[cacheKey];
      setChartData(cached.chart);
      setTableData(cached.table);
      setNextPageToken(cached.next);
      setPrevPageToken(cached.prev);
      setLoading(false);
      return; // Stop here, don't call API
    }

    try {
      const res = await axios.get('https://autobizz-425913.uc.r.appspot.com/sales', {
        headers: { "X-AUTOBIZZ-TOKEN": token },
        params: {
          startDate,
          endDate,
          priceMin: minPrice,
          email,
          phone,
          [cursorType]: cursorToken 
        }
      });

      const responseData = res.data.results || res.data || {};
      
      // 1. Get Chart Data
      const newChartData = responseData.TotalSales || [];

      // 2. Smart Find Table Data
      let foundList = [];
      if (responseData.sales) foundList = responseData.sales;
      else if (responseData.Sales) foundList = responseData.Sales;
      else if (responseData.orders) foundList = responseData.orders;
      else if (responseData.items) foundList = responseData.items;
      else {
        const keys = Object.keys(responseData);
        for (const key of keys) {
          if (Array.isArray(responseData[key]) && key !== 'TotalSales') {
            foundList = responseData[key];
            break;
          }
        }
      }
      
      setChartData(newChartData);
      setTableData(foundList);

      // 3. Handle Pagination
      const nextToken = res.data.pagination?.after || null;
      const prevToken = res.data.pagination?.before || null;

      setNextPageToken(nextToken);
      setPrevPageToken(prevToken);

      // 4. Save to Cache
      setDataCache(prev => ({
        ...prev,
        [cacheKey]: {
          chart: newChartData,
          table: foundList,
          next: nextToken,
          prev: prevToken
        }
      }));

    } catch (err) {
      console.error(err);
      setError("Error fetching data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchSalesData();
    }
  }, [token]);

  // 3. Sorting Logic
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedTableData = useMemo(() => {
    let sortableItems = [...tableData];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        if (sortConfig.key === 'price') {
          return sortConfig.direction === 'asc' 
            ? a.price - b.price 
            : b.price - a.price;
        }
        if (sortConfig.key === 'date') {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return sortConfig.direction === 'asc' 
            ? dateA - dateB 
            : dateB - dateA;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [tableData, sortConfig]);

  // 4. Render
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans text-gray-800">
      
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-blue-900">Sales Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Real-time performance overview</p>
        </div>
        {loading && <span className="text-blue-600 font-semibold animate-pulse">Loading...</span>}
      </header>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Start Date</label>
          <input type="date" className="w-full border border-gray-300 p-2 rounded-lg"
            onChange={(e) => setStartDate(e.target.value)} />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">End Date</label>
          <input type="date" className="w-full border border-gray-300 p-2 rounded-lg"
            onChange={(e) => setEndDate(e.target.value)} />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Min Price</label>
          <input type="number" placeholder="0" className="w-full border border-gray-300 p-2 rounded-lg"
            onChange={(e) => setMinPrice(e.target.value)} />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email</label>
          <input type="text" placeholder="Email" className="w-full border border-gray-300 p-2 rounded-lg"
            onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Phone</label>
          <input type="text" placeholder="Phone" className="w-full border border-gray-300 p-2 rounded-lg"
            onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div className="flex items-end">
          <button onClick={() => fetchSalesData()} 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200">
            Filter
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6 h-96">
        <h2 className="text-lg font-bold mb-4 text-gray-700">Total Sales Over Time</h2>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="day" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
            <Tooltip contentStyle={{ backgroundColor: "#fff", borderRadius: "8px" }} formatter={(value) => [`$${value}`, "Total Sales"]} />
            <Line type="monotone" dataKey="totalSale" stroke="#2563eb" strokeWidth={3} dot={{ r: 4, fill: "#2563eb" }} activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="p-4 text-sm font-semibold text-gray-600 cursor-pointer select-none hover:text-blue-600" onClick={() => handleSort('date')}>
                  Date {sortConfig.key === 'date' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </th>
                <th className="p-4 text-sm font-semibold text-gray-600">Customer Email</th>
                <th className="p-4 text-sm font-semibold text-gray-600">Phone</th>
                <th className="p-4 text-sm font-semibold text-gray-600 cursor-pointer select-none hover:text-blue-600" onClick={() => handleSort('price')}>
                  Price {sortConfig.key === 'price' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {sortedTableData.length > 0 ? sortedTableData.map((item) => (
                <tr key={item._id} className="hover:bg-blue-50 transition duration-150">
                  <td className="p-4 text-sm text-gray-700">
                    {new Date(item.date).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-sm text-gray-700">
                    {item.customerEmail || "N/A"}
                  </td>
                  <td className="p-4 text-sm text-gray-700">
                    {item.customerPhone || "N/A"}
                  </td>
                  <td className="p-4 text-sm font-bold text-green-600">
                    ${item.price || 0}
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="4" className="p-8 text-center text-gray-400">
                    {loading ? "Loading..." : "No sales data found."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-gray-100 flex justify-between items-center">
          <button 
            disabled={!prevPageToken || loading}
            onClick={() => fetchSalesData('before', prevPageToken)}
            className="px-4 py-2 text-sm font-medium bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Previous
          </button>
          <span className="text-sm text-gray-400">
            {loading ? "Updating..." : "Page Ready"}
          </span>
          <button 
            disabled={!nextPageToken || loading}
            onClick={() => fetchSalesData('after', nextPageToken)}
            className="px-4 py-2 text-sm font-medium bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;