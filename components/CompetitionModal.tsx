import React from 'react';
import { Competition } from '../types';
import { XIcon, CalendarIcon, MapPinIcon, ExternalLinkIcon, TrophyIcon } from './Icons';

interface CompetitionModalProps {
  competition: Competition | null;
  onClose: () => void;
}

const CompetitionModal: React.FC<CompetitionModalProps> = ({ competition, onClose }) => {
  if (!competition) return null;

  const imageUrl = `https://picsum.photos/seed/${competition.name.replace(/\s/g, '')}/800/400`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto relative flex flex-col animate-in zoom-in-95 duration-200 border border-transparent dark:border-slate-700">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/80 dark:bg-slate-900/80 rounded-full hover:bg-white dark:hover:bg-slate-900 transition-colors shadow-sm"
        >
          <XIcon className="w-5 h-5 text-gray-700 dark:text-gray-200" />
        </button>

        <div className="relative h-64 shrink-0">
           <img 
             src={imageUrl} 
             alt={competition.name} 
             className="w-full h-full object-cover"
           />
           <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 pt-20">
              <div className="flex items-center space-x-2 mb-2">
                <span className="px-2 py-1 bg-primary-600 text-white text-xs rounded font-semibold uppercase tracking-wider">
                  {competition.field}
                </span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-1">{competition.name}</h2>
              <p className="text-gray-200">{competition.organizer}</p>
           </div>
        </div>

        <div className="p-6 md:p-8 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                About the Competition
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {competition.description}
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-slate-700/50 p-5 rounded-xl space-y-4 border border-gray-100 dark:border-slate-700">
              <h4 className="font-semibold text-gray-900 dark:text-white">Key Details</h4>
              
              <div className="space-y-3">
                <div className="flex items-start">
                  <CalendarIcon className="w-5 h-5 text-primary-500 dark:text-primary-400 mt-0.5 mr-3 shrink-0" />
                  <div>
                    <span className="block text-sm font-medium text-gray-900 dark:text-white">Deadline</span>
                    <span className="text-sm text-gray-600 dark:text-gray-300">{competition.deadline}</span>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPinIcon className="w-5 h-5 text-primary-500 dark:text-primary-400 mt-0.5 mr-3 shrink-0" />
                  <div>
                    <span className="block text-sm font-medium text-gray-900 dark:text-white">Location</span>
                    <span className="text-sm text-gray-600 dark:text-gray-300">{competition.location}</span>
                  </div>
                </div>

                <div className="flex items-start">
                  <TrophyIcon className="w-5 h-5 text-primary-500 dark:text-primary-400 mt-0.5 mr-3 shrink-0" />
                  <div>
                    <span className="block text-sm font-medium text-gray-900 dark:text-white">Eligibility</span>
                    <span className="text-sm text-gray-600 dark:text-gray-300">{competition.eligibility}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
             <h4 className="font-medium text-gray-900 dark:text-white mb-3">Tags</h4>
             <div className="flex flex-wrap gap-2">
                {competition.tags.map((tag, i) => (
                  <span key={i} className="px-3 py-1 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium">
                    {tag}
                  </span>
                ))}
             </div>
          </div>

          <div className="pt-6 border-t border-gray-100 dark:border-slate-700 flex justify-end">
             <a 
              href={competition.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition-colors shadow-lg shadow-primary-500/30"
            >
              Visit Website
              <ExternalLinkIcon className="ml-2 w-4 h-4" />
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CompetitionModal;