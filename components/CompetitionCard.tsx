import React from 'react';
import { Competition } from '../types';
import { CalendarIcon, MapPinIcon } from './Icons';

interface CompetitionCardProps {
  competition: Competition;
  onClick: (comp: Competition) => void;
}

const CompetitionCard: React.FC<CompetitionCardProps> = ({ competition, onClick }) => {
  const imageUrl = `https://picsum.photos/seed/${competition.name.replace(/\s/g, '')}/400/300`;

  return (
    <div 
      onClick={() => onClick(competition)}
      className="group bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-slate-700 cursor-pointer flex flex-col h-full"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={competition.name}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold text-primary-700 dark:text-primary-400 shadow-sm">
          {competition.field}
        </div>
      </div>
      
      <div className="p-5 flex-1 flex flex-col">
        <div className="mb-2">
           <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{competition.organizer}</span>
        </div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {competition.name}
        </h3>
        
        <div className="space-y-2 mt-auto">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
            <MapPinIcon className="w-4 h-4 mr-2 text-gray-400 dark:text-gray-500" />
            <span className="truncate">{competition.location}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
            <CalendarIcon className="w-4 h-4 mr-2 text-gray-400 dark:text-gray-500" />
            <span>Deadline: {competition.deadline}</span>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {competition.tags.slice(0, 3).map((tag, idx) => (
            <span key={idx} className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-50 dark:bg-slate-700 text-gray-600 dark:text-gray-300">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompetitionCard;