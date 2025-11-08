'use client';
import Image from "next/image";
import { useState, FormEvent, ChangeEvent, useEffect } from "react";
import Link from "next/link";
import pricingData from '@/data/pricing.json';
import testimonialsData from '@/data/testimonials.json';
import type { Service } from '@/types/pricing';
import type { Testimonial } from '@/types/testimonials';

interface FormData {
  location: string;
  name: string;
  mobile: string;
  address: string;
}

// Icon component for service cards
const ServiceIcon = ({ iconName }: { iconName: string }) => {
  const icons: Record<string, React.ReactNode> = {
    shirt: (
      <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
        <path d="M16 3 L12 1 L8 3 L6 3 L4 5 L4 9 L6 9 L6 22 L18 22 L18 9 L20 9 L20 5 L18 3 L16 3 M8 5 L12 3.5 L16 5 L16 22 L8 22 L8 5 M10 10 L14 10 L14 12 L10 12 L10 10 M10 14 L14 14 L14 16 L10 16 L10 14"/>
      </svg>
    ),
    washing: (
      <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18 2.01L6 2c-1.11 0-2 .89-2 2v16c0 1.11.89 2 2 2h12c1.11 0 2-.89 2-2V4c0-1.11-.9-1.99-2-1.99zM18 20H6v-9.02h12V20zm0-11H6V4h12v5zM8 5h2v3H8zm0 7h2v5H8z"/>
      </svg>
    ),
    leaf: (
      <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.66-1.89C8 17 9.98 12.65 16 11z"/>
        <path d="M3.82 21.34C5.17 16.66 8.67 11.5 16 10c-1.99-1.52-4.3-2.5-7-2.5-1.79 0-3.43.33-5 1C2.37 9.33 2 10.63 2 12c0 4.08 1.69 7.67 4.41 10.24.91.86 1.91 1.63 3 2.26z"/>
      </svg>
    ),
    iron: (
      <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
        <path d="M21 6c-1.66 0-3 1.34-3 3v4c0 .55-.45 1-1 1v-4c0-1.66-1.34-3-3-3h-4c-1.66 0-3 1.34-3 3h2c0-.55.45-1 1-1h4c.55 0 1 .45 1 1v5H6c-2.21 0-4 1.79-4 4v3h15v-5c1.66 0 3-1.34 3-3V9c0-.55.45-1 1-1h1V6h-1z"/>
      </svg>
    ),
    'eco-laundry': (
      <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
        <path d="M21.41 11.41l-8.83-8.83c-.37-.37-.88-.58-1.41-.58H4c-1.1 0-2 .9-2 2v7.17c0 .53.21 1.04.59 1.41l8.83 8.83c.78.78 2.05.78 2.83 0l7.17-7.17c.78-.78.78-2.04-.01-2.83zM6.5 8C5.67 8 5 7.33 5 6.5S5.67 5 6.5 5 8 5.67 8 6.5 7.33 8 6.5 8z"/>
      </svg>
    ),
    premium: (
      <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2l-2 4H6l3 3-1 4 4-2 4 2-1-4 3-3h-4l-2-4zm0 5.5l.9 1.8 2 .3-1.4 1.4.3 2-1.8-.9-1.8.9.3-2-1.4-1.4 2-.3.9-1.8zM6 20v2h12v-2H6z"/>
      </svg>
    ),
    curtain: (
      <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM8 20H4V4h4v16zm6 0h-4V4h4v16zm6 0h-4V4h4v16z"/>
      </svg>
    ),
    wool: (
      <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9h10v2H7v-2zm0 4h10v2H7v-2z"/>
      </svg>
    ),
    jacket: (
      <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 3c-1.1 0-2 .9-2 2v1H4v15h16V6h-6V5c0-1.1-.9-2-2-2zm0 2c.55 0 1 .45 1 1v1h-2V6c0-.55.45-1 1-1zM6 8h3v2H7v8h2v2H6V8zm6 0h6v2h-2v8h2v2h-6V8z"/>
        <path d="M9 10h2v8H9zm4 0h2v8h-2z"/>
        <circle cx="12" cy="12" r="1"/>
        <circle cx="12" cy="15" r="1"/>
      </svg>
    ),
    shoe: (
      <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
        <path d="M3 18c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-2H3v2zm1.5-9.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5S7.33 10 6.5 10 5 9.33 5 8.5zm13-4c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5zM22 16H2c-.55 0-1-.45-1-1 0-3.53 2.61-6.43 6-6.92V6c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2v2.08c3.39.49 6 3.39 6 6.92 0 .55-.45 1-1 1z"/>
      </svg>
    ),
    bag: (
      <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20 6h-4c0-2.21-1.79-4-4-4S8 3.79 8 6H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 0c0-1.1.9-2 2-2s2 .9 2 2h-4zm2 9c-3.31 0-6-2.69-6-6h2c0 2.21 1.79 4 4 4s4-1.79 4-4h2c0 3.31-2.69 6-6 6z"/>
      </svg>
    ),
    sofa: (
      <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
        <path d="M21 9V7c0-1.65-1.35-3-3-3H6C4.35 4 3 5.35 3 7v2c-1.65 0-3 1.35-3 3v5c0 1.65 1.35 3 3 3v1h2v-1h12v1h2v-1c1.65 0 3-1.35 3-3v-5c0-1.65-1.35-3-3-3zM5 7c0-.55.45-1 1-1h12c.55 0 1 .45 1 1v2.78c-.61.55-1 1.34-1 2.22v2H6v-2c0-.88-.39-1.67-1-2.22V7zm17 10c0 .55-.45 1-1 1H3c-.55 0-1-.45-1-1v-5c0-.55.45-1 1-1s1 .45 1 1v4h16v-4c0-.55.45-1 1-1s1 .45 1 1v5z"/>
      </svg>
    ),
    carpet: (
      <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
        <path d="M2 7v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2zm2 0h16v10H4V7zm2 2v6h2V9H6zm4 0v6h2V9h-2zm4 0v6h2V9h-2z"/>
      </svg>
    )
  };

  return icons[iconName] || icons.shirt;
};

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    location: '',
    name: '',
    mobile: '',
    address: ''
  });

  const [offset, setOffset] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(true);
  const [showContactDetails, setShowContactDetails] = useState<boolean>(false);
  const [showWhatsAppDetails, setShowWhatsAppDetails] = useState<boolean>(false);
  const [showFloatingWhatsApp, setShowFloatingWhatsApp] = useState<boolean>(false);
  const [showFloatingCall, setShowFloatingCall] = useState<boolean>(false);
  const [showServicesDropdown, setShowServicesDropdown] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState<boolean>(false);

  const testimonials: Testimonial[] = testimonialsData.testimonials;
  
  // Duplicate testimonials for infinite loop effect
  const extendedTestimonials = [...testimonials, ...testimonials, ...testimonials];

  // Continuous auto-slide functionality - Slightly faster scrolling
  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prev) => prev - 0.05); // Slightly faster movement (0.05% every 30ms)
    }, 30);

    return () => clearInterval(interval);
  }, []);

  // Reset position when reaching end for infinite loop
  useEffect(() => {
    const cardWidth = 100; // Percentage width per card
    const threshold = -(testimonials.length * cardWidth);
    
    if (offset <= threshold) {
      setIsTransitioning(false);
      setOffset(0);
      setTimeout(() => {
        setIsTransitioning(true);
      }, 50);
    }
  }, [offset, testimonials.length]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
  };

  const services: Service[] = pricingData.categories[0].services;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white shadow-sm px-4 py-4 border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-base sm:text-xl font-bold text-teal-600 flex items-center gap-2">
              <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 3 L12 1 L8 3 L6 3 L4 5 L4 9 L6 9 L6 22 L18 22 L18 9 L20 9 L20 5 L18 3 L16 3 M8 5 L12 3.5 L16 5 L16 22 L8 22 L8 5 M10 10 L14 10 L14 12 L10 12 L10 10 M10 14 L14 14 L14 16 L10 16 L10 14"/>
              </svg>
              <span className="hidden sm:inline">New Modern Drycleaners</span>
              <span className="sm:hidden">New Modern<br/>Drycleaners</span>
            </div>
            <div className="hidden sm:flex items-center gap-1 ml-4 text-sm">
              <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              <span className="text-gray-700 font-medium">Delhi</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <div className="relative">
              <button 
                onClick={() => setShowServicesDropdown(!showServicesDropdown)}
                className="flex items-center gap-1 text-orange-500 font-semibold hover:text-orange-600"
              >
                Our Services
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {showServicesDropdown && (
                <div className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-lg py-4 px-6 min-w-[280px] z-50 border border-gray-100">
                  <a href="#" className="block py-3 text-gray-700 hover:text-orange-500 border-b border-gray-100">Laundry Service</a>
                  <a href="#" className="block py-3 text-gray-700 hover:text-orange-500 border-b border-gray-100">Dry Clean Service</a>
                  <a href="#" className="block py-3 text-gray-700 hover:text-orange-500 border-b border-gray-100">Shoe Cleaning Service</a>
                  <a href="#" className="block py-3 text-gray-700 hover:text-orange-500 border-b border-gray-100">Jacket Cleaning Service</a>
                  <a href="#" className="block py-3 text-gray-700 hover:text-orange-500 border-b border-gray-100">Bag Cleaning Service</a>
                  <a href="#" className="block py-3 text-gray-700 hover:text-orange-500 border-b border-gray-100">Sofa Cleaning Service</a>
                  <a href="#" className="block py-3 text-gray-700 hover:text-orange-500 border-b border-gray-100">Carpet Cleaning Service</a>
                  <a href="#" className="block py-3 text-gray-700 hover:text-orange-500">Steam Ironing Service</a>
                </div>
              )}
            </div>
            <Link href="/stores" className="text-gray-700 hover:text-orange-500">Our Stores</Link>
            <Link href="/pricing" className="text-gray-700 hover:text-orange-500">Pricing</Link>
          </div>

          {/* Desktop Contact */}
          <div className="hidden lg:flex items-center gap-4">
            <a href="tel:9868117330" className="flex items-center gap-2 text-teal-500">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>98681 17330</span>
            </a>
          </div>

          {/* Mobile: Phone + Hamburger Menu */}
          <div className="flex lg:hidden items-center gap-2">
            <a href="tel:9868117330" className="text-teal-500 text-xs font-medium leading-tight">
              98681<br/>17330
            </a>
            
            {/* Hamburger Menu Button */}
            <button 
              className="p-1.5 text-gray-700 hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              type="button"
            >
              <svg 
                className="w-6 h-6" 
                fill="none" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-200 bg-white">
            <div className="flex flex-col space-y-2 pt-4 max-w-7xl mx-auto">
              {/* Services Collapsible Section */}
              <div className="border-b border-gray-200">
                <button
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className="w-full flex items-center justify-between py-2 px-2 text-gray-700 hover:text-orange-500 hover:bg-gray-50 rounded"
                >
                  <span className="font-medium">Our Services</span>
                  <svg 
                    className={`w-4 h-4 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {mobileServicesOpen && (
                  <div className="pb-2 pl-4">
                    <a href="#" className="block py-2 px-2 text-sm text-gray-600 hover:text-orange-500 hover:bg-gray-50 rounded">Laundry Service</a>
                    <a href="#" className="block py-2 px-2 text-sm text-gray-600 hover:text-orange-500 hover:bg-gray-50 rounded">Dry Clean Service</a>
                    <a href="#" className="block py-2 px-2 text-sm text-gray-600 hover:text-orange-500 hover:bg-gray-50 rounded">Shoe Cleaning</a>
                    <a href="#" className="block py-2 px-2 text-sm text-gray-600 hover:text-orange-500 hover:bg-gray-50 rounded">Jacket Cleaning</a>
                    <a href="#" className="block py-2 px-2 text-sm text-gray-600 hover:text-orange-500 hover:bg-gray-50 rounded">Bag Cleaning</a>
                    <a href="#" className="block py-2 px-2 text-sm text-gray-600 hover:text-orange-500 hover:bg-gray-50 rounded">Sofa Cleaning</a>
                    <a href="#" className="block py-2 px-2 text-sm text-gray-600 hover:text-orange-500 hover:bg-gray-50 rounded">Carpet Cleaning</a>
                    <a href="#" className="block py-2 px-2 text-sm text-gray-600 hover:text-orange-500 hover:bg-gray-50 rounded">Steam Ironing</a>
                  </div>
                )}
              </div>
              <Link href="/stores" className="py-2 px-2 text-gray-700 hover:text-orange-500 hover:bg-gray-50 rounded">Our Stores</Link>
              <Link href="/pricing" className="py-2 px-2 text-gray-700 hover:text-orange-500 hover:bg-gray-50 rounded">Pricing</Link>
              <div className="px-2 pt-2 border-t border-gray-200 flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <span className="text-gray-700 font-medium">Delhi</span>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="hero-gradient relative overflow-hidden py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <div className="text-white space-y-5">
              <div className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold">
                ⭐ Trusted by 1,000+ Customers
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Dry Cleaning & Laundry<br />Service in Delhi
              </h1>
              
              <p className="text-base md:text-lg text-teal-100">
                Professional cleaning services with free pickup and delivery. We care for your clothes like our own.
              </p>

              {/* Key Features */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-start space-x-2">
                  <div className="bg-white/20 backdrop-blur-sm p-1.5 rounded-lg">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-base">Free Pickup</h3>
                    <p className="text-xs text-teal-100">& Delivery</p>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <div className="bg-white/20 backdrop-blur-sm p-1.5 rounded-lg">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-base">24-48 Hours</h3>
                    <p className="text-xs text-teal-100">Quick Service</p>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <div className="bg-white/20 backdrop-blur-sm p-1.5 rounded-lg">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-base">100% Safe</h3>
                    <p className="text-xs text-teal-100">Eco-Friendly</p>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <div className="bg-white/20 backdrop-blur-sm p-1.5 rounded-lg">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-base">Best Price</h3>
                    <p className="text-xs text-teal-100">Guaranteed</p>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-2">
                <a href="tel:9868117330" className="inline-block bg-white text-teal-600 px-6 py-3 rounded-full font-bold text-base hover:bg-teal-50 transition-all shadow-lg hover:shadow-xl">
                  Call Now: 98681 17330
                </a>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative">
              <div className="relative z-10">
                {/* SVG Illustration - Multiple Clothes */}
                <div>
                  <svg className="w-full h-[400px] rounded-2xl bg-white/10 backdrop-blur-sm p-8" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Shirt 1 */}
                    <g transform="translate(50, 80)">
                      <path d="M50 20 L30 30 L30 90 L70 90 L70 30 Z" fill="#14B8A6" stroke="#0D9488" strokeWidth="2"/>
                      <rect x="35" y="30" width="30" height="60" fill="#2DD4BF"/>
                      <circle cx="50" cy="15" r="10" fill="#14B8A6"/>
                      <path d="M30 30 L20 40 L20 60 L30 50 Z" fill="#14B8A6"/>
                      <path d="M70 30 L80 40 L80 60 L70 50 Z" fill="#14B8A6"/>
                    </g>
                    
                    {/* Dress */}
                    <g transform="translate(140, 60)">
                      <path d="M50 25 L35 35 L30 90 L40 120 L60 120 L70 90 L65 35 Z" fill="#EC4899" stroke="#BE185D" strokeWidth="2"/>
                      <rect x="42" y="35" width="16" height="50" fill="#F472B6"/>
                      <circle cx="50" cy="20" r="12" fill="#EC4899"/>
                      <path d="M35 35 L25 40 L25 55 L30 50 Z" fill="#EC4899"/>
                      <path d="M65 35 L75 40 L75 55 L70 50 Z" fill="#EC4899"/>
                      <ellipse cx="50" cy="105" rx="15" ry="10" fill="#F9A8D4" opacity="0.7"/>
                    </g>
                    
                    {/* Pants */}
                    <g transform="translate(240, 100)">
                      <rect x="30" y="30" width="40" height="15" fill="#14B8A6" stroke="#0D9488" strokeWidth="2"/>
                      <rect x="32" y="45" width="16" height="70" fill="#2DD4BF"/>
                      <rect x="52" y="45" width="16" height="70" fill="#2DD4BF"/>
                      <rect x="30" y="30" width="40" height="8" fill="#0F766E"/>
                    </g>
                    
                    {/* Jacket */}
                    <g transform="translate(80, 200)">
                      <path d="M50 15 L30 25 L25 80 L35 80 L35 35 L50 30 L65 35 L65 80 L75 80 L70 25 Z" fill="#059669" stroke="#047857" strokeWidth="2"/>
                      <rect x="42" y="30" width="16" height="50" fill="#10B981"/>
                      <circle cx="50" cy="12" r="8" fill="#059669"/>
                      <line x1="50" y1="35" x2="50" y2="75" stroke="#047857" strokeWidth="2"/>
                      <rect x="30" y="35" width="8" height="12" fill="#10B981"/>
                      <rect x="62" y="35" width="8" height="12" fill="#10B981"/>
                    </g>
                    
                    {/* Sweater */}
                    <g transform="translate(180, 220)">
                      <path d="M45 20 L28 28 L25 75 L75 75 L72 28 L55 20 Z" fill="#F59E0B" stroke="#D97706" strokeWidth="2"/>
                      <rect x="38" y="28" width="24" height="47" fill="#FBBF24"/>
                      <circle cx="50" cy="18" r="10" fill="#F59E0B"/>
                      <path d="M28 28 L18 35 L18 50 L25 45 Z" fill="#F59E0B"/>
                      <path d="M72 28 L82 35 L82 50 L75 45 Z" fill="#F59E0B"/>
                      <rect x="35" y="35" width="30" height="3" fill="#D97706"/>
                      <rect x="35" y="45" width="30" height="3" fill="#D97706"/>
                    </g>
                    
                    {/* Sparkles/Clean Effect */}
                    <g opacity="0.6">
                      <circle cx="120" cy="50" r="3" fill="#FCD34D"/>
                      <circle cx="280" cy="80" r="4" fill="#FCD34D"/>
                      <circle cx="160" cy="180" r="3" fill="#FCD34D"/>
                      <circle cx="300" cy="200" r="3" fill="#FCD34D"/>
                      <path d="M 90 140 L 92 145 L 97 147 L 92 149 L 90 154 L 88 149 L 83 147 L 88 145 Z" fill="#5EEAD4"/>
                      <path d="M 260 140 L 262 145 L 267 147 L 262 149 L 260 154 L 258 149 L 253 147 L 258 145 Z" fill="#5EEAD4"/>
                    </g>
                  </svg>
                </div>
              </div>
              
              {/* Floating Stats Cards */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-xl p-3 z-20">
                <div className="flex items-center space-x-2">
                  <div className="bg-teal-100 p-2 rounded-lg">
                    <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-gray-800">1k+</p>
                    <p className="text-xs text-gray-600">Happy Customers</p>
                  </div>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-xl p-3 z-20">
                <div className="flex items-center space-x-2">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-gray-800">4.9★</p>
                    <p className="text-xs text-gray-600">Rating</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Buttons */}
          <div className="mt-8 bg-white rounded-2xl shadow-2xl p-8 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
              Contact Us for Free Pickup & Delivery
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {/* WhatsApp Button */}
              <button 
                onClick={() => {
                  setShowWhatsAppDetails(!showWhatsAppDetails);
                  setShowContactDetails(false);
                }}
                className="flex items-center justify-center space-x-3 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all shadow-lg hover:shadow-xl w-full sm:w-auto"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                <span>WhatsApp</span>
              </button>

              {/* Contact Details Button */}
              <button 
                onClick={() => {
                  setShowContactDetails(!showContactDetails);
                  setShowWhatsAppDetails(false);
                }}
                className="flex items-center justify-center space-x-3 bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all shadow-lg hover:shadow-xl w-full sm:w-auto"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                <span>Call Us</span>
              </button>
            </div>

            {/* WhatsApp Details Dropdown */}
            {showWhatsAppDetails && (
              <div className="mt-6 bg-green-50 border-2 border-green-200 rounded-2xl p-6 space-y-4 animate-fadeIn">
                <h3 className="text-xl font-bold text-gray-800 text-center mb-4">Chat on WhatsApp</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <a 
                    href="https://wa.me/919868117330" 
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center justify-center space-x-3 bg-white hover:bg-green-50 text-gray-800 px-6 py-4 rounded-xl font-semibold border-2 border-green-300 transition-all"
                  >
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    <span>98681 17330</span>
                  </a>
                  
                  <a 
                    href="https://wa.me/919871161197" 
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center justify-center space-x-3 bg-white hover:bg-green-50 text-gray-800 px-6 py-4 rounded-xl font-semibold border-2 border-green-300 transition-all"
                  >
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    <span>98711 61197</span>
                  </a>
                </div>
              </div>
            )}

            {/* Contact Details Dropdown */}
            {showContactDetails && (
              <div className="mt-6 bg-teal-50 border-2 border-teal-200 rounded-2xl p-6 space-y-4 animate-fadeIn">
                <h3 className="text-xl font-bold text-gray-800 text-center mb-4">Our Contact Numbers</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <a 
                    href="tel:9868117330"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center justify-center space-x-3 bg-white hover:bg-teal-50 text-gray-800 px-6 py-4 rounded-xl font-semibold border-2 border-teal-300 transition-all"
                  >
                    <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                    <span>98681 17330</span>
                  </a>
                  
                  <a 
                    href="tel:9871161197"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center justify-center space-x-3 bg-white hover:bg-teal-50 text-gray-800 px-6 py-4 rounded-xl font-semibold border-2 border-teal-300 transition-all"
                  >
                    <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                    <span>98711 61197</span>
                  </a>
                </div>
              </div>
            )}

            <p className="text-center text-gray-600 mt-6 text-sm">
              Available 7 days a week • Quick Response • Free Pickup & Delivery
            </p>
          </div>

          {/* Services Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
              One stop solution for Laundry & Dry clean
            </h2>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-4">
            <p className="text-teal-500 font-semibold uppercase text-sm mb-4">
              As affordable as soap and water, but way better!
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
              Plans & Prices for Laundry & Dry Clean Services
            </h2>
          </div>

          {/* Tabs */}
          <div className="flex justify-center gap-8 mb-12 border-b border-gray-200">
            <Link href="/pricing" className="pb-4 px-6 font-semibold text-gray-800 border-b-4 border-teal-500 hover:text-gray-900">
              Dry Clean Rates
            </Link>
            <Link href="/pricing" className="pb-4 px-6 font-semibold text-gray-500 hover:text-gray-800">
              Wash Rates
            </Link>
          </div>

          {/* Service Cards - Display first 6 services from JSON */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.slice(0, 6).map((service: Service) => (
              <div key={service.id} className="group relative bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg hover:border-teal-200 transition-all duration-300">
                {/* Icon with Background Circle */}
                <div className="flex justify-center mb-4">
                  <div className="bg-teal-50 text-teal-600 p-4 rounded-2xl group-hover:bg-teal-100 transition-colors">
                    <ServiceIcon iconName={service.icon} />
                  </div>
                </div>

                {/* Service Name */}
                <h3 className="text-lg font-bold text-gray-800 mb-2 text-center">
                  {service.name}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-xs mb-4 leading-relaxed text-center line-clamp-2">
                  {service.description}
                </p>

                {/* Price Tag */}
                <div className="bg-teal-50 rounded-xl p-3 mb-4 text-center">
                  <div className="text-gray-600 text-xs font-medium mb-1">Starting From</div>
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-2xl font-bold text-teal-600">₹{service.price}</span>
                    <span className="text-gray-500 text-xs">/{service.unit}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-2 mb-4">
                  {service.features.slice(0, 2).map((feature: string, index: number) => (
                    <div key={index} className="flex items-start gap-2 text-xs">
                      <svg className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700 leading-tight">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* View All Link */}
          <div className="text-center mt-10">
            <Link href="/pricing" className="inline-block bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              View All Services & Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-teal-500 font-semibold uppercase text-sm mb-4">Our Customers Say</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 flex items-center justify-center gap-2 flex-wrap">
              <span>India&apos;s Most Trusted Laundry & Dry clean Service - Rated 4.6</span>
              <svg className="w-7 h-7 text-yellow-400 inline-block" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>by 5.75L Happy Customers</span>
            </h2>
          </div>

          {/* Continuous Slider Container */}
          <div className="relative max-w-6xl mx-auto">
            {/* Testimonials - Continuous Scrolling */}
            <div className="overflow-hidden py-4">
              <div 
                className="flex gap-8"
                style={{ 
                  transform: `translateX(${offset}%)`,
                  transition: isTransitioning ? 'transform 0.03s linear' : 'none'
                }}
              >
                {extendedTestimonials.map((testimonial: Testimonial, index: number) => (
                  <div key={`${testimonial.id}-${index}`} className="flex-shrink-0 w-full sm:w-80 md:w-96">
                    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow h-full flex flex-col border border-gray-100">
                      {/* Stars */}
                      <div className="flex gap-1 mb-4 sm:mb-6 justify-center">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <svg key={i} className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>

                      {/* Comment */}
                      <p className="text-gray-800 text-center mb-6 sm:mb-8 text-sm sm:text-base leading-relaxed flex-grow font-medium">
                        &ldquo;{testimonial.comment}&rdquo;
                      </p>

                      {/* Author */}
                      <div className="text-center">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-teal-500 mx-auto mb-3 sm:mb-4 flex items-center justify-center text-white text-xl sm:text-2xl font-bold shadow-lg">
                          {testimonial.name.charAt(0)}
                        </div>
                        <div className="font-bold text-gray-900 text-base sm:text-lg">{testimonial.name}</div>
                        <div className="text-gray-600 text-xs sm:text-sm mt-1">{testimonial.role}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Gradient Overlays for edge fade effect */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none z-10"></div>
          </div>
        </div>
      </section>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-8 right-8 flex flex-col gap-4 z-50">
        <a
          href="https://wa.me/918800414848"
          className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-green-600 transition-colors"
        >
          <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </a>
        <button className="w-14 h-14 bg-teal-600 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-teal-700 transition-colors">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
            {/* Brand Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-lg font-bold text-teal-600">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 3 L12 1 L8 3 L6 3 L4 5 L4 9 L6 9 L6 22 L18 22 L18 9 L20 9 L20 5 L18 3 L16 3 M8 5 L12 3.5 L16 5 L16 22 L8 22 L8 5 M10 10 L14 10 L14 12 L10 12 L10 10 M10 14 L14 14 L14 16 L10 16 L10 14"/>
                </svg>
                <span>New Modern Drycleaners</span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                New Modern Drycleaners is the one stop solution for all your garment laundry & dry cleaning needs.
              </p>
              <div className="flex gap-3">
                <a href="#" className="w-9 h-9 bg-teal-600 rounded-full flex items-center justify-center hover:bg-teal-700 text-white transition-colors" aria-label="Facebook">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="w-9 h-9 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 text-white transition-colors" aria-label="Twitter">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a href="#" className="w-9 h-9 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 rounded-full flex items-center justify-center hover:opacity-90 text-white transition-all" aria-label="Instagram">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="#" className="w-9 h-9 bg-teal-700 rounded-full flex items-center justify-center hover:bg-teal-800 text-white transition-colors" aria-label="LinkedIn">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
              <div className="space-y-3 pt-3">
                <h3 className="font-bold text-gray-800 text-base">Help & Support</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Monday-Sunday 9:00 AM 10:00 PM</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <a href="tel:+919868117330" className="hover:text-teal-600">+91 98681 17330</a>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    <a href="#" className="hover:text-teal-600">WhatsApp</a>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <a href="mailto:cc@dryclean.com" className="hover:text-teal-600">cc@dryclean.com</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="font-bold text-gray-800 text-base">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/pricing" className="text-gray-600 hover:text-teal-600 transition-colors">Pricing</Link></li>
                <li><Link href="/stores" className="text-gray-600 hover:text-teal-600 transition-colors">Our Stores</Link></li>
              </ul>
            </div>

            {/* Services */}
            <div className="space-y-4">
              <h3 className="font-bold text-gray-800 text-base">Services</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-600 hover:text-teal-600 transition-colors">Laundry Service</a></li>
                <li><a href="#" className="text-gray-600 hover:text-teal-600 transition-colors">Dry Clean Service</a></li>
                <li><a href="#" className="text-gray-600 hover:text-teal-600 transition-colors">Shoe Cleaning Service</a></li>
                <li><a href="#" className="text-gray-600 hover:text-teal-600 transition-colors">Jacket Cleaning Service</a></li>
                <li><a href="#" className="text-gray-600 hover:text-teal-600 transition-colors">Bag Cleaning Service</a></li>
                <li><a href="#" className="text-gray-600 hover:text-teal-600 transition-colors">Sofa Cleaning Service</a></li>
                <li><a href="#" className="text-gray-600 hover:text-teal-600 transition-colors">Carpet Cleaning Service</a></li>
                <li><a href="#" className="text-gray-600 hover:text-teal-600 transition-colors">Steam Ironing Service</a></li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-200 pt-8">
            <p className="text-center text-gray-500 text-sm">
              © Copyrights 2011-2025 Owned by New Modern Drycleaners
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 flex flex-col gap-3 z-50">
        {/* WhatsApp Floating Button */}
        <div className="relative">
          <button 
            onClick={() => {
              setShowFloatingWhatsApp(!showFloatingWhatsApp);
              if (showFloatingCall) setShowFloatingCall(false);
            }}
            className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110"
          >
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
          </button>
          
          {/* WhatsApp Options Popup */}
          {showFloatingWhatsApp && (
            <div className="absolute bottom-full right-0 mb-6 bg-white rounded-xl shadow-2xl p-4 w-64 animate-fadeIn border border-gray-200">
              <h4 className="font-bold text-gray-800 mb-3 text-sm">Chat on WhatsApp</h4>
              <div className="space-y-2">
                <a 
                  href="https://wa.me/919868117330" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between bg-green-50 hover:bg-green-100 p-3 rounded-lg transition-all border border-green-200"
                >
                  <span className="text-gray-800 font-medium text-sm">98681 17330</span>
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </a>
                
                <a 
                  href="https://wa.me/919871161197" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between bg-green-50 hover:bg-green-100 p-3 rounded-lg transition-all border border-green-200"
                >
                  <span className="text-gray-800 font-medium text-sm">98711 61197</span>
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Call Floating Button */}
        <div className="relative">
          <button 
            onClick={() => {
              setShowFloatingCall(!showFloatingCall);
              if (showFloatingWhatsApp) setShowFloatingWhatsApp(false);
            }}
            className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110"
          >
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
            </svg>
          </button>
          
          {/* Call Options Popup */}
          {showFloatingCall && (
            <div className="absolute bottom-full right-0 mb-6 bg-white rounded-xl shadow-2xl p-4 w-64 animate-fadeIn border border-gray-200">
              <h4 className="font-bold text-gray-800 mb-3 text-sm">Call Us Now</h4>
              <div className="space-y-2">
                <a 
                  href="tel:9868117330"
                  className="flex items-center justify-between bg-teal-50 hover:bg-teal-100 p-3 rounded-lg transition-all border border-teal-200"
                >
                  <span className="text-gray-800 font-medium text-sm">98681 17330</span>
                  <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                </a>
                
                <a 
                  href="tel:9871161197"
                  className="flex items-center justify-between bg-teal-50 hover:bg-teal-100 p-3 rounded-lg transition-all border border-teal-200"
                >
                  <span className="text-gray-800 font-medium text-sm">98711 61197</span>
                  <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

