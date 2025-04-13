import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl mt-10">
      <div className="bg-gray-900 text-white shadow-lg rounded-lg overflow-hidden">
        <div className="text-center border-b border-gray-700 pb-6 mb-6 pt-6">
          <h1 className="text-3xl font-bold">DevTinder Privacy Policy</h1>
          <p className="text-gray-400 mt-2"><strong>Last Updated: April 13, 2025</strong></p>
        </div>

        {/* Update all section headers to this style: */}
        <div className="px-6 pb-8">
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-3 text-blue-400">1. Introduction</h2>
            <p className="mb-4 text-gray-300 leading-relaxed">
              Welcome to DevTinder. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the platform.
            </p>
          </section>

          {/* Continue with the rest of the sections, using these colors:
              - Section headers: text-blue-400
              - Paragraph text: text-gray-300
              - Subheaders: text-gray-200
              - List items: text-gray-300
          */}
          
          {/* Example of how to update the Contact Us section */}
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-3 text-blue-400">11. Contact Us</h2>
            <p className="mb-2 text-gray-300 leading-relaxed">
              If you have questions about this Privacy Policy or our practices, please contact us at:
            </p>
            <p className="mb-1 text-gray-300"><strong className="text-gray-200">Email:</strong> privacy@devtinder.com</p>
            <p className="mb-4 text-gray-300"><strong className="text-gray-200">Address:</strong> Walchand College of Engineering, Sangli</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;