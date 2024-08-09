import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';

const PrivacyPolicy = () => {
  return (
    <>
    <Navbar></Navbar>
        <title>Privacy Policy</title>

    <div>
      <header className="text-dark p-3 text-center">
        <h1>Privacy Policy</h1>
      </header>

      <div className="container mt-5">
        <section>
          <h2>Introduction</h2>
          <p>
            Welcome to [Your Company Name]. We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website [your website URL], including any other media form, media channel, mobile website, or mobile application related or connected thereto (collectively, the “Site”).
          </p>
          <p>
            Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
          </p>
        </section>

        <section>
          <h2>Information We Collect</h2>
          <p>
            We may collect information about you in a variety of ways. The information we may collect on the Site includes:
          </p>
          <ul>
            <li>
              <strong>Personal Data:</strong> Personally identifiable information, such as your name, shipping address, email address, and telephone number, and demographic information, such as your age, gender, hometown, and interests, that you voluntarily give to us when you register with the Site or when you choose to participate in various activities related to the Site, such as online chat and message boards.
            </li>
            <li>
              <strong>Derivative Data:</strong> Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.
            </li>
            <li>
              <strong>Financial Data:</strong> Financial information, such as data related to your payment method (e.g., valid credit card number, card brand, expiration date) that we may collect when you purchase, order, return, exchange, or request information about our services from the Site.
            </li>
            <li>
              <strong>Mobile Device Data:</strong> Device information, such as your mobile device ID, model, and manufacturer, and information about the location of your device, if you access the Site from a mobile device.
            </li>
          </ul>
        </section>

        <section>
          <h2>Use of Your Information</h2>
          <p>
            We may use information collected about you via the Site to:
          </p>
          <ul>
            <li>Assist law enforcement and respond to subpoenas.</li>
            <li>Compile anonymous statistical data and analysis for use internally or with third parties.</li>
            <li>Create and manage your account.</li>
            <li>Deliver targeted advertising, coupons, newsletters, and other information regarding promotions and the Site to you.</li>
            <li>Email you regarding your account or order.</li>
            <li>Enable user-to-user communications.</li>
            <li>Fulfill and manage purchases, orders, payments, and other transactions related to the Site.</li>
            <li>Generate a personal profile about you to make future visits to the Site more personalized.</li>
            <li>Increase the efficiency and operation of the Site.</li>
            <li>Monitor and analyze usage and trends to improve your experience with the Site.</li>
          </ul>
        </section>

        <section>
          <h2>Disclosure of Your Information</h2>
          <p>
            We may share information we have collected about you in certain situations. Your information may be disclosed as follows:
          </p>
          <ul>
            <li>
              <strong>By Law or to Protect Rights:</strong> If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.
            </li>
            <li>
              <strong>Third-Party Service Providers:</strong> We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.
            </li>
            <li>
              <strong>Marketing Communications:</strong> With your consent, or with an opportunity for you to withdraw consent, we may share your information with third parties for marketing purposes, as permitted by law.
            </li>
            <li>
              <strong>Affiliates:</strong> We may share your information with our affiliates, in which case we will require those affiliates to honor this Privacy Policy. Affiliates include our parent company and any subsidiaries, joint venture partners, or other companies that we control or that are under common control with us.
            </li>
            <li>
              <strong>Business Partners:</strong> We may share your information with our business partners to offer you certain products, services, or promotions.
            </li>
            <li>
              <strong>Other Third Parties:</strong> We may share your information with advertisers and investors for the purpose of conducting general business analysis. We may also share your information with such third parties for marketing purposes, as permitted by law.
            </li>
          </ul>
        </section>

        <section>
          <h2>Security of Your Information</h2>
          <p>
            We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
          </p>
        </section>

        <section>
          <h2>Policy for Children</h2>
          <p>
            We do not knowingly solicit information from or market to children under the age of 13. If we learn that we have collected information from a child under age 13 without verification of parental consent, we will delete that information as quickly as possible. If you become aware of any data we have collected from children under age 13, please contact us at [Your Contact Information].
          </p>
        </section>

        <section>
          <h2>Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal, or regulatory reasons. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
          </p>
        </section>

        <section>
          <h2>Contact Us</h2>
          <p>
            If you have questions or comments about this Privacy Policy, please contact us at:
          </p>
          <ul>
            <li>[Your Company Name]</li>
            <li>[Your Address]</li>
            <li>[Your Phone Number]</li>
            <li>[Your Email Address]</li>
          </ul>
        </section>
      </div>

      
    </div>
    <Footer></Footer>
    </>
  );
};

export default PrivacyPolicy;
