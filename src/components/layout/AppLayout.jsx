/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { usePermissionStore, usePolicyStore, userStore } from "@/lib/store";
import useLocationHistory from "@/lib/useLocationHistory";
import { cn } from "@/lib/utils";
import {
  Building2,
  CircleUser,
  CreditCard,
  Download,
  FileCheck,
  FileInput,
  FilePlus,
  LayoutDashboard,
  Link,
  LogOut,
  Megaphone,
  Menu,
  RefreshCw,
  RotateCcw,
  Shield,
  ShoppingBag,
  ThumbsUp,
  Upload,
  User,
  Users,
} from "lucide-react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RButton from "../ui/rButton";

export default function AppLayout({ children }) {
  const navigate = useNavigate();
  const user = userStore((state) => state.user);
  const removeUser = userStore((state) => state.removeUser);
  const permissions = usePermissionStore((state) => state.permissions);
  const setMode = usePolicyStore((state) => state.setMode);
  const updatePolicyId = usePolicyStore((state) => state.updatePolicyId);
  const [showPensionerMenu, setShowPensionerMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isPensioner =
    user?.userType?.name?.toLowerCase().trim() === "pensioner";
  // Add this at the top level of your AppLayout component
  const location = useLocation();
  useLocationHistory();

  useEffect(() => {
    const lastVisitedPensioner = JSON.parse(
      sessionStorage.getItem("lastVisitedpensioner")
    );
    setShowPensionerMenu(!isPensioner && !!lastVisitedPensioner?.userId);
  }, [isPensioner]);

  const handleLogout = () => {
    sessionStorage.clear();
    removeUser();
    navigate("/login");
  };

  const MenuItem = ({ icon: Icon, text, onClick, permission, path }) => {
    const isActive = location.pathname === path;
    return (
      <div
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 transition-all cursor-pointer",
          isActive
            ? "bg-black text-white"
            : "text-gray-700 hover:bg-black hover:text-white"
        )}
        onClick={() => {
          onClick();
          setIsMobileMenuOpen(false);
        }}
      >
        <Icon className="h-4 w-4" />
        <span className="text-sm">{text}</span>
      </div>
    );
  };

  const AdminMenuItems = () => (
    <div className="space-y-3">
      {/* <p className="text-gray-700 uppercase font-extrabold mb-4 text-sm">
        Admin
      </p> */}
      <div className="space-y-1">
        <MenuItem
          icon={LayoutDashboard}
          text="Home"
          onClick={() => navigate("/")}
          path="/"
          // permission={permissions?.dashboard?.read}
        />
        <MenuItem
          icon={Users}
          text="Profile"
          onClick={() => navigate("/profile")}
          path="/profile"
          // permission={permissions?.users?.read}
        />
        <MenuItem
          icon={FileCheck}
          text="Books"
          onClick={() => navigate("/books")}
          path="/books"
          // permission={permissions?.importdata?.read}
        />
        {/* <MenuItem
          icon={ThumbsUp}
          text="Approve/Reject Gram sevaks"
          onClick={() => navigate("/approveadmins")}
          path="/approveadmins"
          // permission={permissions?.offlinepayments?.read}
        /> */}
        <MenuItem
          icon={Users}
          text="Block Admins"
          onClick={() => navigate("/block-admins")}
          path="/blockadmins"
          // permission={permissions?.offlinepayments?.read}
        />
        <MenuItem
          icon={Users}
          text="Gram sevaks"
          onClick={() => navigate("/gram-sevaks")}
          path="/gramsevaks"
          // permission={permissions?.offlinepayments?.read}
        />
        <MenuItem
          icon={Upload}
          text="Upload"
          onClick={() => navigate("/upload-books")}
          path="/uploadbooks"
          // permission={permissions?.createproduct?.read}
        />
      </div>
    </div>
  );

  const PensionerMenuItems = () => {
    const handleNavigateProfile = () => {
      if (!isPensioner) {
        const lastVisitedPensioner = JSON.parse(
          sessionStorage.getItem("lastVisitedpensioner")
        );
        if (lastVisitedPensioner?.userId) {
          navigate(`/?userId=${lastVisitedPensioner.userId}`);
        } else {
          navigate("/");
        }
      } else {
        navigate("/");
      }
    };

    const handleNavigatePolicies = () => {
      if (!isPensioner) {
        const lastVisitedPensioner = JSON.parse(
          sessionStorage.getItem("lastVisitedpensioner")
        );
        if (lastVisitedPensioner?.userId) {
          navigate(`/mypolicies?userId=${lastVisitedPensioner.userId}`);
        } else {
          navigate("/mypolicies");
        }
      } else {
        navigate("/mypolicies");
      }
    };

    const handleNavigatePayments = () => {
      if (!isPensioner) {
        const lastVisitedPensioner = JSON.parse(
          sessionStorage.getItem("lastVisitedpensioner")
        );
        if (lastVisitedPensioner?.userId) {
          navigate(`/payments?userId=${lastVisitedPensioner.userId}`);
        } else {
          navigate("/payments");
        }
      } else {
        navigate("/payments");
      }
    };

    const handleNavigateProductList = () => {
      if (!isPensioner) {
        const lastVisitedPensioner = JSON.parse(
          sessionStorage.getItem("lastVisitedpensioner")
        );
        setMode("new");
        updatePolicyId(0);
        if (lastVisitedPensioner?.userId) {
          navigate(`/productlist?userId=${lastVisitedPensioner.userId}`);
        } else {
          navigate("/productlist");
        }
      } else {
        navigate("/productlist");
      }
    };

    return (
      <div className="space-y-3">
        <p className="text-gray-700 uppercase font-extrabold mb-4 text-sm">
          Pensioner
        </p>
        <div className="space-y-1">
          <MenuItem
            icon={User}
            text="Profile"
            path="/Profile"
            onClick={handleNavigateProfile}
            // permission={permissions?.profile?.read}
          />
          <MenuItem
            icon={User}
            text="My Policies"
            path="/mypolicies"
            onClick={handleNavigatePolicies}
            // permission={permissions?.mypolicies?.read}
          />
          <MenuItem
            icon={ShoppingBag}
            text="Products"
            path="/productlist"
            onClick={handleNavigateProductList}
            // permission={permissions?.products?.read}
          />
          <MenuItem
            icon={CreditCard}
            text="Payments"
            path="/payments"
            onClick={handleNavigatePayments}
            // permission={permissions?.payments?.read}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white md:hidden">
        <div className="flex h-14 items-center justify-between px-4">
          <Button variant="ghost" className="p-0" onClick={() => navigate("/")}>
            <div className="bg-[#8B0000] rounded-full p-2 w-10 h-10 flex items-center justify-center">
              {/* <span className="text-white font-bold text-sm">KMD</span> */}
            </div>
          </Button>

          <div className="flex items-center gap-2">
            {user?.userName && (
              <span className="text-sm font-medium hidden sm:inline-block">
                Hello, {user.userName}
              </span>
            )}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <RButton
                  variant="outline"
                  size="icon"
                  className="h-9 w-9"
                  isDisabled={!user?.isProfileComplete}
                >
                  <Menu className="h-5 w-5" />
                </RButton>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 p-0">
                <div className="flex h-14 items-center border-b px-4">
                  <Button
                    variant="ghost"
                    className="p-0"
                    onClick={() => navigate("/")}
                  >
                    <div className="bg-[#8B0000] rounded-full p-2 w-10 h-10 flex items-center justify-center">
                      {/* <span className="text-white font-bold text-sm">KMD</span> */}
                    </div>
                  </Button>
                </div>
                <nav className="flex-1 overflow-y-auto">
                  <div className="flex flex-col p-4 space-y-6">
                    {permissions && (
                      <div
                        className={
                          !user?.isProfileComplete
                            ? "opacity-50 pointer-events-none"
                            : ""
                        }
                      >
                        <AdminMenuItems />

                        <PensionerMenuItems />
                      </div>
                    )}
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex md:w-64 lg:w-72 flex-col fixed h-screen border-r bg-white">
          <div className="flex h-14 items-center border-b px-4">
            <Button
              variant="ghost"
              className="p-0"
              onClick={() => navigate("/")}
            >
              {/* <div className="bg-[#8B0000] rounded-full p-2 w-12 h-12 flex items-center justify-center">
                <span className="text-white font-bold text-lg">KMD</span>
              </div> */}
            </Button>
          </div>
          <nav className="flex-1 overflow-y-auto p-4">
            {/* {permissions && (
              <div
                className={
                  !user?.isProfileComplete
                    ? "opacity-50 pointer-events-none"
                    : ""
                }
              > */}
            <AdminMenuItems />
            {/* <PensionerMenuItems /> */}
            {/* </div>
            )} */}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 md:ml-64 lg:ml-72">
          {/* Desktop Header */}
          <header className="hidden md:flex h-14 items-center justify-end border-b bg-white px-4">
            <div className="flex items-center gap-4">
              {user?.userName && (
                <span className="font-medium">Hello, {user.userName}</span>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <CircleUser className="h-6 w-6 text-[#8B0000]" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() =>
                      navigate(isPensioner ? "/" : "/adminprofile")
                    }
                  >
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          {/* Page Content */}
          <div className="p-4 md:p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}

AppLayout.propTypes = {
  children: PropTypes.element,
};

AppLayout.defaultProps = {
  children: <></>,
};
