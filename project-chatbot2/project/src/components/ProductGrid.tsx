import React from 'react';
import { Star } from 'lucide-react';

const products = [
  {
    id: 1,
    name: "Wireless Noise-Cancelling Headphones",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    rating: 4.5,
    reviews: 128,
    discount: 20
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    rating: 4.8,
    reviews: 256,
    discount: 15
  },
  {
    id: 3,
    name: "Premium Running Shoes",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
    rating: 4.7,
    reviews: 512,
    discount: 0
  },
  {
    id: 4,
    name: "4K Ultra HD Smart TV",
    price: 699.99,
    image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=500",
    rating: 4.6,
    reviews: 89,
    discount: 10
  },
  {
    id: 5,
    name: "Professional DSLR Camera",
    price: 1299.99,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500",
    rating: 4.9,
    reviews: 164,
    discount: 5
  },
  {
    id: 6,
    name: "Gaming Laptop",
    price: 1499.99,
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500",
    rating: 4.7,
    reviews: 235,
    discount: 12
  }
];

export default function ProductGrid() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              {product.discount > 0 && (
                <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
                  -{product.discount}%
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2 line-clamp-2">{product.name}</h3>
              <div className="flex items-center mb-2">
                <div className="flex items-center text-yellow-400">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
                </div>
                <span className="text-sm text-gray-500 ml-2">({product.reviews} reviews)</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  {product.discount > 0 ? (
                    <>
                      <span className="text-lg font-bold text-red-500">
                        ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                      </span>
                      <span className="ml-2 text-sm text-gray-500 line-through">
                        ${product.price}
                      </span>
                    </>
                  ) : (
                    <span className="text-lg font-bold">${product.price}</span>
                  )}
                </div>
                <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}