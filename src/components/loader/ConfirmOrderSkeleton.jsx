 
const ConfirmOrderSkeleton = () => {
  const shimmer = "animate-pulse bg-gray-200 rounded";

  return (
    <div className="container-custom mx-auto bg-gray-50">
      <div className="grid md:grid-cols-3 gap-6">
        {/* Left Content */}
        <div className="md:col-span-2 space-y-6">
          {/* Shipping Information */}
          <div className="bg-white p-5 rounded shadow space-y-4">
            <div className={`${shimmer} h-6 w-40`} />
            <div className="border p-4 rounded text-sm space-y-2">
              <div className={`${shimmer} h-4 w-32`} />
              <div className={`${shimmer} h-4 w-24`} />
              <div className={`${shimmer} h-4 w-48`} />
              <div className={`${shimmer} h-4 w-64`} />
            </div>
          </div>

          {/* Delivery Options */}
          <div className="bg-white p-5 rounded shadow space-y-4">
            <div className={`${shimmer} h-6 w-40`} />
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between border p-4 rounded"
              >
                <div className="flex items-baseline gap-3 w-full">
                  <div className={`${shimmer} w-5 h-5 rounded-full`} />
                  <div className="space-y-1 w-full">
                    <div className={`${shimmer} h-4 w-32`} />
                    <div className={`${shimmer} h-3 w-48`} />
                  </div>
                </div>
                <div className={`${shimmer} h-5 w-16`} />
              </div>
            ))}

            {/* Place Order Buttons */}
            <div className="flex shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] md:shadow-none justify-end fixed md:sticky bottom-0 items-center z-10 gap-4 right-4 bg-white py-4 px-2">
              <div className={`${shimmer} h-6 w-24 md:hidden`} />
              <div className={`${shimmer} h-10 w-32 rounded`} />
              <div className={`${shimmer} h-10 w-32 rounded`} />
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-5 rounded space-y-4">
          <div className={`${shimmer} h-6 w-40`} />
          <div className={`${shimmer} h-6 w-full`} />
          <div className="border-t pt-4 space-y-3 text-sm">
            <div className="flex justify-between">
              <div className={`${shimmer} h-4 w-32`} />
              <div className={`${shimmer} h-4 w-12`} />
            </div>
            <div className="flex justify-between">
              <div className={`${shimmer} h-4 w-20`} />
              <div className={`${shimmer} h-4 w-12`} />
            </div>
          </div>
          <div className="border-t pt-4 text-base font-semibold flex justify-between">
            <div className={`${shimmer} h-5 w-16`} />
            <div className={`${shimmer} h-5 w-16`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmOrderSkeleton;
