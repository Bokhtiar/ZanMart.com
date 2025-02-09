const OrderSkeleton = () => {
    return (
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 animate-pulse">
        <div className="space-y-1">
          {/* <div className="h-4 w-32 bg-gray-300 rounded"></div> */}
          <div className="h-4 w-48 bg-gray-300 rounded"></div>
          <div className="h-4 w-48 bg-gray-300 rounded"></div>
        </div>
  
        <div className="flex flex-col items-center space-y-2">
          <div className="h-4 w-24 bg-gray-300 rounded"></div>
        </div>
  
        <div className="flex flex-col items-center space-y-2">
          <div className="h-4 w-32 bg-gray-300 rounded"></div>
        </div>
  
        <div className="flex md:flex-col flex-row md:items-center justify-between gap-2">
          <div className="h-6 w-24 bg-gray-300 rounded-full"></div>
        </div>
  
        <div className="flex items-end gap-2">
          <div className="h-8 w-24 bg-gray-300 rounded"></div>
          <div className="h-8 w-8 bg-gray-300 rounded"></div>
        </div>
      </div>
    );
  };
  
  export default OrderSkeleton;