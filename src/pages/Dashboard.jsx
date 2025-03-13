import WithAuthentication from "@/components/hoc/withAuthentication";
import WithPermission from "@/components/hoc/withPermissions";
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
              ज्ञानाची शक्ती अनलॉक करा
            </h1>
            <p className="text-xl md:text-2xl mb-8 animate-fade-in-up">
              सहजपणे शोधा, एक्सप्लोर करा आणि पुस्तके डाउनलोड करा. तुमचे वैयक्तिक
              ग्रंथालय, नव्याने तयार करा.
            </p>
            <Button size="lg" className="animate-bounce">
              सुरुवात करा
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              शक्तिशाली वैशिष्ट्ये तुमच्या हातात
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Search className="w-12 h-12 text-purple-600" />}
                title="प्रगत शोध"
                description="सर्व अपलोड केलेल्या पुस्तकांमध्ये कोणतेही नियम किंवा सामग्री अचूकतेने शोधा."
              />
              <FeatureCard
                icon={<BookOpen className="w-12 h-12 text-purple-600" />}
                title="विशाल ग्रंथालय"
                description="GRs आणि अधिक यांसारख्या पुस्तकांचा मोठा संग्रह मिळवा."
              />
              <FeatureCard
                icon={<Download className="w-12 h-12 text-purple-600" />}
                title="सुलभ डाउनलोड"
                description="ऑफलाइन वाचनासाठी कोणतेही पुस्तक एका क्लिकवर डाउनलोड करा."
              />
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="bg-indigo-700 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">
              सुरू करण्यासाठी तयार आहात?
            </h2>
            <p className="text-xl mb-8">
              आजच आमचे विशाल ग्रंथालय आणि शक्तिशाली शोध वैशिष्ट्ये एक्सप्लोर
              करा.
            </p>
            <Button variant="secondary" size="lg">
              आता एक्सप्लोर करा
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h3 className="text-2xl font-bold mb-4">बुकसर्च प्रो</h3>
              <p>पुस्तक संशोधन आणि ज्ञान शोधण्यासाठी तुमचा अंतिम प्लॅटफॉर्म.</p>
            </div>
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h4 className="text-lg font-semibold mb-4">त्वरित दुवे</h4>
              <ul>
                <li>मुख्यपृष्ठ</li>
                <li>शोध</li>
                <li>ग्रंथालय</li>
                <li>आमच्याबद्दल</li>
              </ul>
            </div>
            <div className="w-full md:w-1/3">
              <h4 className="text-lg font-semibold mb-4">संपर्क करा</h4>
              <p>ईमेल: info@booksearchpro.com</p>
              <p>फोन: (123) 456-7890</p>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p>&copy; 2023 बुकसर्च प्रो. सर्व हक्क राखीव.</p>
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

export default WithAuthentication(
  WithPermission("home")(WithLayout(Dashboard))
);
