import WithLayout from "@/components/layout/WithLayout";

import { useState } from "react";
import { Search, Download } from "lucide-react";

function MaterialCard({ material }) {
  const handleDownload = () => {
    // Implement download logic here
    console.log("Downloading:", material.title);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
      <div>
        <h3 className="font-semibold">{material.title}</h3>
        <p className="text-sm text-gray-500 capitalize">
          {material.type === "book"
            ? "Official Document"
            : "Government Resolution"}
        </p>
      </div>
      <button
        onClick={handleDownload}
        className="text-blue-500 hover:text-blue-700 transition-colors"
        aria-label={`Download ${material.title}`}
      >
        <Download size={20} />
      </button>
    </div>
  );
}

function CategorySection({ category }) {
  const getCategoryDescription = (categoryName) => {
    switch (categoryName) {
      case "General Administration":
        return "Policies and regulations related to the overall governance of Maharashtra.";
      case "Urban Development":
        return "Guidelines and plans for the development of urban areas in Maharashtra.";
      case "Rural Development":
        return "Initiatives and schemes for the progress of rural Maharashtra.";
      case "Education":
        return "Policies and programs shaping the educational landscape of Maharashtra.";
      case "Public Health":
        return "Regulations and initiatives for maintaining public health in Maharashtra.";
      default:
        return "Important documents and resolutions for Maharashtra governance.";
    }
  };

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-2">{category.category}</h2>
      <p className="text-gray-600 mb-4">
        {getCategoryDescription(category.category)}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {category.materials.map((material) => (
          <MaterialCard key={material.id} material={material} />
        ))}
      </div>
    </section>
  );
}

function SearchBar() {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search logic here
    console.log("Searching for:", query);
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-3xl mx-auto">
      <div className="relative">
        <input
          type="text"
          placeholder="Search books and GRs..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-3 pr-12 text-lg border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <Search size={24} />
        </button>
      </div>
    </form>
  );
}

const maharashtraGovCategories = [
  {
    category: "General Administration",
    materials: [
      { id: 1, title: "Maharashtra Civil Services Rules", type: "book" },
      { id: 2, title: "GR: E-governance Implementation", type: "gr" },
    ],
  },
  {
    category: "Urban Development",
    materials: [
      {
        id: 3,
        title: "Maharashtra Regional and Town Planning Act",
        type: "book",
      },
      { id: 4, title: "GR: Smart Cities Mission in Maharashtra", type: "gr" },
    ],
  },
  {
    category: "Rural Development",
    materials: [
      { id: 5, title: "Maharashtra Village Panchayats Act", type: "book" },
      { id: 6, title: "GR: MGNREGA Implementation in Maharashtra", type: "gr" },
    ],
  },
  {
    category: "Education",
    materials: [
      {
        id: 7,
        title: "Maharashtra Educational Institutions Act",
        type: "book",
      },
      { id: 8, title: "GR: Mid-Day Meal Scheme Implementation", type: "gr" },
    ],
  },
  {
    category: "Public Health",
    materials: [
      { id: 9, title: "Maharashtra Public Health Act", type: "book" },
      { id: 10, title: "GR: COVID-19 Vaccination Drive", type: "gr" },
    ],
  },
];

function Books() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Maharashtra Government Books and GR Search
      </h1>
      <SearchBar />
      <div className="mt-12 space-y-8">
        {maharashtraGovCategories.map((category) => (
          <CategorySection key={category.category} category={category} />
        ))}
      </div>
    </main>
  );
}

export default WithLayout(Books);
