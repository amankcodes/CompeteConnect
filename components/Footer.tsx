import React from 'react';
import { 
  TwitterIcon, 
  InstagramIcon, 
  LinkedInIcon, 
  MapPinIcon, 
  PhoneIcon, 
  MailIcon,
  TrophyIcon 
} from './Icons';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Section 1: Brand + Mission */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
               <div className="bg-primary-600 text-white p-1.5 rounded-lg">
                 <TrophyIcon className="w-5 h-5" />
               </div>
               <span className="text-xl font-bold text-white tracking-tight">CompeteConnect</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Aspirants deserve clarity, not confusion. <br/><br/>
              We exist to bring transparency to competitive exams by showing the real picture — how many are preparing with you, where the competition stands, and how your journey connects with thousands of unseen dreamers across India.
              <br/><br/>
              Your effort should feel guided, not lonely.
              CompeteConnect is here to light up that path.
            </p>
          </div>

          {/* Section 2: Quick Navigation */}
          <div className="grid grid-cols-2 gap-6">
             <div>
                <h4 className="text-white font-semibold mb-4">Explore</h4>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li><a href="#" className="hover:text-primary-400 transition-colors">Home</a></li>
                  <li><a href="#" className="hover:text-primary-400 transition-colors">Dashboard</a></li>
                  <li><a href="#" className="hover:text-primary-400 transition-colors">Competition Map</a></li>
                  <li><a href="#" className="hover:text-primary-400 transition-colors">Popular Exams</a></li>
                  <li><a href="#" className="hover:text-primary-400 transition-colors">Exam Insights</a></li>
                </ul>
             </div>
             <div>
                <h4 className="text-white font-semibold mb-4">Account</h4>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li><a href="#" className="hover:text-primary-400 transition-colors">Sign In</a></li>
                  <li><a href="#" className="hover:text-primary-400 transition-colors">Create Account</a></li>
                  <li><a href="#" className="hover:text-primary-400 transition-colors">Candidate Login</a></li>
                  <li><a href="#" className="hover:text-primary-400 transition-colors">Organizer Login</a></li>
                </ul>
             </div>
          </div>

          {/* Section 3 & 4: Company & Legal */}
           <div className="grid grid-cols-2 gap-6">
             <div>
                <h4 className="text-white font-semibold mb-4">Company</h4>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li><a href="#" className="hover:text-primary-400 transition-colors">About Us</a></li>
                  <li><a href="#" className="hover:text-primary-400 transition-colors">Contact Support</a></li>
                  <li><a href="#" className="hover:text-primary-400 transition-colors">Partnerships</a></li>
                  <li><a href="#" className="hover:text-primary-400 transition-colors">Privacy & Data Safety</a></li>
                </ul>
             </div>
             <div>
                <h4 className="text-white font-semibold mb-4">Legal</h4>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li><a href="#" className="hover:text-primary-400 transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-primary-400 transition-colors">Terms & Conditions</a></li>
                  <li><a href="#" className="hover:text-primary-400 transition-colors">Cookie Policy</a></li>
                  <li><a href="#" className="hover:text-primary-400 transition-colors">Data Usage Guidelines</a></li>
                </ul>
             </div>
          </div>

          {/* Section 6 & 5: Address, Support, Socials */}
          <div className="space-y-6">
            <h4 className="text-white font-semibold">Office & Support</h4>
            
            <div className="flex items-start space-x-3 text-sm text-slate-400">
              <MapPinIcon className="w-5 h-5 text-primary-500 shrink-0 mt-0.5" />
              <span>2nd Floor, Rampur Dumra (Mokama), Patna, Bihar – 803301</span>
            </div>

            <div className="flex items-center space-x-3 text-sm text-slate-400">
              <PhoneIcon className="w-5 h-5 text-primary-500 shrink-0" />
              <span>+91 8252363485</span>
            </div>

            <div className="flex items-center space-x-3 text-sm text-slate-400">
              <MailIcon className="w-5 h-5 text-primary-500 shrink-0" />
              <span>amankr1705@gmail.com</span>
            </div>

            <div className="pt-4">
               <div className="flex space-x-4">
                 <a href="#" className="p-2 bg-slate-900 rounded-full text-slate-400 hover:text-white hover:bg-primary-600 transition-all">
                   <LinkedInIcon className="w-5 h-5" />
                 </a>
                 <a href="#" className="p-2 bg-slate-900 rounded-full text-slate-400 hover:text-white hover:bg-primary-600 transition-all">
                   <TwitterIcon className="w-5 h-5" />
                 </a>
                 <a href="#" className="p-2 bg-slate-900 rounded-full text-slate-400 hover:text-white hover:bg-primary-600 transition-all">
                   <InstagramIcon className="w-5 h-5" />
                 </a>
               </div>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 space-y-4 md:space-y-0">
           {/* Section 7: Licensing */}
           <div className="text-center md:text-left space-y-2">
              <p>© 2025 CompeteConnect. All rights reserved.</p>
              <p>All trademarks, logos and names belong to their respective owners.</p>
              <p>CompeteConnect complies with all applicable Indian IT regulations.</p>
           </div>
           
           {/* Section 8: Creative Line */}
           <div className="text-center md:text-right">
              <p className="text-slate-400 font-medium">
                Crafted with data, grit and a quiet fire by <span className="text-primary-500">Aman Kumar</span>.
              </p>
           </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;