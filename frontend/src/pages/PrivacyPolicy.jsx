export default function PrivacyPolicy() {
  return (
    <div className="bg-slate-950 text-white min-h-screen py-16 font-sans">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h1 className="text-3xl font-black text-white">Privacy Policy</h1>
        <p className="text-xs text-slate-400">Last updated: {new Date().toLocaleDateString('en-GB')}</p>

        <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
          <p>
            S&B Petroleum & Retail Ltd is committed to protecting the privacy and personal data of our customers,
            website visitors, and commercial account holders in compliance with the UK Data Protection Act 2018 and UK GDPR.
          </p>
          <h3 className="text-base font-bold text-white pt-2">1. Data We Collect</h3>
          <p>
            We collect contact information submitted through our contact forms, B2B fuel card applications, valet
            appointments, and job application forms (name, email, phone number, vehicle registration plate, CV documents).
          </p>
          <h3 className="text-base font-bold text-white pt-2">2. Use of Your Data</h3>
          <p>
            Information collected is strictly used to fulfill service inquiries, confirm car care appointments, evaluate
            job candidates, and service commercial B2B fuel card accounts. We do not sell your personal data to third parties.
          </p>
          <h3 className="text-base font-bold text-white pt-2">3. Contact</h3>
          <p>
            For any data subject access requests or inquiries regarding our privacy practices, please contact us at{' '}
            <a href="mailto:info@aiyanlimited.com" className="text-teal-400 underline">
              info@aiyanlimited.com
            </a>.
          </p>
        </div>
      </div>
    </div>
  );
}
