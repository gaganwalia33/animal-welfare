import React, { useState } from 'react';
import { Camera, MapPin, Send } from 'lucide-react';
import { useAuth } from './AuthContext';

interface IssueReport {
  id?: string;
  title: string;
  description: string;
  location: string;
  imageUrl?: string;
  status: 'pending' | 'investigating' | 'resolved';
}

const IssueReportModal: React.FC<{ 
  isOpen: boolean, 
  onClose: () => void,
  onSubmit: (issue: IssueReport) => void 
}> = ({ isOpen, onClose, onSubmit }) => {
  const { user } = useAuth();
  const [issue, setIssue] = useState<IssueReport>({
    title: '',
    description: '',
    location: '',
    status: 'pending'
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setIssue(prev => ({ ...prev, imageUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!user) {
      alert('Please log in to submit an issue');
      return;
    }

    if (!issue.title || !issue.description || !issue.location) {
      alert('Please fill in all required fields');
      return;
    }

    onSubmit(issue);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6">Report Animal Welfare Issue</h2>
        
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Issue Title"
            className="w-full p-3 border rounded-lg"
            value={issue.title}
            onChange={(e) => setIssue(prev => ({ ...prev, title: e.target.value }))}
          />
          
          <textarea
            placeholder="Detailed Description"
            className="w-full p-3 border rounded-lg h-32"
            value={issue.description}
            onChange={(e) => setIssue(prev => ({ ...prev, description: e.target.value }))}
          />
          
          <div className="flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-green-600" />
            <input
              type="text"
              placeholder="Location of Incident"
              className="w-full p-3 border rounded-lg"
              value={issue.location}
              onChange={(e) => setIssue(prev => ({ ...prev, location: e.target.value }))}
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <label className="cursor-pointer">
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handleImageUpload}
              />
              <div className="flex items-center bg-gray-100 p-2 rounded-lg">
                <Camera className="w-5 h-5 mr-2" />
                <span>Upload Evidence</span>
              </div>
            </label>
            
            {imagePreview && (
              <img 
                src={imagePreview} 
                alt="Preview" 
                className="w-20 h-20 object-cover rounded-lg" 
              />
            )}
          </div>
          
          <button 
            onClick={handleSubmit}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg flex items-center justify-center"
          >
            <Send className="w-5 h-5 mr-2" /> Submit Issue Report
          </button>
          
          <button 
            onClick={onClose}
            className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg mt-2"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default IssueReportModal;