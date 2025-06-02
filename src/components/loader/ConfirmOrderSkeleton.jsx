const ConfirmOrderSkeleton = () => (
  <div className="flex flex-col md:flex-row items-center justify-around gap-6 animate-pulse p-6">
    {/* Left Side: Payment Option */}
    <div className="flex flex-col items-center space-y-3">
      <div className="w-28 h-28 bg-gray-300 rounded shadow" />
 
      <div className="flex w-full justify-center gap-4 mt-6 md:mt-0">
      <div className="h-10 w-32 bg-gray-300 rounded" />
      <div className="h-10 w-32 bg-blue-300 rounded" />
    </div>
    </div>
 
    {/* Right Side: Order Summary */}
    <div className="w-full md:w-[400px] bg-white p-5 rounded shadow space-y-4">
      {/* Delivery Location */}
      <div className="h-4 w-2/3 bg-gray-200 rounded" />

      {/* Total Summary Title */}
      <div className="h-5 w-1/3 bg-gray-300 rounded mt-4" />

      {/* Subtotal Row */}
      <div className="flex justify-between">
        <div className="h-4 w-1/4 bg-gray-200 rounded" />
        <div className="h-4 w-10 bg-gray-200 rounded" />
      </div>

      {/* Delivery Charge Row */}
      <div className="flex justify-between">
        <div className="h-4 w-1/3 bg-gray-200 rounded" />
        <div className="h-4 w-10 bg-gray-200 rounded" />
      </div>

      {/* Divider */}
      <hr className="my-2 border-gray-200" />

      {/* Total Row */}
      <div className="flex justify-between items-center">
        <div className="h-5 w-16 bg-gray-300 rounded" />
        <div className="h-6 w-20 bg-gray-300 rounded" />
      </div>
    </div>

    {/* Bottom Buttons (Stacked on mobile) */}
   
  </div>
);
export default ConfirmOrderSkeleton;