import PolicyModal from "./PolicyModal";

const BlogModal = ({ showBlog, setShowBlog }) => {
  return (
    <>
      {showBlog && (
        <PolicyModal setOpen={setShowBlog}>
          <div className="ms-center z-50">
            <div className="bg-white p-5 rounded-lg  w-full ">
              <h2 className="text-xl font-bold mb-4 border-b pb-2">
                Zanmart Blog
              </h2>

              <div className="text-sm font-normal leading-6 space-y-4">
                <p>
                  Welcome to <strong>Zanmart.com.bd</strong>, your one-stop online
                  marketplace for electronics, fashion, home essentials, and more.
                  At Zanmart, we are committed to providing a seamless shopping
                  experience with quality products and reliable customer service.
                </p>

                <h3 className="font-semibold text-base mt-3">Why Choose Zanmart?</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>🛍️ Wide range of products from trusted brands.</li>
                  <li>🚚 Fast and reliable delivery across Bangladesh.</li>
                  <li>💳 Secure online payments and easy cash on delivery.</li>
                  <li>🔄 Hassle-free returns and refunds.</li>
                  <li>📞 Responsive customer support ready to assist you.</li>
                </ul>

                <h3 className="font-semibold text-base mt-3">Our Mission</h3>
                <p>
                  At Zanmart, our mission is to make online shopping convenient,
                  safe, and enjoyable for everyone. We strive to bring quality
                  products to your doorstep and ensure complete satisfaction.
                </p>

                <h3 className="font-semibold text-base mt-3">Privacy and Security</h3>
                <p>
                  We value your privacy and take every measure to protect your
                  personal information. Any data collected is used solely to
                  improve your shopping experience and is never shared without
                  your consent.
                </p>
              </div>

              <button
                onClick={() => setShowBlog(false)}
                className="mt-5 bg-blue-500 text-white py-2 px-4 rounded "
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

export default BlogModal;
