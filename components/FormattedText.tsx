import React from 'react';

interface FormattedTextProps {
  text: string;
}

export const FormattedText: React.FC<FormattedTextProps> = ({ text }) => {
  if (!text) {
    return null;
  }
  
  const parts = text.split('**');
  
  return (
    <>{parts.map((part, index) =>
        index % 2 === 1 ? <strong key={index} className="font-semibold text-white">{part}</strong> : part
      )}
    </>
  );
};