import TermsAndConditions from "@/components/TermsAndConditions";
import PrivacyPolicy from "@/components/PrivacyPolicy";
import { useState } from "react";

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(true);

  const handleAccept = () => {
    setShowConsent(false);
  };

  return (
    <>
      {showConsent && (
        <div className="fixed bottom-0 left-0 w-full bg-gray-800 text-white py-4 px-5 flex justify-between items-center z-50">
          <p className="text-sm">
            We use cookies to improve your experience on our site. By using this
            site, you accept our use of cookies. 
            <TermsAndConditions /> | <PrivacyPolicy />
          </p>
          <button
            onClick={handleAccept}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Accept
          </button>
        </div>
      )}
    </>
  );
};

export default CookieConsent;
