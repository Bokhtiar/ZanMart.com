// import React from 'react';

// const TrackOrderInformation = ({  }) => {
//     const order = {
//         orderNumber: 65468,
//         placedDate: '20 August 2024',
//         deliveredDate: null,
//         paymentMethod: 'Cash On Delivery',
//         deliveryLocation: '312/GrapTown, Dattapara Ashulia, Savar, Dhaka',
//         status: 'Shipped',
//         items: [
//           {
//             name: 'Pace International Full Sleeve Striped Men Sweatshirt',
//             category: "Men's Clothing",
//             color: 'Black',
//             size: 'XL',
//             price: 730,
//             quantity: 1,
//             image: 'https://via.placeholder.com/100', // Replace with your image URL
//           },
//           {
//             name: 'SHEIN LUNE Plus Floral Print Tie Front Combo Dress',
//             category: "Women's Clothing",
//             color: 'Navy',
//             size: '43',
//             price: 1300,
//             quantity: 1,
//             image: 'https://via.placeholder.com/100', // Replace with your image URL
//           },
//         ],
//         subtotal: 2030,
//         deliveryCharge: 150,
//         total: 2180,
//       };
      
//   return (
//     <div className="p-6 mt-36 bg-white container-custom rounded-lg shadow-md max-w-4xl mx-auto">
//   {/* Order Details Header */}
//   <div className="lg:flex lg:justify-between lg:items-center mb-4 space-y-4 lg:space-y-0">
//     <div>
//       <p className="text-sm font-semibold">Order Number: {order.orderNumber}</p>
//       <p className="text-sm">Placed On: {order.placedDate}</p>
//       <p className="text-sm">Delivered On: {order.deliveredDate || 'N/A'}</p>
//       <p className="text-sm">Payment: {order.paymentMethod}</p>
//       <p className="text-sm">Delivery Location: {order.deliveryLocation}</p>
//     </div>
//     <div className="text-right">
//       <p className="text-lg font-semibold">
//         Status: 
//         <span
//           className={`px-4 py-2 ml-2 rounded text-white ${
//             order.status === 'Shipped' ? 'bg-primary' : 'bg-gray-400'
//           }`}
//         >
//           {order.status}
//         </span>
//       </p>
//     </div>
//   </div>

//   {/* Items Section */}
//   <h3 className="text-lg font-semibold mb-4">Items</h3>
//   <div className="space-y-4">
//     {order.items.map((item, index) => (
//       <div
//         key={index}
//         className="flex flex-col sm:flex-row items-center bg-gray-50 p-4 rounded-lg shadow-sm"
//       >
//         <img
//           src={item.image}
//           alt={item.name}
//           className="w-24 h-24 object-cover rounded mb-4 sm:mb-0"
//         />
//         <div className="sm:ml-4 flex-grow text-center sm:text-left">
//           <h4 className="text-md font-semibold">{item.name}</h4>
//           <p className="text-sm text-gray-500">{item.category}</p>
//           <p className="text-sm">Color: {item.color} Size: {item.size}</p>
//         </div>
//         <div className="text-right sm:text-left mt-2 sm:mt-0">
//           <p className="text-md font-semibold">{item.price} Tk</p>
//           <p className="text-sm">Quantity: {item.quantity}</p>
//         </div>
//       </div>
//     ))}
//   </div>

//   {/* Total Summary */}
//   <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow-sm">
//     <h4 className="text-lg font-semibold text-primary mb-2">Total Summary</h4>
//     <div className="flex justify-between">
//       <span>Subtotal ({order.items.length} items)</span>
//       <span>{order.subtotal} Tk</span>
//     </div>
//     <div className="flex justify-between">
//       <span>Delivery Charge</span>
//       <span>{order.deliveryCharge} Tk</span>
//     </div>
//     <hr className="my-2" />
//     <div className="flex justify-between text-lg font-semibold">
//       <span>Total</span>
//       <span className="text-primary">{order.total} Tk</span>
//     </div>
//   </div>
// </div>

//   );
// };

// export default TrackOrderInformation;




import React from "react";

const TrackOrderInformation = () => {
  const order = {
    orderNumber: 65468,
    placedDate: "20 August 2024",
    deliveredDate: null,
    paymentMethod: "Cash On Delivery",
    deliveryLocation: "312/GrapTown, Dattapara Ashulia, Savar, Dhaka",
    status: "Shipped",
    items: [
      {
        name: "Pace International Full Sleeve Striped Men Sweatshirt",
        category: "Men's Clothing",
        color: "Black",
        size: "XL",
        price: 730,
        quantity: 1,
        image: "https://via.placeholder.com/100",
      },
      {
        name: "SHEIN LUNE Plus Floral Print Tie Front Combo Dress",
        category: "Women's Clothing",
        color: "Navy",
        size: "43",
        price: 1300,
        quantity: 1,
        image: "https://via.placeholder.com/100",
      },
    ],
    subtotal: 2030,
    deliveryCharge: 150,
    total: 2180,
  };

  const statusList = ["Ordered", "Packed", "Shipped", "Delivered"];

  return (
    <div className="min-h-screen mt-28 px-4 py-10">
      <div className="max-w-5xl mx-auto rounded-3xl bg-white/70 backdrop-blur-lg shadow-xl p-10">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Tracking Order #{order.orderNumber}
          </h2>
          <p className="text-gray-500 text-sm">Placed on: {order.placedDate}</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-10">
          <div className="flex justify-between mb-2 text-sm font-medium text-gray-600">
            {statusList.map((s, i) => (
              <span
                key={i}
                className={`${
                  s === order.status ? "text-indigo-600 font-semibold" : ""
                }`}
              >
                {s}
              </span>
            ))}
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full relative">
            <div
              className={`h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500`}
              style={{
                width: `${
                  ((statusList.indexOf(order.status) + 1) / statusList.length) *
                  100
                }%`,
              }}
            ></div>
          </div>
        </div>

        {/* Order Details */}
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          <div>
            <p className="text-gray-700">
              <span className="font-semibold">Payment Method:</span>{" "}
              {order.paymentMethod}
            </p>
            <p className="text-gray-700 mt-2">
              <span className="font-semibold">Delivery Address:</span>{" "}
              {order.deliveryLocation}
            </p>
            <p className="text-gray-700 mt-2">
              <span className="font-semibold">Delivered On:</span>{" "}
              {order.deliveredDate || "Pending"}
            </p>
          </div>
          <div className="text-right">
            <span className="inline-block px-4 py-1 text-sm font-semibold rounded-full text-white bg-indigo-500 shadow-md">
              Status: {order.status}
            </span>
          </div>
        </div>

        {/* Items */}
        <h3 className="text-xl font-semibold mb-6 text-indigo-700">
          Order Items
        </h3>
        <div className="space-y-6">
          {order.items.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col sm:flex-row items-center bg-white rounded-xl shadow-md p-5 hover:shadow-xl transition"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="sm:ml-6 flex-1 text-center sm:text-left mt-4 sm:mt-0">
                <h4 className="font-semibold text-gray-800 text-md">
                  {item.name}
                </h4>
                <p className="text-sm text-gray-500">{item.category}</p>
                <p className="text-sm text-gray-600 mt-1">
                  Color: {item.color} | Size: {item.size}
                </p>
              </div>
              <div className="text-right mt-4 sm:mt-0">
                <p className="font-bold text-gray-800">{item.price} Tk</p>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="mt-10 bg-white border border-gray-200 rounded-xl p-6 shadow-inner">
          <h4 className="text-lg font-semibold mb-4 text-indigo-700">
            Billing Summary
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal ({order.items.length} items)</span>
              <span>{order.subtotal} Tk</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Charge</span>
              <span>{order.deliveryCharge} Tk</span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between text-lg font-bold text-gray-800">
              <span>Total</span>
              <span className="text-indigo-600">{order.total} Tk</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrderInformation;
