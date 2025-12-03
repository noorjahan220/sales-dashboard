// src/hooks/useSalesDashboard.js
import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchAuthToken, fetchSales } from "../Dashboard/salesApi";

export const useSalesDashboard = () => {
  // 1. State Management
  const [inputs, setInputs] = useState({
    startDate: "", endDate: "", minPrice: "", email: "", phone: ""
  });

  const [queryParams, setQueryParams] = useState({
    startDate: "", endDate: "", minPrice: "", email: "", phone: "",
    cursorType: null, cursorToken: null,
  });

  const [pageHistory, setPageHistory] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  // 2. API Queries
  const { data: token } = useQuery({
    queryKey: ["authToken"],
    queryFn: fetchAuthToken,
    staleTime: Infinity,
  });

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["salesData", token, queryParams],
    queryFn: fetchSales,
    enabled: !!token,
    keepPreviousData: true,
  });

  // 3. Handlers
  const handleInputChange = (field, value) => {
    setInputs((prev) => ({ ...prev, [field]: value }));
  };

  const applyFilters = () => {
    setPageHistory([]); // Reset history on filter change
    setQueryParams((prev) => ({
      ...prev,
      ...inputs,
      cursorType: null,
      cursorToken: null,
    }));
  };

  const handlePagination = (direction, token = null) => {
    if (direction === "next") {
      setPageHistory((prev) => [...prev, queryParams]);
      setQueryParams((prev) => ({
        ...prev,
        cursorType: "after",
        cursorToken: token,
      }));
    } else if (direction === "prev") {
      if (pageHistory.length === 0) return;
      const previousState = pageHistory[pageHistory.length - 1];
      setPageHistory((prev) => prev.slice(0, -1));
      setQueryParams(previousState);
    }
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") direction = "desc";
    setSortConfig({ key, direction });
  };

  // 4. Data Processing
  const sortedTableData = useMemo(() => {
    const list = data?.tableData || [];
    if (!sortConfig.key) return list;

    return [...list].sort((a, b) => {
      if (sortConfig.key === "price") {
        return sortConfig.direction === "asc" ? a.price - b.price : b.price - a.price;
      }
      if (sortConfig.key === "date") {
        return sortConfig.direction === "asc"
          ? new Date(a.date) - new Date(b.date)
          : new Date(b.date) - new Date(a.date);
      }
      return 0;
    });
  }, [data, sortConfig]);

  return {
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
  };
};