const PaymentSkeleton = () => {
  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-8 animate-pulse">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left side - Payment Methods */}
        <div className="md:col-span-2 space-y-6">
          {/* Recommended Method */}
          <div>
            <div className="h-6 w-48 bg-gray-300 rounded mb-2"></div>
            <div className="bg-white rounded-lg p-4 flex justify-between items-center shadow-sm">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-gray-300 rounded"></div>
                <div className="h-5 w-32 bg-gray-300 rounded"></div>
              </div>
              <div className="h-5 w-4 bg-gray-200 rounded"></div>
            </div>
          </div>

          {/* Other Methods */}
          <div>
            <div className="h-6 w-40 bg-gray-300 rounded mb-2"></div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="h-6 w-24 bg-gray-200 rounded"></div>
            </div>
            <div className="flex items-center gap-3 mt-2">
              <div className="h-6 w-6 bg-gray-300 rounded"></div>
              <div className="h-5 w-5 bg-gray-300 rounded"></div>
              <div className="h-5 w-5 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>

        {/* Right side - Order Summary */}
        <div className="bg-white rounded-lg shadow p-6 h-fit space-y-4">
          <div className="h-6 w-32 bg-gray-300 rounded"></div>

          <div className="flex justify-between text-sm gap-2">
            <div className="h-4 w-32 bg-gray-200 rounded"></div>
            <div className="h-4 w-16 bg-gray-200 rounded"></div>
          </div>

          <hr className="my-3" />

          <div className="flex justify-between text-base font-semibold mb-4">
            <div className="h-5 w-20 bg-gray-300 rounded"></div>
            <div className="h-5 w-16 bg-gray-300 rounded"></div>
          </div>

          <div className="w-full h-12 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSkeleton;
