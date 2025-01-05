import { useState } from "react";
import PolicyModal from "./PolicyModal";

const TermsAndConditions = ({ showTerms, setShowTerms }) => {
  return (
    <>
     { showTerms && <PolicyModal setOpen={setShowTerms}>
        <div className=" ms-center z-50">
          <div className="bg-white p-5 rounded-lg   overflow-auto">
            <h2 className="text-xl font-bold mb-4 border-b">Terms & Conditions</h2>
            <p className="text-sm leading-4">
              <strong>1. INTRODUCTION</strong>
              <br />
              Welcome to zanmart.com, also hereby known as &quote;we&quot;,
              &quot;us&quot; or &quot;zanmart&quot;. We are an online
              marketplace, and these are the terms and conditions governing your
              access and use of zanmart along with its related sub-domains,
              sites, mobile app, services, and tools (the &quot;Site&quot;). By
              using the Site, you hereby accept these terms and conditions
              (including the linked information herein) and represent that you
              agree to comply with these terms and conditions (the &quot;User
              Agreement&quot;). This User Agreement is deemed effective upon
              your use of the Site, which signifies your acceptance of these
              terms. If you do not agree to be bound by this User Agreement,
              please do not access, register with, or use this Site.
              <br />
              <br />
              This Site is owned and operated by zanmart Bangladesh Limited, a
              company incorporated under the Companies Act, 1994, (Registration
              Number: 117773/14).
              <br />
              <br />
              The Site reserves the right to change, modify, add, or remove
              portions of these Terms and Conditions at any time without any
              prior notification. Changes will be effective when posted on the
              Site with no other notice provided. Please check these Terms and
              Conditions regularly for updates. Your continued use of the Site
              following the posting of changes to Terms and Conditions of use
              constitutes your acceptance of those changes.
              <br />
              <br />
              <strong>CONDITIONS OF USE</strong>
              <br />
              <strong>A. YOUR ACCOUNT</strong>
              <br />
              To access certain services offered by the platform, we may require
              that you create an account with us or provide personal information
              to complete the creation of an account. We may, at any time, in
              our sole and absolute discretion, invalidate the username and/or
              password without giving any reason or prior notice and shall not
              be liable or responsible for any losses suffered by, caused by,
              arising out of, in connection with, or by reason of such request
              or invalidation.
              <br />
              <br />
              You are responsible for maintaining the confidentiality of your
              user identification, password, account details, and related
              private information. You agree to accept this responsibility and
              ensure your account and its related details are maintained
              securely at all times and all necessary steps are taken to prevent
              misuse of your account. You should inform us immediately if you
              have any reason to believe that your password has become known to
              anyone else, or if the password is being, or is likely to be, used
              in an unauthorized manner.
              <br />
              <br />
              You agree and acknowledge that any use of the Site and related
              services offered and/or any access to private information, data,
              or communications using your account and password shall be deemed
              to be either performed by you or authorized by you as the case may
              be. You agree to be bound by any access of the Site and/or use of
              any services offered by the Site (whether such access or use is
              authorized by you or not). You agree that we shall be entitled
              (but not obliged) to act upon, rely on, or hold you solely
              responsible and liable in respect thereof as if the same were
              carried out or transmitted by you. You further agree and
              acknowledge that you shall be bound by and agree to fully
              indemnify us against any and all losses arising from the use of or
              access to the Site through your account.
              <br />
              <br />
              Please ensure that the details you provide us with are correct and
              complete at all times. You are obligated to update details about
              your account in real-time by accessing your account online. For
              information, you are not able to update by accessing Your Account
              on the Site, you must inform us via our customer service
              communication channels to assist you with these changes.
              <br />
              <br />
              We reserve the right to refuse access to the Site, terminate
              accounts, remove or edit content at any time without prior notice
              to you. We may, at any time in our sole and absolute discretion,
              request that you update your Personal Data or forthwith invalidate
              the account or related details without giving any reason or prior
              notice and shall not be liable or responsible for any losses
              suffered by or caused by you or arising out of or in connection
              with or by reason of such request or invalidation. You hereby
              agree to change your password from time to time and to keep your
              account secure and also shall be responsible for the
              confidentiality of your account and liable for any disclosure or
              use (whether such use is authorized or not) of the username and/or
              password.
              {/* You can continue adding more sections here */}
            </p>

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

export default TermsAndConditions;
