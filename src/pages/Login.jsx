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

  const updateUser = userStore((state) => state.updateUser);

  const handleChange = (name) => (e) => {
    const nextState = produce(loginDetails, (draft) => {
      switch (name) {
        case "mobileNumber":
          draft[name] = e.target.value;
          break;

        case "otp":
          draft[name] = e.target.value;
          break;

        default:
          break;
      }
    });

    setLoginDetails(nextState);
  };

  const handleSendOtp = async () => {
    let response = await sendOtp(loginDetails?.mobileNumber);
    if (response?.status === "success") {
      setOtpSent(true);
      toast.success("OTP यशस्वीरित्या पाठवला गेला!");
    } else {
      toast.error("OTP पाठवता आला नाही, कृपया पुन्हा प्रयत्न करा.");
    }
  };

  const hadleLogin = async () => {
    let response = await login(loginDetails);
    if (response?.status === "success") {
      updateUser(response?.data);
      navigate("/");
    } else {
      console.log("त्रुटी");
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
          <Button className="w-full" onClick={handleSendOtp}>
            OTP पाठवा
          </Button>
          <Button
            className="w-full"
            type="submit"
            form="login-form"
            onClick={hadleLogin}
          >
            लॉगिन
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default WithAuthLayout(Login);
