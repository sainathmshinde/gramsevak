import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { toast } from "@/components/ui/use-toast";
import WithAuthLayout from "@/components/layout/WithAuthLayout";
import { useNavigate } from "react-router-dom";

// Simulated server action
async function loginAction(prevState, formData) {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const mobile = formData.get("mobile");
  const otp = formData.get("otp");

  // Simple validation
  if (!mobile || !otp) {
    return { error: "Please fill in all fields" };
  }

  // Simulated successful login
  return { success: true };
}

function Login() {
  const navigate = useNavigate();
  // const [state, action, isPending] = useActionState(loginAction);
  const [otpSent, setOtpSent] = useState(false);

  const sendOtp = () => {
    // Simulate sending OTP
    setTimeout(() => {
      setOtpSent(true);
      // toast({
      //   title: "OTP Sent",
      //   description: "A One-Time Password has been sent to your mobile number.",
      // });
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Enter your mobile number and OTP to log in.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="mobile">Mobile Number</Label>
                <Input
                  id="mobile"
                  name="mobile"
                  placeholder="Enter your mobile number"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="otp">One-Time Password</Label>
                <Input
                  id="otp"
                  name="otp"
                  placeholder="Enter OTP"
                  disabled={!otpSent}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button
            className="w-full"
            onClick={() => {
              navigate("/approval-pending");
            }}
          >
            Send OTP
          </Button>
          <Button
            className="w-full"
            type="submit"
            form="login-form"
            onClick={() => {
              navigate("/uploaddocs");
            }}
          >
            Login
          </Button>
          {/* {state?.error && (
            <p className="text-sm text-red-500">{state.error}</p>
          )}
          {state?.success && (
            <p className="text-sm text-green-500">Login successful!</p>
          )} */}
        </CardFooter>
      </Card>
    </div>
  );
}

export default WithAuthLayout(Login);
