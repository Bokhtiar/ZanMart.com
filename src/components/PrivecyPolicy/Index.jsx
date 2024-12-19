import { useState } from "react";

const PrivacyPolicy = () => {
  const [showPolicy, setShowPolicy] = useState(false);

  const handleShowPolicy = () => {
    setShowPolicy(true);
  };

  const handleClosePolicy = () => {
    setShowPolicy(false);
  };

  return (
    <>
      <button className="underline text-blue-500" onClick={handleShowPolicy}>
        Privacy Policy
      </button>

      {showPolicy && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-5 rounded-lg w-3/4 h-3/4 overflow-auto">
            <h2 className="text-xl font-bold mb-4">Privacy Policy</h2>
            <p className="text-sm">
              <strong>Welcome to zanmart.com.bd</strong> website (the &quot;Site&quot;) operated by zanmart Bangladesh Ltd. We respect your privacy and want to protect your personal information. To learn more, please read this Privacy Policy. This Privacy Policy explains how we collect, use and (under certain conditions) disclose your personal information. This Privacy Policy also explains the steps we have taken to secure your personal information. Finally, this Privacy Policy explains your options regarding the collection, use and disclosure of your personal information. By visiting the Site directly or through another site, you accept the practices described in this Policy.
              <br /><br />
              Data protection is a matter of trust and your privacy is important to us. We shall therefore only use your name and other information which relates to you in the manner set out in this Privacy Policy. We will only collect information where it is necessary for us to do so and we will only collect information if it is relevant to our dealings with you. We will only keep your information for as long as we are either required to by law or as is relevant for the purposes for which it was collected. We will cease to retain your personal data, or remove the means by which the data can be associated with you, as soon as it is reasonable to assume that such retention no longer serves the purposes for which the personal data was collected, and is no longer necessary for any legal or business purpose.
              <br /><br />
              <strong>Data That We Collect</strong><br />
              We may collect various pieces of information if you seek to place an order for a product with us on the Site. We collect, store and process your data for processing your purchase on the Site and any possible later claims, and to provide you with our services.
              <br /><br />
              <strong>Personal Information We Collect</strong><br />
              We may collect personal information including, but not limited to, your title, name, gender, date of birth, email address, postal address, delivery address (if different), telephone number, mobile number, fax number, payment details, payment card details or bank account details. zanmart shall collect the following information where you are a buyer:
              <ul className="list-disc pl-5">
                <li>Identity data, such as your name, gender, profile picture, and date of birth.</li>
                <li>Contact data, such as billing address, delivery address/location, email address, and phone numbers.</li>
                <li>Biometric data, such as voice files and face recognition when you use our voice search function, and your facial features when you use the Site.</li>
                <li>Billing account information: bank account details, credit card account and payment information (such account data may also be collected directly by our affiliates and/or third party payment service providers).</li>
                <li>Transaction records/data, such as details about orders and payments, user clicks, and other details of products and Services related to you.</li>
                <li>Technical data, such as IP address, login data, browser type and version, time zone setting and location, device information, and more.</li>
                <li>Profile data, such as username, account settings, and orders.</li>
                <li>Usage data, such as time spent on the Site, products viewed, access times and dates, and more.</li>
                <li>Location data, such as when you capture and share your location with us in the form of photographs or videos.</li>
                <li>Marketing and communications data, such as your preferences in receiving marketing from us and third parties.</li>
                <li>Additional information we may request you to submit for due diligence checks.</li>
              </ul>
              {/* You can continue adding more sections here */}
            </p>

            <button
              onClick={handleClosePolicy}
              className="mt-5 bg-blue-500 text-white py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PrivacyPolicy;
