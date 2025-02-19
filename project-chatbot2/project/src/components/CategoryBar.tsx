import React from 'react';
import { ChevronDown } from 'lucide-react';

const categories = [
  "Electronics",
  "Fashion",
  "Home & Living",
  "Beauty",
  "Sports & Outdoor",
  "Automotive",
  "Books & Media",
  "Health & Wellness"
];

export default function CategoryBar() {
  return (
    <div className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center space-x-8 py-2 overflow-x-auto">
          {categories.map((category) => (
            <div
              key={category}
              className="flex items-center space-x-1 cursor-pointer whitespace-nowrap text-gray-600 hover:text-orange-500"
            >
              <span>{category}</span>
              <ChevronDown className="w-4 h-4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}