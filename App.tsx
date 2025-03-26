import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { Heart, Shield, AlertTriangle, Leaf, ArrowRight, PawPrint, X, Video, MessageSquare, AlertCircle, Calendar } from 'lucide-react';
import VideoCall from './components/VideoCall';
import ExpertChat from './components/ExpertChat';
import AuthModal from './components/AuthModal';
import IssueReportModal from './components/IssueReportModal';
import DonateModal from './components/DonateModal';
import GoogleFormModal from './components/GoogleFormModal';
import { AuthProvider, useAuth } from './components/AuthContext';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function App() {
  const [showDonateModal, setShowDonateModal] = useState(false);
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [showExpertChat, setShowExpertChat] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showIssueReportModal, setShowIssueReportModal] = useState(false);
  const [showGoogleFormModal, setShowGoogleFormModal] = useState(false);
  const [issues, setIssues] = useState<any[]>([]); 
  const [showSubmittedIssues, setShowSubmittedIssues] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    const storedIssues = localStorage.getItem('issues');
    if (storedIssues) {
      setIssues(JSON.parse(storedIssues));
    }
  }, []);

  const handleIssueSubmit = (issue: any) => {
    const newIssues = [...issues, issue];
    setIssues(newIssues);
    localStorage.setItem('issues', JSON.stringify(newIssues));
    alert('Issue reported successfully! Our team will investigate.');
  };

  const adoptionListings = [
    {
      name: "Bella",
      location: "Chandigarh",
      image: "https://i.pinimg.com/736x/a9/73/fd/a973fd5cf3a7700a20b5bbf7ec053fae.jpg",
      description: "A sweet kitten looking for a family."
    },
    {
      name: "Bruno",
      location: "Panchkula",
      image: "https://i.pinimg.com/736x/e8/bb/60/e8bb608a2578ae463497fdce221fa677.jpg",
      description: "A friendly dog looking for a loving home."
    },
    {
      name: "Michi",
      location: "Chandigarh",
      image: "https://i.pinimg.com/736x/7a/09/f0/7a09f0101253933efe11f94344a77039.jpg",
      description: "A playful cat who loves to cuddle."
    },
    {
      name: "Charlie",
      location: "Rajpura",
      image: "https://i.pinimg.com/736x/c4/b3/ee/c4b3eeed102c1bb4367dafdd48bf8136.jpg",
      description: "An energetic  ready for adventures."
    },
  ];

  const rescueStories = [
    {
      title: "Maya the Tiger",
      date: "March 2024",
      description: "Successfully rehabilitated and released back into protected wilderness.",
      image: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&q=80"
    },
    {
      title: "Ocean Cleanup Initiative",
      date: "February 2024",
      description: "Removed 5000kg of plastic waste from marine habitats.",
      image: "https://i.pinimg.com/736x/57/7b/06/577b06f1258b2a973d2e4c931a11c243.jpg"
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
          <div className="flex gap-4">
            {user ? (
              <button 
                onClick={() => setShowIssueReportModal(true)}
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-3 rounded-full 
                flex items-center gap-2 transition duration-300"
              >
                <AlertCircle className="w-5 h-5" /> Raise an Issue
              </button>
            ) : (
              <button 
                onClick={() => setShowAuthModal(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full 
                flex items-center gap-2 transition duration-300"
              >
                Join Our Cause <ArrowRight className="w-5 h-5" />
              </button>
            )}
            <button 
              onClick={() => setShowDonateModal(true)}
              className="bg-white text-green-600 hover:bg-green-50 px-8 py-3 rounded-full 
              flex items-center gap-2 transition duration-300"
            >
              Donate <Heart className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* For Adoption & Rescue Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto flex">
          {/* Adoption Section */}
          <div className="w-1/2 pr-4">
            <h2 className="text-4xl font-bold text-center mb-6">For Adoption</h2>
            <Slider dots={true} infinite={true} speed={500} slidesToShow={1} slidesToScroll={1}>
              {adoptionListings.map((animal, index) => (
                <div key={index} className="bg-white p-8 rounded-xl shadow-lg">
                  <img src={animal.image} alt={animal.name} className="w-full h-48 object-cover rounded-lg mb-4" />
                  <h3 className="text-2xl font-semibold mb-2">{animal.name}</h3>
                  <p className="text-gray-600">Location: {animal.location}</p>
                  <p className="text-gray-700 mt-2">{animal.description}</p>
                </div>
              ))}
            </Slider>
          </div>

          {/* Rescue Stories Section */}
          <div className="w-1/2 pl-4">
            <h2 className="text-4xl font-bold text-center mb-6">Rescue Stories</h2>
            <Slider dots={true} infinite={true} speed={500} slidesToShow={1} slidesToScroll={1}>
              {rescueStories.map((story, index) => (
                <div key={index} className="bg-white p-8 rounded-xl shadow-lg">
                  <img src={story.image} alt={story.title} className="w-full h-48 object-cover rounded-lg mb-4" />
                  <h3 className="text-2xl font-semibold mb-2">{story.title}</h3>
                  <p className="text-gray-600">{story.date}</p>
                  <p className="text-gray-700 mt-2">{story.description}</p>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>

      {/* Education & Awareness Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Education & Awareness</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Animal Care Guides */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">Animal Care Guides</h3>
              <p className="text-gray-700 mb-4">Learn about pet care, training, and health tips.</p>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg">Explore Guides</button>
            </div>

            {/* Laws & Rights */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">Raise An Issue</h3>
              <p className="text-gray-700 mb-4">Report animal welfare concerns or violations.</p>
              <button 
                onClick={() => setShowGoogleFormModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Google Form
              </button>
            </div>
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
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full"
            >
              Donate Now
            </button>
            <button className="border-2 border-green-600 text-green-600 hover:bg-green-50 
              px-8 py-3 rounded-full"
            >
              Volunteer
            </button>
          </div>
        </div>
      </section>

      {/* Toggle Button for Submitted Issues */}
      <button 
        onClick={() => setShowSubmittedIssues(prev => !prev)} 
        className="bg-blue-600 text-white px-4 py-2 rounded-lg mb-4"
      >
        {showSubmittedIssues ? 'Hide Submitted Issues' : 'Show Submitted Issues'}
      </button>

      {/* Submitted Issues Section */}
      {showSubmittedIssues && (
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-6">Submitted Issues</h2>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              {issues.length > 0 ? (
                issues.map((issue, index) => (
                  <div key={index} className="border-b py-4">
                    <h3 className="text-xl font-semibold">{issue.title}</h3>
                    <p className="text-gray-600">{issue.description}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No issues reported yet.</p>
              )}
            </div>
          </div>
        </section>
      )}

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
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />

      <IssueReportModal 
        isOpen={showIssueReportModal}
        onClose={() => setShowIssueReportModal(false)}
        onSubmit={handleIssueSubmit}
      />


      <GoogleFormModal
        isOpen={showGoogleFormModal}
        onClose={() => setShowGoogleFormModal(false)}
      />

      {showVideoCall && <VideoCall onClose={() => setShowVideoCall(false)} />}
      {showExpertChat && <ExpertChat onClose={() => setShowExpertChat(false)} />}
    </div>
  );
}

const AppWrapper: React.FC = () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};

export default AppWrapper;