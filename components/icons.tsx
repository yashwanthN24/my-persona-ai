import React from 'react';

export const SendIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
    <path d="M3.105 3.105a.75.75 0 01.99.033L16.25 10l-12.155 6.862a.75.75 0 01-1.023-.959l1.83-5.494a.75.75 0 000-.818L2.115 4.094a.75.75 0 01.99-.99z" />
  </svg>
);

export const ChaiCodeIcon = ({ className }: { className?: string }) => (
  <img
    src="/images/chai.png"
    alt="Chai Code Icon"
    className={className ?? "w-10 h-10"}
  />
);

export const JudgeIcon = ({ className }: { className?: string }) => (
  <img src="/images/Judge.png" alt="Jusge Icon" className={className ?? "w-10 h-10"}/>
);

export const ResetIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M15.312 11.342a1.25 1.25 0 01-1.287 1.158l-2.035-.407a.75.75 0 00-.638.214l-1.402 1.401a3.75 3.75 0 11-4.486-4.486l1.401-1.402a.75.75 0 00.214-.638l-.407-2.035a1.25 1.25 0 011.158-1.287C11.378 2.76 13.29 3.42 15 4.5a.75.75 0 01-.64 1.28A6.47 6.47 0 0010 5.25a2.25 2.25 0 102.25 2.25c.162 0 .323-.01.482-.03a.75.75 0 01.834.423l.364.728a.75.75 0 01-.152.923l-1.879 1.409a.75.75 0 00-.28.56v.414a.75.75 0 00.75.75h.414a.75.75 0 00.56-.28l1.409-1.879a.75.75 0 01.923-.152l.728.364a.75.75 0 01.423.834c-.02.16-.03.32-.03.482a2.25 2.25 0 004.5 0c0-1.78-1.037-3.32-2.5-4.043a.75.75 0 01-.658 1.277c.97.502 1.658 1.54 1.658 2.766z" clipRule="evenodd" />
    </svg>
);

export const ExportIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
        <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" />
        <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
    </svg>
);

export const ComparisonIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
    <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a1 1 0 011-1h14a1 1 0 110 2H3a1 1 0 01-1-1zM1 15a1 1 0 100 2h18a1 1 0 100-2H1z" />
  </svg>
);

export const ChatIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M10 2c-4.418 0-8 3.134-8 7s3.582 7 8 7c.214 0 .425-.01.632-.031l2.34 2.34a.75.75 0 001.06-1.06l-2.34-2.34A6.96 6.96 0 0017 9c0-3.866-3.582-7-8-7z" clipRule="evenodd" />
  </svg>
);
