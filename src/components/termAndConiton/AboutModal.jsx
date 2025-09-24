import { useState } from "react";
import PolicyModal from "./PolicyModal";

const AboutModal = ({ showAbout, setShowAbout }) => {
  return (
    <>
      {showAbout && (
        <PolicyModal setOpen={setShowAbout}>
          <div className=" ms-center z-50">
            <div className="bg-white p-5 rounded-lg   overflow-auto">
              <h2 className="text-xl font-bold mb-4 border-b">About Us</h2>
              <div className="text-sm font-normal leading-4">
                <p>
                  {" "}
                  Zanmart is a next-generation e-commerce platform created with
                  the vision of transforming the way people shop online. It is
                  not just a marketplace, but a complete digital shopping
                  solution where customers can explore a diverse range of
                  products—from fashion, electronics, and home essentials to
                  beauty, lifestyle, and groceries—all available in one
                  convenient place. At Zanmart, our primary focus is to ensure
                  that every customer enjoys a smooth, fast, and reliable
                  shopping journey. The platform is designed with user-friendly
                  navigation, smart search and filtering options, detailed
                  product descriptions, and high-quality images to help
                  customers make informed purchasing decisions. We place a
                  strong emphasis on trust and security, offering multiple safe
                  payment methods, including digital wallets, bank cards, and
                  cash-on-delivery options, so that every transaction is
                  completely secure and hassle-free.
                </p>

                <h1 className="py-4">
                  {" "}
                  <strong>
                    Efficient logistics and delivery services
                  </strong>{" "}
                </h1>
                <p>
                  In addition to this, Zanmart ensures efficient logistics and
                  delivery services. We partner with trusted courier providers
                  to make sure products reach customers quickly and safely, no
                  matter where they are located. Our dedicated customer support
                  team is always available to assist with inquiries, returns, or
                  any issues, ensuring complete satisfaction at every step. For
                  sellers and businesses, Zanmart offers a powerful platform to
                  showcase and sell their products to a growing base of online
                  shoppers. We provide tools and insights that help vendors
                  manage their stores, track sales, and grow their business
                  effectively. By creating opportunities for small businesses as
                  well as established brands, Zanmart contributes to building a
                  stronger online retail ecosystem. Ultimately, Zanmart is more
                  than just an e-commerce website—it is a trusted bridge between
                  buyers and sellers. By combining quality, affordability, and
                  convenience, we aim to make online shopping not only
                  accessible but also enjoyable for everyone. With continuous
                  innovation and a customer-first approach, Zanmart is committed
                  to becoming one of the most reliable and preferred online
                  marketplaces in the region.
                </p>


              </div>

              <button
                onClick={(e) => {
                  setShowAbout(false);
                }}
                className="mt-5 bg-blue-500 text-white py-2 px-4 rounded"
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

export default AboutModal;
