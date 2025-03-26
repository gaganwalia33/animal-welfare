// SubmittedIssues.tsx
import React from 'react';

interface Issue {
  title: string;
  description: string;
}

interface SubmittedIssuesProps {
  issues: Issue[];
}

const SubmittedIssues: React.FC<SubmittedIssuesProps> = ({ issues }) => {
  return (
    <div className="max-w-7xl mx-auto py-20 px-4">
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
  );
};

export default SubmittedIssues;