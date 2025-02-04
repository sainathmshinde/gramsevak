import WithLayout from "@/components/layout/WithLayout";
import { Button } from "@/components/ui/button";
import { BookOpen, Download, Search } from "lucide-react";

function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-down">
              Unlock the Power of Knowledge
            </h1>
            <p className="text-xl md:text-2xl mb-8 animate-fade-in-up">
              Search, explore, and download books with ease. Your personal
              library, reimagined.
            </p>
            <Button size="lg" className="animate-bounce">
              Get Started
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Powerful Features at Your Fingertips
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Search className="w-12 h-12 text-purple-600" />}
                title="Advanced Search"
                description="Search any rule or content across all uploaded books with precision."
              />
              <FeatureCard
                icon={<BookOpen className="w-12 h-12 text-purple-600" />}
                title="Extensive Library"
                description="Access a vast collection of books, including GRs and more."
              />
              <FeatureCard
                icon={<Download className="w-12 h-12 text-purple-600" />}
                title="Easy Downloads"
                description="Download any book with a single click for offline reading."
              />
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="bg-indigo-700 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Dive In?</h2>
            <p className="text-xl mb-8">
              Start exploring our vast library and powerful search features
              today.
            </p>
            <Button variant="secondary" size="lg">
              Explore Now
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h3 className="text-2xl font-bold mb-4">BookSearch Pro</h3>
              <p>
                Your ultimate platform for book exploration and knowledge
                discovery.
              </p>
            </div>
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul>
                <li>
                  {/* <Link href="#" className="hover:text-purple-400"> */}
                  Home
                  {/* </Link> */}
                </li>
                <li>
                  {/* <Link href="#" className="hover:text-purple-400"> */}
                  Search
                  {/* </Link> */}
                </li>
                <li>
                  {/* <Link href="#" className="hover:text-purple-400"> */}
                  Library
                  {/* </Link> */}
                </li>
                <li>
                  {/* <Link href="#" className="hover:text-purple-400"> */}
                  About Us
                  {/* </Link> */}
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/3">
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
              <p>Email: info@booksearchpro.com</p>
              <p>Phone: (123) 456-7890</p>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p>&copy; 2023 BookSearch Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md transition-transform hover:scale-105">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-center">{title}</h3>
      <p className="text-gray-600 text-center">{description}</p>
    </div>
  );
}

export default WithLayout(Dashboard);
