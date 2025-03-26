import React, { useState } from 'react';
import { Heart, Shield, AlertTriangle, Leaf, ArrowRight, PawPrint, X, Camera, MapPin, Calendar, Users, Video, MessageSquare, AlertCircle, BookOpen, FileSpreadsheet, Globe2, Siren, Microscope, Scale, Award } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import VideoCall from './components/VideoCall';
import ExpertChat from './components/ExpertChat';

// Fix for default marker icon in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function App() {
  const [showDonateModal, setShowDonateModal] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [showExpertChat, setShowExpertChat] = useState(false);

  const conservationProjects = [
    { 
      position: [51.505, -0.09], 
      name: "London Wildlife Trust", 
      description: "Urban wildlife conservation",
      stats: {
        animalsProtected: 1500,
        areaProtected: "2,500 hectares",
        volunteersActive: 750
      }
    },
    { 
      position: [-2.4833, 34.8500], 
      name: "Serengeti Conservation", 
      description: "Big cat protection program",
      stats: {
        animalsProtected: 3000,
        areaProtected: "14,750 km²",
        volunteersActive: 1200
      }
    },
    { 
      position: [-33.8688, 151.2093], 
      name: "Sydney Marine Life", 
      description: "Ocean wildlife protection",
      stats: {
        animalsProtected: 5000,
        areaProtected: "85,000 km²",
        volunteersActive: 900
      }
    },
    {
      position: [35.6762, 139.6503],
      name: "Tokyo Animal Welfare",
      description: "Urban pet protection and care",
      stats: {
        animalsProtected: 2800,
        areaProtected: "1,200 hectares",
        volunteersActive: 650
      }
    },
    {
      position: [-3.4653, -62.2159],
      name: "Amazon Wildlife Project",
      description: "Rainforest species conservation",
      stats: {
        animalsProtected: 8500,
        areaProtected: "25,000 km²",
        volunteersActive: 1500
      }
    }
  ];

  const successStories = [
    {
      title: "Maya the Tiger",
      date: "March 2024",
      description: "Successfully rehabilitated and released back into protected wilderness",
      image: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&q=80"
    },
    {
      title: "Ocean Cleanup Initiative",
      date: "February 2024",
      description: "Removed 5000kg of plastic waste from marine habitats",
      image: "https://images.unsplash.com/photo-1583842761824-864c2380d18f?auto=format&fit=crop&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Consultation Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-40">
        <button
          onClick={() => setShowVideoCall(true)}
          className="bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition-colors flex items-center gap-2"
        >
          <Video className="w-6 h-6" />
          <span className="hidden md:inline">Video Consultation</span>
        </button>
        <button
          onClick={() => setShowExpertChat(true)}
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <MessageSquare className="w-6 h-6" />
          <span className="hidden md:inline">Chat with Expert</span>
        </button>
      </div>

      {/* Hero Section */}
      <header className="relative h-screen">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?auto=format&fit=crop&q=80"
            alt="Endangered Tiger"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        
        <div className="relative h-full flex flex-col items-center justify-center text-white px-4">
          <PawPrint className="w-16 h-16 mb-6" />
          <h1 className="text-5xl md:text-6xl font-bold text-center mb-6">
            Animal Welfare Guardians
          </h1>
          <p className="text-xl md:text-2xl text-center max-w-3xl mb-8">
            Protecting and preserving the welfare of animals worldwide through advocacy, 
            education, and direct action.
          </p>
          <button 
            onClick={() => setShowDonateModal(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full 
            flex items-center gap-2 transition duration-300">
            Join Our Cause <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Key Issues Section with Enhanced Features */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Key Issues We Address</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Animal Protection */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <Shield className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-2xl font-semibold mb-4">Animal Protection</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-gray-700">
                  <AlertCircle className="w-5 h-5 text-blue-500" />
                  <span>24/7 Animal Abuse Reporting Hotline</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <BookOpen className="w-5 h-5 text-green-500" />
                  <span>Educational Resources for Schools</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <FileSpreadsheet className="w-5 h-5 text-purple-500" />
                  <span>Animal Rights Documentation</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Scale className="w-5 h-5 text-red-500" />
                  <span>Legal Advocacy Support</span>
                </div>
                <button className="w-full mt-4 bg-green-100 text-green-700 py-2 rounded-lg hover:bg-green-200 transition-colors">
                  Report Animal Abuse
                </button>
              </div>
            </div>

            {/* Endangered Species */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <AlertTriangle className="w-12 h-12 text-yellow-600 mb-4" />
              <h3 className="text-2xl font-semibold mb-4">Endangered Species</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-gray-700">
                  <Globe2 className="w-5 h-5 text-blue-500" />
                  <span>Species Tracking Database</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Siren className="w-5 h-5 text-red-500" />
                  <span>Poaching Alert Network</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Microscope className="w-5 h-5 text-purple-500" />
                  <span>Research & Conservation</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Award className="w-5 h-5 text-yellow-500" />
                  <span>Conservation Success Stories</span>
                </div>
                <button className="w-full mt-4 bg-yellow-100 text-yellow-700 py-2 rounded-lg hover:bg-yellow-200 transition-colors">
                  View Species Database
                </button>
              </div>
            </div>

            {/* Ethical Treatment */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <Heart className="w-12 h-12 text-red-600 mb-4" />
              <h3 className="text-2xl font-semibold mb-4">Ethical Treatment</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-gray-700">
                  <Video className="w-5 h-5 text-blue-500" />
                  <span>Virtual Vet Consultations</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <MessageSquare className="w-5 h-5 text-green-500" />
                  <span>Expert Chat Support</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Users className="w-5 h-5 text-purple-500" />
                  <span>Community Guidelines</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <BookOpen className="w-5 h-5 text-orange-500" />
                  <span>Best Practices Resources</span>
                </div>
                <button className="w-full mt-4 bg-red-100 text-red-700 py-2 rounded-lg hover:bg-red-200 transition-colors">
                  Access Resources
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Impact Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Our Global Impact</h2>
          <div className="h-[600px] rounded-xl overflow-hidden shadow-lg">
            <MapContainer center={[0, 0]} zoom={2} className="h-full">
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {conservationProjects.map((project, index) => (
                <Marker key={index} position={project.position as [number, number]}>
                  <Popup>
                    <div className="p-2">
                      <h3 className="font-bold text-lg mb-2">{project.name}</h3>
                      <p className="text-gray-600 mb-3">{project.description}</p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Shield className="w-4 h-4 text-green-600" />
                          <span>Protected: {project.stats.animalsProtected} animals</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-blue-600" />
                          <span>Area: {project.stats.areaProtected}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-purple-600" />
                          <span>Volunteers: {project.stats.volunteersActive}</span>
                        </div>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-green-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-2">Total Impact</h3>
              <p className="text-4xl font-bold text-green-600">20,800+</p>
              <p className="text-gray-600">Animals Protected</p>
            </div>
            <div className="bg-blue-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-2">Protected Area</h3>
              <p className="text-4xl font-bold text-blue-600">125,450 km²</p>
              <p className="text-gray-600">Of Wildlife Habitat</p>
            </div>
            <div className="bg-purple-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-2">Active Volunteers</h3>
              <p className="text-4xl font-bold text-purple-600">5,000+</p>
              <p className="text-gray-600">Worldwide</p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Success Stories</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {successStories.map((story, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <img src={story.image} alt={story.title} className="w-full h-64 object-cover" />
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <Calendar className="w-5 h-5 text-green-600 mr-2" />
                    <span className="text-gray-600">{story.date}</span>
                  </div>
                  <h3 className="text-2xl font-semibold mb-2">{story.title}</h3>
                  <p className="text-gray-600">{story.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 px-4 bg-green-700 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-green-800 p-8 rounded-xl">
              <h3 className="text-4xl font-bold mb-2">1,000+</h3>
              <p className="text-xl">Animals Rescued</p>
            </div>
            <div className="bg-green-800 p-8 rounded-xl">
              <h3 className="text-4xl font-bold mb-2">50+</h3>
              <p className="text-xl">Conservation Projects</p>
            </div>
            <div className="bg-green-800 p-8 rounded-xl">
              <h3 className="text-4xl font-bold mb-2">100K+</h3>
              <p className="text-xl">Supporters Worldwide</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Leaf className="w-16 h-16 text-green-600 mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-6">Make a Difference Today</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join us in our mission to protect and preserve animal welfare. Every action 
            counts, every voice matters.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => setShowDonateModal(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full">
              Donate Now
            </button>
            <button className="border-2 border-green-600 text-green-600 hover:bg-green-50 
              px-8 py-3 rounded-full">
              Volunteer
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-xl font-bold mb-4">Animal Welfare Guardians</h4>
            <p className="text-gray-400">
              Dedicated to protecting and preserving animal welfare worldwide.
            </p>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">About Us</a></li>
              <li><a href="#" className="hover:text-white">Our Work</a></li>
              <li><a href="#" className="hover:text-white">Get Involved</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-4">Resources</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">News</a></li>
              <li><a href="#" className="hover:text-white">Research</a></li>
              <li><a href="#" className="hover:text-white">Reports</a></li>
              <li><a href="#" className="hover:text-white">Blog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-4">Connect</h4>
            <p className="text-gray-400 mb-4">
              Stay updated with our newsletter
            </p>
            <form className="space-y-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-full bg-gray-800 text-white"
              />
              <button className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {showDonateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">Make a Donation</h3>
              <button onClick={() => setShowDonateModal(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <p className="text-gray-600">Choose an amount to donate:</p>
              <div className="grid grid-cols-3 gap-4">
                {[25, 50, 100].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setSelectedAmount(amount)}
                    className={`p-4 rounded-lg border ${
                      selectedAmount === amount
                        ? 'border-green-600 bg-green-50'
                        : 'border-gray-200 hover:border-green-600'
                    }`}
                  >
                    ${amount}
                  </button>
                ))}
              </div>
              <div className="relative">
                <input
                  type="number"
                  placeholder="Custom amount"
                  className="w-full p-3 border rounded-lg pl-8"
                  onChange={(e) => setSelectedAmount(Number(e.target.value))}
                />
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2">$</span>
              </div>
              <button
                onClick={() => {
                  alert('Thank you for your donation!');
                  setShowDonateModal(false);
                }}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg"
              >
                Complete Donation
              </button>
            </div>
          </div>
        </div>
      )}

      {showVideoCall && <VideoCall onClose={() => setShowVideoCall(false)} />}
      {showExpertChat && <ExpertChat onClose={() => setShowExpertChat(false)} />}
    </div>
  );
}

export default App;