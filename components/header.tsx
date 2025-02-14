import { Menu } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <header className="bg-white" dir="rtl">
      <div className="bg-[#003B7E]">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10"
            >
              <Menu className="h-6 w-6 text-yellow-500" />
              <span className="sr-only">القائمة</span>
            </Button>
            <div className="relative w-12 h-12">
              <Image
                src="/logo-round.png"
                alt="Algérie Poste"
                width={48}
                height={48}
                className="rounded-full p-1"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-4">
        <h1 className="text-3xl font-bold text-center relative inline-flex flex-col w-full">
          <span className="text-[#003B7E]">الحساب ECCP</span>
          <span className="h-1 bg-yellow-400 w-full mt-2" />
        </h1>
      </div>
    </header>
  );
}
