import React from 'react';
import { Helmet } from "react-helmet";

<Helmet>
  <title>Merge PDF Online Free – AllInOnePDF</title>
  <meta name="description" content="Merge multiple PDFs into one file online for free." />
</Helmet>


const ToolCard = ({ title, description, icon: Icon, color }) => {
  return (
    <div className="p-6 bg-white border rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col items-start text-left group">
      <div className={`p-3 rounded-lg mb-4 ${color}`}>
        <Icon size={24} className="text-white" />
      </div>
      <h3 className="text-lg font-bold text-gray-800">{title}</h3>
      <p className="text-sm text-gray-500 mt-2">{description}</p>
    </div>
  );
};

export default ToolCard;