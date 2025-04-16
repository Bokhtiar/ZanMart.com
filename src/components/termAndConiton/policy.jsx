import { useState } from "react";
import PolicyModal from "./PolicyModal";

const Policy = ({ showTerms, setShowTerms }) => {
  return (
    <>
     { showTerms && <PolicyModal setOpen={setShowTerms}>
        <div className=" ms-center z-50">
          <div className="bg-white p-5 rounded-lg   overflow-auto">
            <h2 className="text-xl font-bold mb-4 border-b">Privacy and Confidentiality</h2>
            <div className="text-sm font-normal leading-4">
                <p>
                  {" "}
                  Welcome to the zanmart.com.bd website (the &quot;Site&quot; ) operated by
                  zanmart Bangladesh Ltd. We respect your privacy and want to
                  protect your personal information. To learn more, please read
                  this Privacy Policy. This Privacy Policy explains how we
                  collect, use and (under certain conditions) disclose your
                  personal information. This Privacy Policy also explains the
                  steps we have taken to secure your personal information.
                  Finally, this Privacy Policy explains your options regarding
                  the collection, use and disclosure of your personal
                  information. By visiting the Site directly or through another
                  site, you accept the practices described in this Policy. Data
                  protection is a matter of trust and your privacy is important
                  to us. We shall therefore only use your name and other
                  information which relates to you in the manner set out in this
                  Privacy Policy. We will only collect information where it is
                  necessary for us to do so and we will only collect information
                  if it is relevant to our dealings with you. We will only keep
                  your information for as long as we are either required to by
                  law or as is relevant for the purposes for which it was
                  collected. We will cease to retain your personal data, or
                  remove the means by which the data can be associated with you,
                  as soon as it is reasonable to assume that such retention no
                  longer serves the purposes for which the personal data was
                  collected, and is no longer necessary for any legal or
                  business purpose.You can visit the Site and browse without
                  having to provide personal details. During your visit to the
                  Site you remain anonymous and at no time can we identify you
                  unless you have an account on the Site and log on with your
                  user name and password.
                </p>

                <h1 className="py-4"> <strong>Data that we collect</strong> </h1>
                <p>
                  We may collect various pieces of information if you seek to
                  place an order for a product with us on the Site. We collect,
                  store and process your data for processing your purchase on
                  the Site and any possible later claims, and to provide you
                  with our services. We may collect personal information
                  including, but not limited to, your title, name, gender, date
                  of birth, email address, postal address, delivery address (if
                  different), telephone number, mobile number, fax number,
                  payment details, payment card details or bank account details.
                  zanmart shall collect the following information where you are
                  a buyer: Identity data, such as your name, gender, profile
                  picture, and date of birth; Contact data, such as billing
                  address, delivery address/location, email address and phone
                  numbers; Biometric data, such as voice files and face
                  recognition when you use our voice search function, and your
                  facial features of when you use the Site;
                </p>

                <h1 className="py-4"> <strong> Billing account information:</strong></h1>
                <p>
                  bank account details, credit card account and payment
                  information (such account data may also be collected directly
                  by our affiliates and/or third party payment service
                  providers); Transaction records/data, such as details about
                  orders and payments, user clicks, and other details of
                  products and Services related to you; Technical data, such as
                  Internet protocol (IP) address, your login data, browser type
                  and version, time zone setting and location, device
                  information, browser plug-in types and versions, operating
                  system and platform, international mobile equipment identity,
                  device identifier, IMEI, MAC address, cookies (where
                  applicable) and other information and technology on the
                  devices you use to access the Site; Profile data, such as your
                  username and password, account settings, orders related to
                  you, user research, your interests, preferences, feedback and
                  survey responses; Usage data, such as information on how you
                  use the Site, products and Services or view any content on the
                  Site, including the time spent on the Site, items and data
                  searched for on the Site, access times and dates, as well as
                  websites you were visiting before you came to the Site and
                  other similar statistics; Location data, such as when you
                  capture and share your location with us in the form of
                  photographs or videos and upload such content to the Site;
                  Marketing and communications data, such as your preferences in
                  receiving marketing from us and our third parties, your
                  communication preferences and your chat, email or call history
                  on the Site or with third party customer service providers;
                  and Additional information we may request you to submit for
                  due diligence checks or required by relevant authorities as
                  required for identity verification (such as copies of
                  government issued identification, e.g. passport, ID cards,
                  etc.) or if we believe you are violating our Privacy Policy or
                  our Customer Terms and Conditions.
                </p>
              </div>

            <button
              onClick={(e) => {
                setShowTerms(false);
              }}
              className="mt-5 bg-blue-500 text-white py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </div>
      </PolicyModal>}
    </>
  );
};

export default Policy;
