import { useState, useEffect } from "react";
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
import WithAuthLayout from "@/components/layout/WithAuthLayout";
import { useNavigate } from "react-router-dom";
import { produce } from "immer";
import { login, sendOtp } from "@/services/auth";
import toast from "react-hot-toast";
import { userStore } from "@/lib/store";

function Login() {
  const navigate = useNavigate();
  const [otpSent, setOtpSent] = useState(false);
  const [loginDetails, setLoginDetails] = useState({
    mobileNumber: "",
    otp: "",
  });

  const [timer, setTimer] = useState(0); // Timer state
  const updateUser = userStore((state) => state.updateUser);

  // Timer countdown effect
  useEffect(() => {
    let countdown;
    if (timer > 0) {
      countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(countdown);
  }, [timer]);

  const handleChange = (name) => (e) => {
    const nextState = produce(loginDetails, (draft) => {
      draft[name] = e.target.value;
    });
    setLoginDetails(nextState);
  };

  const handleSendOtp = async () => {
    if (!loginDetails?.mobileNumber) {
      toast.error("कृपया मोबाइल क्रमांक प्रविष्ट करा");
      return;
    }

    let response = await sendOtp(loginDetails?.mobileNumber);
    if (response?.status === "success") {
      setOtpSent(true);
      setTimer(30); // Start 30-second timer
      toast.success("OTP यशस्वीरित्या पाठवला गेला!");
    } else {
      toast.error("OTP पाठवता आला नाही, कृपया पुन्हा प्रयत्न करा.");
    }
  };

  const handleLogin = async () => {
    if (!loginDetails.otp) {
      toast.error("कृपया OTP प्रविष्ट करा");
      return;
    }

    let response = await login(loginDetails);
    if (response?.status === "success") {
      updateUser(response?.data);
      navigate("/");
    } else {
      toast.error("लॉगिन अयशस्वी, कृपया तपासा");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>लॉगिन</CardTitle>
          <CardDescription>
            लॉगिन करण्यासाठी आपला मोबाइल क्रमांक आणि OTP प्रविष्ट करा.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="mobile">मोबाइल क्रमांक</Label>
                <Input
                  id="mobile"
                  name="mobile"
                  placeholder="आपला मोबाइल क्रमांक प्रविष्ट करा"
                  value={loginDetails?.mobileNumber}
                  onChange={handleChange("mobileNumber")}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="otp">वन-टाइम पासवर्ड</Label>
                <Input
                  id="otp"
                  name="otp"
                  placeholder="OTP प्रविष्ट करा"
                  disabled={!otpSent}
                  value={loginDetails?.otp}
                  onChange={handleChange("otp")}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button
            className="w-full"
            onClick={handleSendOtp}
            disabled={timer > 0}
          >
            {timer > 0 ? `OTP पुन्हा पाठवा (${timer} सेकंद)` : "OTP पाठवा"}
          </Button>
          <Button className="w-full" type="button" onClick={handleLogin}>
            लॉगिन
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default WithAuthLayout(Login);
