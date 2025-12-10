import React, { useState, useEffect, useCallback } from 'react';
import { fetchCompetitions } from './services/geminiService';
import { Competition, SearchFilters, FieldOfInterest, EducationLevel, User } from './types';
import CompetitionCard from './components/CompetitionCard';
import CompetitionModal from './components/CompetitionModal';
import AuthModal from './components/AuthModal';
import AuthForm from './components/AuthForm';
import IndiaMap from './components/IndiaMap';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import { SearchIcon, FilterIcon, LoaderIcon, TrophyIcon, SunIcon, MoonIcon, LogOutIcon, MenuIcon } from './components/Icons';

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh", "Chhattisgarh", 
  "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Goa", "Gujarat", "Haryana", 
  "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Ladakh", 
  "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", 
  "Nagaland", "Odisha", "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", 
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const App: React.FC = () => {
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedComp, setSelectedComp] = useState<Competition | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  
  // Auth State
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [filters, setFilters] = useState<SearchFilters>({
    country: 'India',
    state: '',
    field: FieldOfInterest.STEM,
    level: EducationLevel.HIGH_SCHOOL
  });

  const [hasSearched, setHasSearched] = useState(false);

  // Handle dark mode toggle
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Load user from local storage
  useEffect(() => {
    const storedUser = localStorage.getItem('competeConnectUser');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse stored user", e);
      }
    }
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('competeConnectUser', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('competeConnectUser');
    // Reset search state on logout
    setHasSearched(false);
    setCompetitions([]);
  };

  const handleSearch = useCallback(async () => {
    setLoading(true);
    setHasSearched(true);
    setCompetitions([]); // Clear previous results
    
    try {
      const data = await fetchCompetitions(filters);
      setCompetitions(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${darkMode ? 'bg-slate-900 text-gray-100' : 'bg-slate-50 text-gray-800'}`}>
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 sticky top-0 z-40 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center">
             {/* Hamburger Menu Button */}
             <button 
                className="p-2 mr-2 -ml-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-700 focus:outline-none transition-colors" 
                onClick={() => setIsSidebarOpen(true)}
             >
                <MenuIcon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
             </button>

             <div className="flex items-center space-x-2 cursor-pointer" onClick={() => { setHasSearched(false); setCompetitions([]); }}>
                <div className="bg-primary-600 text-white p-1.5 rounded-lg">
                  <TrophyIcon className="w-5 h-5" />
                </div>
                <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-700 to-primary-500 dark:from-primary-400 dark:to-primary-200 hidden sm:block">
                  CompeteConnect
                </h1>
             </div>
          </div>

          <div className="flex items-center space-x-4 md:space-x-6">
            
            {/* Auth & Theme Controls */}
            <div className="flex items-center space-x-3">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors focus:outline-none"
                aria-label="Toggle Dark Mode"
              >
                {darkMode ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
              </button>

              {user ? (
                <div className="flex items-center space-x-3 pl-3 border-l border-gray-200 dark:border-slate-700">
                  <div className="hidden sm:block text-right">
                    <p className="text-sm font-bold text-gray-900 dark:text-white leading-tight">{user.name}</p>
                    <p className="text-[10px] font-medium uppercase tracking-wider text-primary-600 dark:text-primary-400">{user.role}</p>
                  </div>
                  <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold shadow-md">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                </div>
              ) : (
                <div className="pl-3 border-l border-gray-200 dark:border-slate-700 hidden sm:block">
                   <button 
                     onClick={() => setIsAuthModalOpen(true)}
                     className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline"
                   >
                     Sign In
                   </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar Navigation */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)}
        user={user}
        onLogout={handleLogout}
        onLogin={() => setIsAuthModalOpen(true)}
      />

      {/* HERO SECTION: Split Layout for Guest, Search for User */}
      {!user ? (
        <div className="flex flex-col lg:flex-row h-auto lg:min-h-[calc(100vh-4rem)] border-b border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900">
          
          {/* LEFT: 30% Auth Section */}
          <div className="w-full lg:w-[30%] bg-white dark:bg-slate-800 border-r border-gray-200 dark:border-slate-700 p-6 md:p-10 flex flex-col justify-center shadow-2xl z-20 order-1">
             <div className="lg:hidden mb-8 text-center">
               <h1 className="text-3xl font-bold text-primary-600 mb-2">CompeteConnect</h1>
               <p className="text-gray-500 dark:text-gray-400">Track competition instantly.</p>
             </div>
             <div className="w-full">
               <AuthForm onLogin={handleLogin} />
             </div>
          </div>

          {/* RIGHT: 70% Map Section */}
          <div className="w-full lg:w-[70%] relative bg-slate-900 overflow-hidden min-h-[500px] lg:min-h-0 order-2">
             <div className="absolute inset-0 z-0">
                <IndiaMap />
             </div>
             <div className="absolute bottom-0 left-0 right-0 p-8 z-10 pointer-events-none bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent text-center lg:text-left">
                <div className="max-w-3xl mx-auto lg:mx-0">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-3 leading-tight text-shadow-lg">
                    Visualize Your Competition
                  </h2>
                  <p className="text-lg text-gray-300 font-medium max-w-2xl">
                    See where you stand among thousands of students across the country.
                  </p>
                </div>
             </div>
          </div>

        </div>
      ) : (
        /* LOGGED IN HERO: Search Dashboard */
        <div className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center max-w-3xl mx-auto mb-8">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl mb-2">
                  Find Your Next Challenge
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Welcome back, {user.name}. Ready to compete?
                </p>
            </div>

            {/* Search Bar Panel */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl shadow-gray-200/50 dark:shadow-black/20 border border-gray-100 dark:border-slate-700 p-4 md:p-6 max-w-4xl mx-auto transition-colors duration-300">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  
                  {/* State Input */}
                  <div className="space-y-1">
                      <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Choose Your State</label>
                      <select
                        name="state"
                        value={filters.state}
                        onChange={handleFilterChange}
                        className="w-full px-3 py-2.5 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all appearance-none text-gray-900 dark:text-white"
                      >
                        <option value="">Select State</option>
                        {indianStates.map(state => (
                          <option key={state} value={state}>{state}</option>
                        ))}
                      </select>
                  </div>

                  {/* Field Select */}
                  <div className="space-y-1">
                      <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Field of Interest</label>
                      <select
                        name="field"
                        value={filters.field}
                        onChange={handleFilterChange}
                        className="w-full px-3 py-2.5 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all appearance-none text-gray-900 dark:text-white"
                      >
                        {Object.values(FieldOfInterest).map((field) => (
                          <option key={field} value={field}>{field}</option>
                        ))}
                      </select>
                  </div>

                    {/* Search Button */}
                  <div className="flex items-end">
                      <button
                        onClick={handleSearch}
                        disabled={loading}
                        className="w-full h-[46px] bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg flex items-center justify-center transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-primary-500/20 active:scale-[0.98]"
                      >
                        {loading ? (
                          <>
                            <LoaderIcon className="animate-spin w-5 h-5 mr-2" />
                            Searching...
                          </>
                        ) : (
                          <>
                            <SearchIcon className="w-5 h-5 mr-2" />
                            Find Competitions
                          </>
                        )}
                      </button>
                  </div>
                </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area (Results) */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Display Results Section if Searched or for general info */}
        {user && (
          <>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {hasSearched ? 'Search Results' : 'Popular Categories'}
              </h3>
              {hasSearched && (
                 <span className="text-sm text-gray-500 dark:text-gray-400">
                    Showing results for {filters.field} in {filters.state ? `${filters.state}, ` : ''}{filters.country}
                 </span>
              )}
            </div>

            {/* Empty State / Intro */}
            {!hasSearched && !loading && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 {[
                   { title: "STEM & Coding", icon: "💻", desc: "Hackathons, Math Olympiads, and Science Fairs." },
                   { title: "Arts & Design", icon: "🎨", desc: "Photography contests, Design challenges, and Art showcases." },
                   { title: "Business & Debate", icon: "📢", desc: "Case studies, Model UN, and Startup pitches." }
                 ].map((item, idx) => (
                   <div key={idx} className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm text-center hover:shadow-md transition-all">
                     <div className="text-4xl mb-4">{item.icon}</div>
                     <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{item.title}</h4>
                     <p className="text-gray-600 dark:text-gray-300">{item.desc}</p>
                   </div>
                 ))}
              </div>
            )}

            {/* Loading Skeleton */}
            {loading && (
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                 {[1, 2, 3, 4, 5, 6].map((n) => (
                   <div key={n} className="bg-white dark:bg-slate-800 rounded-xl h-96 shadow-sm border border-gray-100 dark:border-slate-700 animate-pulse flex flex-col">
                     <div className="h-48 bg-gray-200 dark:bg-slate-700 w-full"></div>
                     <div className="p-5 flex-1 space-y-4">
                       <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-3/4"></div>
                       <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-1/2"></div>
                       <div className="mt-auto pt-4 space-y-2">
                          <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded w-full"></div>
                          <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded w-2/3"></div>
                       </div>
                     </div>
                   </div>
                 ))}
               </div>
            )}

            {/* Results Grid */}
            {!loading && hasSearched && competitions.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {competitions.map((comp) => (
                  <CompetitionCard 
                    key={comp.id} 
                    competition={comp} 
                    onClick={setSelectedComp} 
                  />
                ))}
              </div>
            )}

            {/* No Results State */}
            {!loading && hasSearched && competitions.length === 0 && (
               <div className="text-center py-20">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-slate-800 mb-4">
                    <FilterIcon className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">No competitions found</h3>
                  <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mt-2">
                    We couldn't find any competitions matching your criteria. Try adjusting your location or field of interest.
                  </p>
               </div>
            )}
            
            {hasSearched && (
              <div className="mt-12 text-center text-xs text-gray-400 dark:text-gray-500">
                <p>Disclaimer: Competition data is generated by AI for discovery purposes. Please verify details on official websites.</p>
              </div>
            )}
          </>
        )}

        {!user && (
           <div className="py-12 text-center text-gray-500 dark:text-gray-400">
             <p>Join thousands of students discovering new opportunities every day.</p>
           </div>
        )}

      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <CompetitionModal 
        competition={selectedComp} 
        onClose={() => setSelectedComp(null)} 
      />
      
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
      />

    </div>
  );
};

export default App;
