export default function AdminHelpCenterPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Help Center</h1>
        <p className="text-sm text-slate-600">Dapatkan bantuan, dokumentasi, dan panduan penggunaan admin.</p>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Support Resources</h2>
        <ul className="mt-4 space-y-3 text-slate-600">
          <li>• Panduan pengguna</li>
          <li>• FAQ dan troubleshooting</li>
          <li>• Hubungi tim support</li>
        </ul>
      </div>
    </div>
  );
}
