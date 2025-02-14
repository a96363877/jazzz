import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Download } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function RegisterPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/" className="text-primary hover:underline inline-flex items-center">
          <ArrowRight className="ml-2 h-4 w-4" />
          العودة إلى الصفحة الرئيسية
        </Link>
      </div>

      <Card className="overflow-hidden">
        <div className="bg-gradient-to-l from-blue-50 to-white p-6 flex items-center justify-between border-b">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-primary">البطاقة الذهبية</h2>
          </div>
          <div className="relative w-20 h-20">
            <img src="/ccpnet_ic.png" alt="Laptop icon" width={180} height={180} className="object-cover" />
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="text-center space-y-4">
            <p className="text-lg">
              تريد طلب بطاقة، التحقق من حالة طلبك أو تغيير مكتب الإستقبال؟ يرجى تسجيل الدخول إلى حسابك ECCP
            </p>
            <Link href={'/reset'}>
            <Button className="w-full md:w-auto" size="lg">
              تسجيل الدخول
            </Button>
            </Link>
          </div>

          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">ليس لديك حساب ECCP ؟</h3>
              <Link href={'/reset'}>

              <Button variant="outline" className="w-full md:w-auto" size="lg">
                فتح حساب على الانترنت
              </Button>
              </Link>
              <p className="text-sm text-muted-foreground mt-2">إذا كان لديك البطاقة الذهبية</p>
            </div>

            <div className="text-center">
              <p className="mb-4">أو</p>
              <p className="text-sm leading-relaxed mb-4">
                يمكنك الحصول على الرمز السري على مستوى أي مؤسسة بريدية مقابل تقديم نسخة عن بطاقة التعريف الوطنية في طور
                الصلاحية مصحوبة بالإستمارة أدناه
              </p>
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                تحميل الاستمارة
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </main>
  )
}

