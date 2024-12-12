import React, { useCallback, useEffect, useState } from "react";
import { publicRequest } from "@/config/axios.config";


const Paginations = ({api,data}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  
  const fetchProducts = useCallback(
    async (page = 1) => {
      try {
        const res = await publicRequest.get(`${api}?page=${page}`);
        const result = res?.data?.data?.data;
        console.log(result)
        data(result);
        setCurrentPage(res?.data?.data?.current_page); // Set current page
        setTotalPages(res?.data?.data?.last_page); // Set total pages
      } catch (error) {
        // No error handling needed
      }
    },
    []
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      fetchProducts(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      fetchProducts(currentPage - 1);
    }
  };
  useEffect(()=>{
    fetchProducts()
  },[])

  return (
    <div className="flex  items-center justify-end mt-4 space-x-4">
      <button
        onClick={handlePreviousPage}
        className="px-4 py-2 text-sm bg-primary text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300"
        disabled={currentPage === 1}
      >
        Previous
      </button>

      {/* Page Indicator */}
      <span className="text-sm ">
       Pages: <span className="font-bold">{currentPage}</span> {"/"}
        <span className="font-bold">{totalPages}</span>
      </span>

      {/* Next Button */}
      <button
        onClick={handleNextPage}
        className="px-4 py-2 text-sm bg-primary text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300"
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Paginations;
