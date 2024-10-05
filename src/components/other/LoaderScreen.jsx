import { Loader2Icon } from "lucide-react";

export default function LoaderScreen() {
  return (
    <div className="absolute h-[100vh] w-[100vw] flex justify-center items-center">
      <Loader2Icon className="animate-spin" size={36} />
    </div>
  );
}
