export default function Terms() {
  return (
    <div className="bg-slate-950 text-white min-h-screen py-16 font-sans">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h1 className="text-3xl font-black text-white">Terms of Service</h1>
        <p className="text-xs text-slate-400">Last updated: {new Date().toLocaleDateString('en-GB')}</p>

        <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
          <p>
            Welcome to S&B Petroleum. By using our website, submitting booking requests, or applying for commercial fuel
            accounts, you agree to comply with the following terms and conditions.
          </p>
          <h3 className="text-base font-bold text-white pt-2">1. Forecourt Fuel & Services</h3>
          <p>
            Live fuel prices displayed on our website reflect current forecourt pump rates at our Cleadon station and are
            subject to daily market fluctuations.
          </p>
          <h3 className="text-base font-bold text-white pt-2">2. Valeting Bookings</h3>
          <p>
            Valet slot reservations booked online require accurate vehicle registration plate details. Please notify us at
            least 2 hours in advance if you need to reschedule your appointment.
          </p>
        </div>
      </div>
    </div>
  );
}
