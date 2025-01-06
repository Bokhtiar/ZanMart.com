import React from 'react';

const TrackOrderInformation = ({  }) => {
    const order = {
        orderNumber: 65468,
        placedDate: '20 August 2024',
        deliveredDate: null,
        paymentMethod: 'Cash On Delivery',
        deliveryLocation: '312/GrapTown, Dattapara Ashulia, Savar, Dhaka',
        status: 'Shipped',
        items: [
          {
            name: 'Pace International Full Sleeve Striped Men Sweatshirt',
            category: "Men's Clothing",
            color: 'Black',
            size: 'XL',
            price: 730,
            quantity: 1,
            image: 'https://via.placeholder.com/100', // Replace with your image URL
          },
          {
            name: 'SHEIN LUNE Plus Floral Print Tie Front Combo Dress',
            category: "Women's Clothing",
            color: 'Navy',
            size: '43',
            price: 1300,
            quantity: 1,
            image: 'https://via.placeholder.com/100', // Replace with your image URL
          },
        ],
        subtotal: 2030,
        deliveryCharge: 150,
        total: 2180,
      };
      
  return (
    <div className="p-6 mt-36 bg-white rounded-lg shadow-md max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="text-sm font-semibold">Order Number: {order.orderNumber}</p>
          <p className="text-sm">Placed On: {order.placedDate}</p>
          <p className="text-sm">Delivered On: {order.deliveredDate || 'N/A'}</p>
          <p className="text-sm">Payment: {order.paymentMethod}</p>
          <p className="text-sm">
            Delivery Location: {order.deliveryLocation}
          </p>
        </div>
        <div className="text-right">
          <p className="text-lg  font-semibold">Status:
          <span className={`px-4 py-2 rounded text-white ${order.status === 'Shipped' ? 'bg-primary' : 'bg-gray-400'}`}>
            {order.status}
          </span></p>
        </div>
      </div>

      <h3 className="text-lg font-semibold mb-4">Items</h3>
      <div className="space-y-4">
        {order.items.map((item, index) => (
          <div key={index} className="flex items-center bg-gray-50 p-4 rounded-lg shadow-sm">
            <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded" />
            <div className="ml-4 flex-grow">
              <h4 className="text-md font-semibold">{item.name}</h4>
              <p className="text-sm text-gray-500">{item.category}</p>
              <p className="text-sm">Color: {item.color} Size: {item.size}</p>
            </div>
            <div className="text-right">
              <p className="text-md font-semibold">{item.price} Tk</p>
              <p className="text-sm">Quantity: {item.quantity}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow-sm">
        <h4 className="text-lg font-semibold text-primary mb-2">Total Summary</h4>
        <div className="flex justify-between">
          <span>Subtotal ({order.items.length} items)</span>
          <span>{order.subtotal} Tk</span>
        </div>
        <div className="flex justify-between">
          <span>Delivery Charge</span>
          <span>{order.deliveryCharge} Tk</span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between text-lg font-semibold">
          <span>Total</span>
          <span className='text-primary'>{order.total} Tk</span>
        </div>
      </div>
    </div>
  );
};

export default TrackOrderInformation;
