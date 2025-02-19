import React, { useState } from 'react';
import { Bot } from 'lucide-react';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import type { Message } from './types';

// Comprehensive knowledge base for detailed responses
const knowledgeBase = {
  iphone: `The iPhone is Apple's flagship smartphone line that revolutionized mobile technology since its introduction in 2007. Here's a comprehensive overview:

1. Current Models (iPhone 15 Series):
   - iPhone 15 Pro Max: Premium model with titanium frame, A17 Pro chip, advanced cameras
   - iPhone 15 Pro: Similar features in a smaller form factor
   - iPhone 15 Plus: Larger display with A16 Bionic
   - iPhone 15: Base model with great features for most users

2. Key Features:
   - iOS operating system with regular updates
   - Advanced camera systems with computational photography
   - Face ID security
   - 5G connectivity
   - MagSafe charging technology

3. Global Impact:
   - Over 2.2 billion iPhones sold worldwide
   - Manufactured in multiple countries including China, India, Brazil
   - Available in 175 countries through Apple Stores and authorized resellers`,

  ai: `Artificial Intelligence (AI) is a transformative technology that encompasses:

1. Core Components:
   - Machine Learning
   - Natural Language Processing
   - Computer Vision
   - Robotics
   - Expert Systems

2. Applications:
   - Healthcare diagnostics
   - Autonomous vehicles
   - Financial trading
   - Personal assistants
   - Gaming and entertainment`,

  ecommerce: `E-commerce has transformed global retail. Here's a comprehensive overview:

1. Market Leaders:
   - Amazon: World's largest online retailer
   - Alibaba: Dominates Asian markets
   - Shopify: Powers millions of online stores
   - Walmart: Major omnichannel retailer

2. Key Trends:
   - Mobile commerce growth
   - Social commerce integration
   - AI-powered personalization
   - Sustainable shipping options
   - Voice commerce adoption

3. Global Statistics:
   - $5.7 trillion global e-commerce sales in 2023
   - 24% of retail sales are online
   - 2.14 billion digital buyers worldwide
   - 63% of shopping journeys start online`,

  technology: `Latest Technology Trends and Developments:

1. Artificial Intelligence & Machine Learning:
   - GPT-4 and advanced language models
   - AI in healthcare and drug discovery
   - Autonomous systems and robotics
   - Edge AI applications

2. Quantum Computing:
   - IBM's 1000+ qubit processor
   - Quantum supremacy achievements
   - Error correction advances
   - Industry applications emerging

3. Sustainable Tech:
   - Green data centers
   - Renewable energy integration
   - Carbon-neutral computing
   - E-waste reduction initiatives`,

  climate: `Global Climate Change and Environmental Issues:

1. Current Status:
   - Global temperature rise of 1.1°C since pre-industrial era
   - Sea level rise of 3.3mm per year
   - Arctic sea ice decline
   - Extreme weather events increasing

2. International Action:
   - Paris Agreement goals
   - Net-zero commitments
   - Renewable energy transition
   - Carbon pricing initiatives

3. Solutions in Progress:
   - Green hydrogen development
   - Carbon capture technology
   - Electric vehicle adoption
   - Reforestation projects`,

  business: `Global Business and Economic Trends:

1. Digital Transformation:
   - Remote work revolution
   - Cloud computing adoption
   - Digital payment growth
   - Cybersecurity importance

2. Sustainable Business:
   - ESG investing growth
   - Circular economy models
   - Green supply chains
   - Corporate responsibility

3. Market Dynamics:
   - Global trade patterns
   - Supply chain resilience
   - Emerging market growth
   - Innovation ecosystems`,

  healthcare: `Global Healthcare Developments:

1. Digital Health:
   - Telemedicine expansion
   - AI in diagnostics
   - Electronic health records
   - Wearable technology

2. Medical Advances:
   - mRNA vaccine technology
   - CRISPR gene editing
   - Personalized medicine
   - Digital therapeutics

3. Global Health:
   - Healthcare accessibility
   - Pandemic preparedness
   - Mental health awareness
   - Preventive care focus`
};

// Enhanced intelligent response system
const getAIResponse = (message: string) => {
  const lowercaseMsg = message.toLowerCase();
  
  // Check for specific knowledge topics
  if (lowercaseMsg.includes('iphone') || lowercaseMsg.includes('apple')) {
    return knowledgeBase.iphone;
  }
  
  if (lowercaseMsg.includes('ai') || lowercaseMsg.includes('artificial intelligence')) {
    return knowledgeBase.ai;
  }

  if (lowercaseMsg.includes('ecommerce') || lowercaseMsg.includes('online shopping') || lowercaseMsg.includes('retail')) {
    return knowledgeBase.ecommerce;
  }

  if (lowercaseMsg.includes('tech') || lowercaseMsg.includes('technology')) {
    return knowledgeBase.technology;
  }

  if (lowercaseMsg.includes('climate') || lowercaseMsg.includes('environment') || lowercaseMsg.includes('global warming')) {
    return knowledgeBase.climate;
  }

  if (lowercaseMsg.includes('business') || lowercaseMsg.includes('economy') || lowercaseMsg.includes('market')) {
    return knowledgeBase.business;
  }

  if (lowercaseMsg.includes('health') || lowercaseMsg.includes('medical') || lowercaseMsg.includes('healthcare')) {
    return knowledgeBase.healthcare;
  }

  // Check for question patterns
  if (lowercaseMsg.includes('what') || lowercaseMsg.includes('how') || lowercaseMsg.includes('explain')) {
    if (lowercaseMsg.includes('machine learning') || lowercaseMsg.includes('ml')) {
      return "Machine Learning is a subset of AI that focuses on developing systems that can learn and improve from experience without being explicitly programmed. It's based on the idea that systems can learn from data, identify patterns, and make decisions with minimal human intervention. Would you like to know more about specific ML techniques?";
    }
    if (lowercaseMsg.includes('neural network') || lowercaseMsg.includes('deep learning')) {
      return "Neural networks are computing systems inspired by biological neural networks in human brains. They're the foundation of deep learning, which uses multiple layers of these networks to progressively extract higher-level features from raw input. I can explain more about their architecture or applications if you're interested.";
    }
  }

  // Contextual responses
  if (lowercaseMsg.includes('latest') || lowercaseMsg.includes('news') || lowercaseMsg.includes('update')) {
    return "I can provide you with the latest information across various fields including technology, business, healthcare, and environmental developments. Which area would you like to know more about?";
  }

  if (lowercaseMsg.includes('trend') || lowercaseMsg.includes('future')) {
    return "I can discuss current trends and future projections in various fields such as technology, business, healthcare, and environmental sustainability. Which area interests you most?";
  }

  if (lowercaseMsg.includes('global') || lowercaseMsg.includes('worldwide')) {
    return "I can provide global perspectives on various topics including international business, technology adoption, climate change, and healthcare developments. What specific aspect would you like to explore?";
  }

  // Default responses for general conversation
  const responses = [
    "I'm knowledgeable about many topics including technology, business, healthcare, climate change, and global trends. What would you like to learn about?",
    "I can provide detailed information on various subjects from a global perspective. Which area interests you?",
    "I'm here to help with comprehensive information about any topic - from technology and business to healthcare and environmental issues. What would you like to explore?",
    "I can share insights about global trends, technological developments, business changes, or environmental issues. What interests you most?",
    "I have extensive knowledge about worldwide developments in technology, business, healthcare, and more. Which area would you like to discuss?"
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
};

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm A-X-L, an advanced AI assistant with comprehensive knowledge about global trends, technology, business, healthcare, and more. I can provide detailed information and insights about worldwide developments. What would you like to explore?",
      role: 'assistant',
      timestamp: new Date(),
    },
  ]);
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    // Simulate AI processing time with variable delay
    await new Promise((resolve) => setTimeout(resolve, Math.random() * 1000 + 500));

    const botResponse: Message = {
      id: (Date.now() + 1).toString(),
      content: getAIResponse(content),
      role: 'assistant',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, botResponse]);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-3">
          <div className="w-8 h-8 flex items-center justify-center rounded bg-gradient-to-r from-indigo-600 to-purple-600">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-semibold text-gray-900">A-X-L</h1>
        </div>
      </header>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {loading && (
          <div className="py-4 px-4 max-w-3xl mx-auto">
            <div className="flex gap-2 items-center text-gray-500">
              <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" />
              <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:0.2s]" />
              <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}
      </div>

      {/* Chat Input */}
      <ChatInput onSend={handleSendMessage} disabled={loading} />
    </div>
  );
}

export default App;