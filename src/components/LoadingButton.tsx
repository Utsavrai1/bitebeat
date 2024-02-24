import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";

type Props = {
  className: string;
};

function LoadingButton({ className }: Props) {
  return (
    <Button disabled className={className}>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Loading
    </Button>
  );
}

export default LoadingButton;
