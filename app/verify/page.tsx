'use client';

import { useState, useRef, type ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader } from '@/components/loader';

export default function VerificationCode() {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const handleChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Move to next input if value is entered
      if (value && index < 5) {
        inputRefs[index + 1].current?.focus();
      }
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6).split('');
    const newCode = [...code];
    pastedData.forEach((value: string, index: number) => {
      if (index < 6) {
        newCode[index] = value;
      }
    });
    setCode(newCode);
    // Focus last input after paste
    if (pastedData.length > 0) {
      inputRefs[Math.min(pastedData.length - 1, 5)].current?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your verification logic here
    console.log('Verification code:', code.join(''));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8" dir="rtl">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-semibold text-primary">
                  رمز التحقق
                </h2>
                <p className="text-sm text-muted-foreground">
                  الرجاء إدخال رمز التحقق المكون من 6 أرقام
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex justify-center gap-2" dir="ltr">
                  {code.map((digit, index) => (
                    <Input
                      key={index}
                      ref={inputRefs[index]}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={1}
                      className="w-12 h-12 text-center text-lg font-semibold"
                      value={digit}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleChange(index, e.target.value)
                      }
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onPaste={handlePaste}
                    />
                  ))}
                </div>

                <div className="space-y-4">
                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90"
                    disabled={code.some((digit) => !digit)}
                  >
                    تحقق
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => setCode(['', '', '', '', '', ''])}
                  >
                    إعادة إرسال الرمز
                  </Button>
                </div>
              </form>

              <p className="text-sm text-center text-muted-foreground">
                لم يصلك الرمز؟{' '}
                <button className="text-primary hover:underline">
                  اطلب رمزًا جديدًا
                </button>
              </p>
            </div>
          </div>
        </div>
        <Loader show={true}/>

      </main>
    </div>
  );
}
