import React, { useCallback, useEffect, useState } from "react";
import { publicRequest } from "@/config/axios.config";
import { returnPagination } from "@/utils/pagination";
import { MdOutlineNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
const Paginations = ({ api, data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPages] = useState(1);

  const fetchProducts = useCallback(async (page = 1) => {
    try {
      const res = await publicRequest.get(`${api}?page=${page}`);
      const result = res?.data?.data?.data;
      console.log(res);
      data(result);
      setCurrentPage(res?.data?.data?.current_page); // Set current page
      setTotalPages(res?.data?.data?.last_page); // Set total pages
    } catch (error) {
      // No error handling needed
    }
  }, [ ]);

  // const handleNextPage = () => {
  //   if (currentPage < totalPages) {
  //     fetchProducts(currentPage + 1);
  //   }
  // };

  // const handlePreviousPage = () => {
  //   if (currentPage > 1) {
  //     fetchProducts(currentPage - 1);
  //   }
  // };
  useEffect(() => {
    fetchProducts();
  }, []); 
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  // const totalPage = Math.ceil(500 / 7);
  useEffect(() => {
    fetchProducts(page);
    console.log("page is-------------------------->" , page);
  }, [data, page, limit]);
  const handleChange = (e) => {
    if (e == "prev") {
      if (page > 1) {
        setPage(page - 1);
      }
    } else if (e == "next") {
      if (page < totalPage) {
        setPage(page + 1);
      }
    } else {
      if(e==' ...'){
        setPage(1);
      }else if(e=='... '){
        setPage(totalPage);
      }else{
        setPage(e);
      }
     
    }
  };

  return (
    <div className="flex  items-center justify-center mt-4 space-x-4">
      <Pagination
        totalPage={totalPage}
        page={page}
        limits={limit}
        siblings={1}
        handleChange={handleChange}
      />
      {/* <button
        onClick={handlePreviousPage}
        className="px-4 py-2 text-sm bg-primary text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300"
        disabled={currentPage === 1}
      >
        Previous
      </button> */}

      {/* Page Indicator */}
      {/* <span className="text-sm ">
       Pages: <span className="font-bold">{currentPage}</span> {"/"}
        <span className="font-bold">{totalPages}</span>
      </span> */}

      {/* Next Button */}
      {/* <button
        onClick={handleNextPage}
        className="px-4 py-2 text-sm bg-primary text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300"
        disabled={currentPage === totalPages}
      >
        Next
      </button> */}
    </div>
  );
};

export default Paginations;

const Pagination = ({ totalPage, page, limits, siblings, handleChange }) => {
  const arr = returnPagination(totalPage, page, limits, siblings);

  return (
    <div className="flex justify-center  ">
      <div>
        <div className="pag flex gap-6 ">
          <button
            onClick={(e) => handleChange("prev")}
            className="px-1 w-10 py-2 text-sm  bg-gray-200 text-black rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-400  text-center flex justify-center items-center "
          >
            <GrFormPrevious />
          </button>

          {arr.map((item, index) => (
            <button
              onClick={(e) => handleChange(item)}
              key={index}
              className={`px-1 py-2 text-sm    rounded disabled:opacity-50 disabled:cursor-not-allowed   w-10 ${
                page == item
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-black"
              }  ${page === item ? "hover:bg-blue-500" : "hover:bg-blue-400"}`}
            >
              {item}
            </button>
          ))}

          <button
            onClick={(e) => handleChange("next")}
            className="px-1 py-2 text-sm w-10    rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-400   bg-gray-200 text-black flex justify-center items-center"
          >
            <MdOutlineNavigateNext />
          </button>
        </div>
      </div>
    </div>
  );
};
