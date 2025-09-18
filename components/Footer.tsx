
import React from 'react';

interface FooterProps {
    viewCount: number;
}

const GoldenArchesIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
        <path d="M 20 90 Q 35 15 50 90 L 40 90 Q 35 45 30 90 Z" />
        <path d="M 50 90 Q 65 15 80 90 L 70 90 Q 65 45 60 90 Z" />
    </svg>
);

export const Footer: React.FC<FooterProps> = ({ viewCount }) => {
    return (
        <footer className="bg-mckimmels-red text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
                    <div className="flex items-center mb-4 md:mb-0">
                        <GoldenArchesIcon className="h-10 w-10 text-mckimmels-yellow" />
                        <span className="ml-3 text-2xl font-bold">McKimmel's</span>
                    </div>
                    <div className="text-sm">
                        <p>&copy; 2025 McKimmel's Corporation. All Rights Reserved.</p>
                        <p className="mt-1">This is a satire site. All content is fictional and for entertainment purposes only.</p>
                    </div>
                    <div className="text-sm mt-4 md:mt-0 text-center">
                        <p className="font-semibold">Total Page Views</p>
                        <p className="text-lg font-bold text-mckimmels-yellow">{viewCount > 0 ? viewCount.toLocaleString() : 'Loading...'}</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};