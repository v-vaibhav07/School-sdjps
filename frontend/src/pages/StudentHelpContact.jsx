function StudentHelpContact() {
  const contacts = [
    {
      title: "School Office",
      name: "Main Office",
      phone: "+91 9876543210",
      email: "office@school.com",
      icon: "🏫"
    },
    {
      title: "Principal",
      name: "Dr. R. Sharma",
      phone: "+91 9876500001",
      email: "principal@school.com",
      icon: "👨‍🏫"
    },
    {
      title: "Vice Principal",
      name: "Mrs. Neha Verma",
      phone: "+91 9876500002",
      email: "viceprincipal@school.com",
      icon: "📘"
    },
    {
      title: "Academic Coordinator",
      name: "Mr. Amit Singh",
      phone: "+91 9876500003",
      email: "coordinator@school.com",
      icon: "📚"
    },
    {
      title: "Accounts / Fees",
      name: "Fees Department",
      phone: "+91 9876500004",
      email: "accounts@school.com",
      icon: "💰"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 p-3 sm:p-5 md:p-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Heading */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Help & Contact
          </h1>
          <p className="text-sm sm:text-base text-gray-500 mt-1">
            Reach out to the school for support, academics, office help, and queries.
          </p>
        </div>

        {/* Top school contact card */}
        <div className="rounded-3xl bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 text-white shadow-xl p-5 sm:p-7 md:p-8">
          <h2 className="text-xl sm:text-2xl font-bold">School Contact Information</h2>
          <p className="text-white/85 mt-2 text-sm sm:text-base">
            For urgent issues, please contact the school office directly.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <TopInfo label="School Phone" value="+91 9876543210" icon="📞" />
            <TopInfo label="School Email" value="info@school.com" icon="📧" />
            <TopInfo label="Support Hours" value="Mon - Sat, 8 AM - 4 PM" icon="🕒" />
            <TopInfo label="Address" value="Main Road, Your City" icon="📍" />
          </div>
        </div>

        {/* Contact cards */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
          {contacts.map((item, index) => (
            <div
              key={index}
              className="rounded-2xl bg-white border border-gray-100 p-5 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm text-indigo-600 font-semibold">
                    {item.title}
                  </p>
                  <h3 className="text-lg font-bold text-gray-900 mt-1">
                    {item.name}
                  </h3>
                </div>
                <div className="text-2xl">{item.icon}</div>
              </div>

              <div className="mt-4 space-y-3">
                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="text-xs text-gray-500">Phone</p>
                  <a
                    href={`tel:${item.phone}`}
                    className="text-sm sm:text-base font-medium text-gray-800 break-all hover:text-indigo-600"
                  >
                    {item.phone}
                  </a>
                </div>

                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="text-xs text-gray-500">Email</p>
                  <a
                    href={`mailto:${item.email}`}
                    className="text-sm sm:text-base font-medium text-gray-800 break-all hover:text-indigo-600"
                  >
                    {item.email}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Help note */}
        <div className="mt-6 rounded-2xl border border-amber-100 bg-amber-50 p-4 sm:p-5">
          <h3 className="text-sm sm:text-base font-semibold text-amber-800">
            Need Help?
          </h3>
          <p className="text-sm text-amber-700 mt-1 leading-6">
            For attendance issues, fee problems, result corrections, or class-related concerns,
            contact the relevant department from the list above.
          </p>
        </div>
      </div>
    </div>
  )
}

function TopInfo({ label, value, icon }) {
  return (
    <div className="rounded-2xl bg-white/10 backdrop-blur border border-white/20 p-4">
      <div className="text-xl mb-2">{icon}</div>
      <p className="text-xs sm:text-sm text-white/75">{label}</p>
      <p className="text-sm sm:text-base font-semibold mt-1 break-words">{value}</p>
    </div>
  )
}

export default StudentHelpContact