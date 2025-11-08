'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function StoresPage() {
  const [showServicesDropdown, setShowServicesDropdown] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState<boolean>(false);
  const [showFloatingWhatsApp, setShowFloatingWhatsApp] = useState<boolean>(false);
  const [showFloatingCall, setShowFloatingCall] = useState<boolean>(false);

  const stores = [
    {
      id: 1,
      name: "New Modern Drycleaners - Store 1",
      address: "R 30 Shop No. 1, Khirki Extension, Malviya Nagar",
      area: "Malviya Nagar, Delhi NCR",
      city: "New Delhi, Delhi",
      pincode: "110017",
      phone: "+91 98681 17330",
      email: "malviyanagar1@dryclean.com",
      hours: {
        weekdays: "Monday, Wednesday - Sunday: 9:30 AM - 8:00 PM",
        weekend: "Closed on Tuesdays"
      },
      services: [
        "Dry Cleaning",
        "Laundry Service",
        "Ironing Service",
        "Shoe Cleaning",
        "Bag Cleaning",
        "Home Pickup & Delivery"
      ],
      mapUrl: "https://www.google.com/maps?q=28.532836,77.218949",
      image: "/store1.jpg"
    },
    {
      id: 2,
      name: "New Modern Drycleaners - Store 2",
      address: "A-23, Shivalik Road, Near Metro Station",
      area: "Malviya Nagar",
      city: "New Delhi",
      pincode: "110017",
      phone: "+91 98711 61197",
      email: "malviyanagar2@dryclean.com",
      hours: {
        weekdays: "Monday, Wednesday - Sunday: 9:30 AM - 8:00 PM",
        weekend: "Closed on Tuesdays"
      },
      services: [
        "Dry Cleaning",
        "Laundry Service",
        "Ironing Service",
        "Leather Cleaning",
        "Sofa Cleaning",
        "Curtain Cleaning",
        "Home Pickup & Delivery"
      ],
      mapUrl: "https://maps.app.goo.gl/id4ekXTK2GBd1jK46",
      image: "/store2.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white shadow-sm px-4 py-4 border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 text-base sm:text-xl font-bold text-teal-600">
              <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 3 L12 1 L8 3 L6 3 L4 5 L4 9 L6 9 L6 22 L18 22 L18 9 L20 9 L20 5 L18 3 L16 3 M8 5 L12 3.5 L16 5 L16 22 L8 22 L8 5 M10 10 L14 10 L14 12 L10 12 L10 10 M10 14 L14 14 L14 16 L10 16 L10 14"/>
              </svg>
              <span className="hidden sm:inline">New Modern Drycleaners</span>
              <span className="sm:hidden">New Modern<br/>Drycleaners</span>
            </Link>
            <div className="hidden sm:flex items-center gap-1 ml-4 text-sm">
              <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              <span className="text-gray-700 font-medium">Delhi</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <Link href="/" className="text-gray-700 hover:text-orange-500">Home</Link>
            <div className="relative">
              <button 
                onClick={() => setShowServicesDropdown(!showServicesDropdown)}
                className="flex items-center gap-1 text-gray-700 hover:text-teal-600"
              >
                Our Services
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {showServicesDropdown && (
                <div className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-lg py-4 px-6 min-w-[280px] z-50 border border-gray-100">
                  <a href="#" className="block py-3 text-gray-700 hover:text-teal-600 border-b border-gray-100">Laundry Service</a>
                  <a href="#" className="block py-3 text-gray-700 hover:text-teal-600 border-b border-gray-100">Dry Clean Service</a>
                  <a href="#" className="block py-3 text-gray-700 hover:text-teal-600 border-b border-gray-100">Shoe Cleaning Service</a>
                  <a href="#" className="block py-3 text-gray-700 hover:text-teal-600 border-b border-gray-100">Jacket Cleaning Service</a>
                  <a href="#" className="block py-3 text-gray-700 hover:text-teal-600 border-b border-gray-100">Bag Cleaning Service</a>
                  <a href="#" className="block py-3 text-gray-700 hover:text-teal-600 border-b border-gray-100">Sofa Cleaning Service</a>
                  <a href="#" className="block py-3 text-gray-700 hover:text-teal-600 border-b border-gray-100">Carpet Cleaning Service</a>
                  <a href="#" className="block py-3 text-gray-700 hover:text-teal-600">Steam Ironing Service</a>
                </div>
              )}
            </div>
            <Link href="/stores" className="text-teal-600 font-semibold">Our Stores</Link>
            <Link href="/pricing" className="text-gray-700 hover:text-teal-600">Pricing</Link>
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
              <Link href="/" className="py-2 px-2 text-gray-700 hover:text-orange-500 hover:bg-gray-50 rounded">Home</Link>
              
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

              <Link href="/stores" className="py-2 px-2 text-teal-600 font-semibold hover:bg-gray-50 rounded">Our Stores</Link>
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
      <section className="bg-gradient-to-br from-blue-50 to-blue-100 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Our Stores in Delhi
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Visit us at our Malviya Nagar locations for premium laundry & dry cleaning services
          </p>
          <div className="flex items-center justify-center gap-2 text-gray-700">
            <svg className="w-6 h-6 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            <span className="text-lg font-semibold">2 Stores in Malviya Nagar</span>
          </div>
        </div>
      </section>

      {/* Stores Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {stores.map((store) => (
              <div key={store.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow">
                {/* Store Image/Header */}
                <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-8 text-white">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">{store.name}</h2>
                      <div className="flex items-center gap-2 text-teal-100">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
                        <span>{store.area}, {store.city}</span>
                      </div>
                    </div>
                    <div className="bg-white text-teal-600 rounded-full p-3">
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18 2.01L6 2c-1.11 0-2 .89-2 2v16c0 1.11.89 2 2 2h12c1.11 0 2-.89 2-2V4c0-1.11-.9-1.99-2-1.99zM18 20H6v-9.02h12V20zm0-11H6V4h12v5zM8 5h2v3H8zm0 7h2v5H8z"/>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Store Details */}
                <div className="p-8">
                  {/* Address */}
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                      <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                      Address
                    </h3>
                    <p className="text-gray-600 ml-7">
                      {store.address}<br />
                      {store.city} - {store.pincode}
                    </p>
                  </div>

                  {/* Contact Info */}
                  <div className="mb-6 space-y-3">
                    <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                      <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                      </svg>
                      Contact
                    </h3>
                    <div className="flex items-center gap-3 ml-7 text-gray-600">
                      <svg className="w-5 h-5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <a href={`tel:${store.phone}`} className="hover:text-orange-500">{store.phone}</a>
                    </div>
                    <div className="flex items-center gap-3 ml-7 text-gray-600">
                      <svg className="w-5 h-5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <a href={`mailto:${store.email}`} className="hover:text-orange-500">{store.email}</a>
                    </div>
                  </div>

                  {/* Working Hours */}
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                      <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Working Hours
                    </h3>
                    <div className="ml-7 space-y-2 text-gray-600">
                      <div className="flex justify-between">
                        <span className="font-medium">{store.hours.weekdays}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-red-600">{store.hours.weekend}</span>
                      </div>
                    </div>
                  </div>

                  {/* Services */}
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                      <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
                      </svg>
                      Services Available
                    </h3>
                    <div className="ml-7 grid grid-cols-2 gap-2">
                      {store.services.map((service, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                          <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{service}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 mt-8">
                    <a 
                      href={store.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-full font-semibold text-center transition-colors flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                      Get Directions
                    </a>
                    <a 
                      href={`tel:${store.phone}`}
                      className="flex-1 bg-orange-400 hover:bg-orange-500 text-white py-3 rounded-full font-semibold text-center transition-colors flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      Call Now
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Visit Us Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Why Visit Our Stores?
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-teal-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l-2 4H6l3 3-1 4 4-2 4 2-1-4 3-3h-4l-2-4zm0 5.5l.9 1.8 2 .3-1.4 1.4.3 2-1.8-.9-1.8.9.3-2-1.4-1.4 2-.3.9-1.8zM6 20v2h12v-2H6z"/>
                </svg>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Premium Quality</h3>
              <p className="text-gray-600 text-sm">Latest technology & best care for your garments</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Quick Service</h3>
              <p className="text-gray-600 text-sm">Same day & express services available</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Expert Staff</h3>
              <p className="text-gray-600 text-sm">Trained professionals at your service</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z"/>
                </svg>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Free Pickup</h3>
              <p className="text-gray-600 text-sm">Complimentary home pickup & delivery</p>
            </div>
          </div>
        </div>
      </section>

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
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      <div className="fixed bottom-8 right-8 flex flex-col gap-3 z-50">
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

