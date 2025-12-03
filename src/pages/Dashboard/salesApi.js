// src/api/salesApi.js
import axios from "axios";

export const fetchAuthToken = async () => {
  const res = await axios.post(
    "https://autobizz-425913.uc.r.appspot.com/getAuthorize",
    { tokenType: "frontEndTest" }
  );
  return res.data.token;
};

export const fetchSales = async ({ queryKey }) => {
  const [_key, token, params] = queryKey;

  if (!token) return null;

  const res = await axios.get(
    "https://autobizz-425913.uc.r.appspot.com/sales",
    {
      headers: { "X-AUTOBIZZ-TOKEN": token },
      params: {
        startDate: params.startDate,
        endDate: params.endDate,
        priceMin: params.minPrice,
        email: params.email,
        phone: params.phone,
        [params.cursorType]: params.cursorToken,
      },
    }
  );

  const responseData = res.data.results || res.data || {};
  let tableList = [];

  // Data normalization logic
  if (responseData.sales) tableList = responseData.sales;
  else if (responseData.orders) tableList = responseData.orders;
  else if (responseData.items) tableList = responseData.items;
  else {
    const keys = Object.keys(responseData);
    for (const key of keys) {
      if (Array.isArray(responseData[key]) && key !== "TotalSales") {
        tableList = responseData[key];
        break;
      }
    }
  }

  return {
    chartData: responseData.TotalSales || [],
    tableData: tableList,
    pagination: {
      next: res.data.pagination?.after || null,
      prev: res.data.pagination?.before || null,
    },
  };
};