import React, { useState } from 'react';
import { Search, Mic, ShoppingCart, User, Camera, Heart, Bell } from 'lucide-react';
import VoiceSearch from './VoiceSearch';
import ImageSearch from './ImageSearch';

export default function Header() {
  const [showVoiceSearch, setShowVoiceSearch] = useState(false);
  const [showImageSearch, setShowImageSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <header className="bg-orange-500 py-4 px-6 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <div className="text-white text-2xl font-bold">E-Shop</div>
          <div className="flex items-center space-x-4 text-white">
            <a href="/become-seller" className="text-sm hover:underline">Become a Seller</a>
            <a href="/help" className="text-sm hover:underline">Help & Support</a>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="relative flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full py-2 px-4 rounded-l-lg focus:outline-none"
              />
              <button className="bg-white p-2 hover:bg-gray-100">
                <Search className="w-5 h-5 text-gray-600" />
              </button>
              <button 
                onClick={() => setShowVoiceSearch(true)}
                className="bg-white p-2 hover:bg-gray-100"
              >
                <Mic className="w-5 h-5 text-gray-600" />
              </button>
              <button 
                onClick={() => setShowImageSearch(true)}
                className="bg-white p-2 rounded-r-lg hover:bg-gray-100"
              >
                <Camera className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-6 text-white">
            <a href="/wishlist" className="flex items-center hover:text-gray-200">
              <Heart className="w-6 h-6" />
              <span className="ml-2 hidden sm:inline">Wishlist</span>
            </a>
            <a href="/notifications" className="flex items-center hover:text-gray-200">
              <Bell className="w-6 h-6" />
              <span className="ml-2 hidden sm:inline">Notifications</span>
            </a>
            <a href="/cart" className="flex items-center hover:text-gray-200">
              <ShoppingCart className="w-6 h-6" />
              <span className="ml-2 hidden sm:inline">Cart</span>
            </a>
            <a href="/account" className="flex items-center hover:text-gray-200">
              <User className="w-6 h-6" />
              <span className="ml-2 hidden sm:inline">Account</span>
            </a>
          </div>
        </div>
      </div>

      {showVoiceSearch && (
        <VoiceSearch 
          onClose={() => setShowVoiceSearch(false)}
          onResult={(text) => {
            setSearchQuery(text);
            setShowVoiceSearch(false);
          }}
        />
      )}
      
      {showImageSearch && (
        <ImageSearch 
          onClose={() => setShowImageSearch(false)}
          onResult={(text) => {
            setSearchQuery(text);
            setShowImageSearch(false);
          }}
        />
      )}
    </header>
  );
}