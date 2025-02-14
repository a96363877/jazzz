import Image from "next/image"
import Link from "next/link"

export default function Page() {
  const services = [
    {
      title: "مستخلص كشف الحساب",
      description: "CCP اطلع على رصيد حساب",
      href: "/register",
      bgColor: "bg-blue-100",
      icon: "/extrait_ic.png",
    },
    {
      title: "تسجيل الدخول",
      description: "ECCP تسجيل الدخول و فتح حساب",
      href: "/register",
      bgColor: "bg-blue-50",
      icon: "/icons8-key-100.png",
    },
    {
      title: "كشف الحساب",
      description: "CCP كشف تفصيلي لعمليات حساب",
      href: "/register",
      bgColor: "bg-emerald-100",
      icon: "/releve.png",
    },
    {
      title: "SMS الإشعار عبر",
      description: "تلقي إشعار عبر SMS لكل معاملة إيداع أو سحب",
      href: "/register",
      bgColor: "bg-sky-100",
      icon: "/notif_ic.png",
    },
    {
      title: "دفتر الصكوك",
      description: "اطلب أن تتبع دفتر الصكوك",
      href: "/register",
      bgColor: "bg-blue-50",
      icon: "/tracking_ic.png",
    },
    {
      title: "البطاقة الذهبية",
      description: "اطلب أن تتبع بالبطاقة الذهبية",
      href: "/register",
      bgColor: "bg-amber-50",
      icon: "/card.png",
    },
  ]

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-12 text-[#003366]">ECCP - بريد الجزائر</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service, index) => (
          <Link key={index} href={service.href} className="group">
            <div className={`${service.bgColor} rounded-lg p-6 transition-transform transform hover:scale-105`}>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-[#003366] mb-2">{service.title}</h2>
                  <p className="text-sm text-gray-600">{service.description}</p>
                </div>
                <div className="w-24 h-24 relative">
                  <img
                    src={service.icon || "/placeholder.svg"}
                    alt={service.title}
                    width={96}
                    height={96}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}

