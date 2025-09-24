import PolicyModal from "./PolicyModal";

const RefundModal = ({ showRefund, setShowRefund }) => {
  return (
    <>
      {showRefund && (
        <PolicyModal setOpen={setShowRefund}>
          <div className="ms-center z-50">
            <div className="bg-white p-5 rounded-lg overflow-auto max-h-[80vh]">
              <h2 className="text-xl font-bold mb-4 border-b pb-2">
                Refund and Return Policy
              </h2>

              <div className="text-sm font-normal leading-6 space-y-3">
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    <strong>In-Store Purchase Policy:</strong> Check the product
                    in front of our sellers. Later complaints will not be accepted
                    for exchange; warranty services are provided according to
                    the product description.
                  </li>
                  <li>
                    <strong>Online Order Policy:</strong> Inform us within 24 hours
                    if any manufacturing defects are noticed. Product must remain
                    unused, unscratched, and with the box intact. Do not open or
                    damage suspicious packages.
                  </li>
                  <li>
                    <strong>Defective Products:</strong> Visit any Zanmart shop
                    for issue review and replacement. Replacement via delivery:
                    Inside Dhaka: TK. 200/- charge, Outside Dhaka: courier charge.
                  </li>
                  <li>
                    <strong>Non-Returnable Products:</strong> Products received
                    without faults cannot be returned due to change of mind.
                    Software and software licenses are strictly non-returnable.
                  </li>
                  <li>
                    <strong>Refund Policy:</strong> Refunds processed within 3-10
                    working days. Charges may apply for Mobile Financial Services,
                    Online Gateway, or POS payments. Cashback applied will be deducted.
                  </li>
                  <li>
                    <strong>Courier Policy:</strong> Do not accept products with
                    broken seals or damaged packaging. Customer liable if received.
                  </li>
                </ul>
              </div>

              <button
                onClick={() => setShowRefund(false)}
                className="mt-5 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
              >
                Close
              </button>
            </div>
          </div>
        </PolicyModal>
      )}
    </>
  );
};

export default RefundModal;
