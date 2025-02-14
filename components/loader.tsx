import { Loader2 } from "lucide-react"

export function Loader({show}:any) {
  return (
    <div className={`flex flex-col fixed inset-0 z-50 flex items-center justify-center bg-background/50 backdrop-blur-lg ${show?'':'hidden'}`}>
      <div className=" text-blue-800 animate-spin">
        <Loader2 className="h-12 w-12" />
      </div>
      <div className="mt-2">
      <span className=" text-blue-800">جاري التحقق  ...</span>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  )
}

