/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import PropTypes from "prop-types";

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white md:hidden">
        <div className="flex h-14 items-center justify-between px-4">
          <Button variant="ghost" className="p-0" onClick={() => navigate("/")}>
            <div className="bg-[#8B0000] rounded-full p-2 w-10 h-10 flex items-center justify-center">
              <span className="text-white font-bold text-sm">KMD</span>
            </div>
          </Button>
        </div>
      </header>

      <div className="flex">
        {/* Main Content */}
        <main className="flex-1">
          {/* Desktop Header */}
          <header className="hidden md:flex h-14 items-center justify-end border-b bg-white px-4"></header>

          {/* Page Content */}
          <div className="p-4 md:p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}

AuthLayout.propTypes = {
  children: PropTypes.element,
};

AuthLayout.defaultProps = {
  children: <></>,
};
