import React from 'react';
import Header from './components/Header';
import CategoryBar from './components/CategoryBar';
import FeaturedCarousel from './components/FeaturedCarousel';
import ProductGrid from './components/ProductGrid';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <CategoryBar />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <FeaturedCarousel />
        <ProductGrid />
      </main>
    </div>
  );
}

export default App;