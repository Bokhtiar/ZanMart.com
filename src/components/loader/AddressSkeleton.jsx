const AddressSkeleton = () => {
    return (
      <div className="bg-gray-100 p-3 flex flex-col md:grid md:grid-cols-3 justify-between items-start md:items-center gap-6 md:gap-10 mb-3 animate-pulse">
        <div className="flex w-full gap-2">
          <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
        </div>
        <div className="flex w-full justify-start md:justify-center items-center gap-2">
          <div className="h-6 w-40 bg-gray-300 rounded"></div>
        </div>
        <div className="flex justify-start md:justify-center gap-2">
          <div className="h-8 w-8 bg-gray-300 rounded"></div>
          <div className="h-8 w-8 bg-gray-300 rounded"></div>
        </div>
      </div>
    );
  };
  
  export default AddressSkeleton;