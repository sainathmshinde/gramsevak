import WithAuthLayout from "@/components/layout/WithAuthLayout";
import WithLayout from "@/components/layout/WithLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";

function ApprovalPending() {
  return (
    <div className="min-h-screen bg-gradient-to-br  flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-purple-800">
            Approval Pending
          </CardTitle>
          <CardDescription className="text-center text-purple-600">
            Hang tight! Your request is being processed.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-6">
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="w-12 h-12 text-purple-600 animate-spin" />
            </div>
            <svg
              className="animate-spin-slow"
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#818cf8"
                strokeWidth="8"
                strokeDasharray="70 30"
              />
            </svg>
          </div>
          <p className="text-center text-gray-700 max-w-xs">
            You will be notified when the admin approves your request. We
            appreciate your patience!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default WithLayout(ApprovalPending);
