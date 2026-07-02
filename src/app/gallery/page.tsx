"use client";

import React, { useState, useEffect } from "react";

interface GalleryItem {
  src: string;
  title: string;
  desc: string;
  category: string;
  tags: string[];
  isPopular: boolean;
  isFeatured: boolean;
  date: string;
}

const galleryItems: GalleryItem[] = [
  // Category: London Summit
  {
    src: '/wp-content/uploads/2025/02/With-House-of-Lord-in-British-Parliament.png',
    title: 'House of Lords, British Parliament',
    desc: 'WL delegation meeting with members of the House of Lords in the British Parliament, London.',
    category: 'London Summit',
    tags: ['#LondonSummit', '#HouseOfLords'],
    isPopular: true,
    isFeatured: true,
    date: '2026-06-18'
  },
  {
    src: '/wp-content/uploads/2025/02/With-Sanjay-Khandagale-at-South-Hall-Vihara.png',
    title: 'Southall Buddha Vihara, London',
    desc: 'Ambedkarite delegation visit to Southall Buddha Vihara to coordinate civil rights conferences.',
    category: 'London Summit',
    tags: ['#LondonSummit'],
    isPopular: false,
    isFeatured: true,
    date: '2026-06-16'
  },
  {
    src: '/wp-content/uploads/2026/06/WhatsApp-Image-2026-06-18-at-12.15.22-PM.jpeg',
    title: 'London Organizing Committee Meeting',
    desc: 'WL organizing delegates finalizing schedules for the SOAS University conference and award ceremonies.',
    category: 'London Summit',
    tags: ['#LondonSummit'],
    isPopular: true,
    isFeatured: false,
    date: '2026-06-15'
  },
  // Category: Dignitaries
  {
    src: '/wp-content/uploads/2025/02/Chief-Secretary-J-P-Dange.png',
    title: 'Chief Secretary J. P. Dange',
    desc: 'WL director Shirish Ramteke presenting current publications to Maharashtra Chief Secretary J. P. Dange.',
    category: 'Dignitaries',
    tags: ['#Dignitaries'],
    isPopular: true,
    isFeatured: true,
    date: '2025-02-12'
  },
  {
    src: '/wp-content/uploads/2025/02/Principal-Secretary-Sunil-Soni.png',
    title: 'Principal Secretary Sunil Soni',
    desc: 'Executive meeting with Principal Secretary Sunil Soni to review WL socio-economic initiatives.',
    category: 'Dignitaries',
    tags: ['#Dignitaries'],
    isPopular: false,
    isFeatured: false,
    date: '2025-02-10'
  },
  {
    src: '/wp-content/uploads/2025/02/Jakie-Shroff.png',
    title: 'Meeting with Actor Jackie Shroff',
    desc: 'Vishwa Leader delegates sharing magazine details with veteran film actor Jackie Shroff.',
    category: 'Dignitaries',
    tags: ['#Dignitaries'],
    isPopular: true,
    isFeatured: false,
    date: '2025-02-08'
  },
  {
    src: '/wp-content/uploads/2025/02/Dhanraj-Pillai.png',
    title: 'Shirish Ramteke with Dhanraj Pillay',
    desc: 'WL publisher presenting issues to legendary Indian Hockey Captain Dhanraj Pillay.',
    category: 'Dignitaries',
    tags: ['#Dignitaries'],
    isPopular: false,
    isFeatured: true,
    date: '2025-02-07'
  },
  {
    src: '/wp-content/uploads/2025/02/Dhanraj-Pillai-and-Jakie-Shroff.png',
    title: 'Dhanraj Pillay & Jackie Shroff holding WL',
    desc: 'Jackie Shroff and Dhanraj Pillay holding and presenting Vishwa Leader Marathi periodical issues.',
    category: 'Dignitaries',
    tags: ['#Dignitaries', '#MagazineCovers'],
    isPopular: true,
    isFeatured: true,
    date: '2025-02-06'
  },
  {
    src: '/wp-content/uploads/2025/02/Nirmal-Deshmukh-SS-Shinde-and-R-D-Shinde.png',
    title: 'Meet with Senior Administration Officers',
    desc: 'Vishwa Leader team meeting with administrative officers Nirmal Deshmukh, SS Shinde, and RD Shinde in Mumbai.',
    category: 'Dignitaries',
    tags: ['#Dignitaries'],
    isPopular: false,
    isFeatured: false,
    date: '2025-02-04'
  },
  {
    src: '/wp-content/uploads/2025/02/Hari-Narke-J-P-Dange-Laxman-Doble.png',
    title: 'Prof. Hari Narke, J. P. Dange & Laxman Doble',
    desc: 'Professor Hari Narke, Laxman Doble, and Chief Secretary J. P. Dange at a Vishwa Leader publication forum.',
    category: 'Dignitaries',
    tags: ['#Dignitaries'],
    isPopular: true,
    isFeatured: false,
    date: '2025-02-03'
  },
  // Category: Magazine Covers
  {
    src: '/magazine-covers/1001702539.jpg',
    title: 'April 2016 Cover',
    desc: 'Special cover issue celebrating the 125th Birth Anniversary of Dr. B. R. Ambedkar.',
    category: 'Magazine Covers',
    tags: ['#MagazineCovers', '#DrAmbedkar'],
    isPopular: true,
    isFeatured: true,
    date: '2016-04-14'
  },
  {
    src: '/magazine-covers/1001702550.jpg',
    title: 'December 2016 Cover',
    desc: 'Dr. Babasaheb Ambedkar Mahaparinirvan Din Special Memorial Issue.',
    category: 'Magazine Covers',
    tags: ['#MagazineCovers', '#DrAmbedkar'],
    isPopular: true,
    isFeatured: true,
    date: '2016-12-06'
  },
  {
    src: '/magazine-covers/1001702555.jpg',
    title: 'August 2013 Cover',
    desc: 'Vishwa Leader international delegation holding magazines in New York City, US.',
    category: 'Magazine Covers',
    tags: ['#MagazineCovers'],
    isPopular: false,
    isFeatured: false,
    date: '2013-08-15'
  },
  {
    src: '/magazine-covers/December Cover 09.jpg',
    title: 'December 2009 Cover',
    desc: 'Vishwa Leader monthly Marathi periodical, December 2009 cover design.',
    category: 'Magazine Covers',
    tags: ['#MagazineCovers'],
    isPopular: false,
    isFeatured: false,
    date: '2009-12-01'
  },
  {
    src: '/magazine-covers/Nov cover 09.jpg',
    title: 'November 2009 Cover',
    desc: 'Vishwa Leader monthly Marathi periodical, November 2009 cover design.',
    category: 'Magazine Covers',
    tags: ['#MagazineCovers'],
    isPopular: false,
    isFeatured: false,
    date: '2009-11-01'
  },
  {
    src: '/magazine-covers/Oct Issue Cover 09.jpg',
    title: 'October 2009 Cover',
    desc: 'Vishwa Leader monthly Marathi periodical, October 2009 cover design.',
    category: 'Magazine Covers',
    tags: ['#MagazineCovers'],
    isPopular: false,
    isFeatured: false,
    date: '2009-10-01'
  },
  {
    src: '/magazine-covers/April  Issue Cover 10.jpg',
    title: 'April 2010 Cover',
    desc: 'Vishwa Leader cover celebrating Dr. Ambedkar Jayanti in April 2010.',
    category: 'Magazine Covers',
    tags: ['#MagazineCovers', '#DrAmbedkar'],
    isPopular: true,
    isFeatured: false,
    date: '2010-04-14'
  },
  // Category: Social Events
  {
    src: '/wp-content/uploads/2025/02/Bhimrao-Ambedkar-and-Bandu-Pandit-scaled.jpg',
    title: 'Bhimrao Ambedkar and Bandu Pandit',
    desc: 'WL delegation meeting with Bhimrao Ambedkar, grandson of Dr. B. R. Ambedkar, to discuss civil rights.',
    category: 'Social Events',
    tags: ['#SocialDrives', '#DrAmbedkar'],
    isPopular: true,
    isFeatured: true,
    date: '2025-02-14'
  },
  {
    src: '/wp-content/uploads/2025/02/Mr-and-Mrs-K-P-Choudhary-in-Delhi-scaled.jpg',
    title: 'Meeting with K. P. Choudhary in Delhi',
    desc: 'Community meet and WL magazine distribution in New Delhi.',
    category: 'Social Events',
    tags: ['#SocialDrives'],
    isPopular: false,
    isFeatured: false,
    date: '2025-02-13'
  },
  {
    src: '/wp-content/uploads/2025/02/DSC_0197.png',
    title: 'Public Magazine Distribution Drive',
    desc: 'WL members organizing public distribution drives to promote constitutional literacy.',
    category: 'Social Events',
    tags: ['#SocialDrives'],
    isPopular: false,
    isFeatured: false,
    date: '2025-02-11'
  },
  {
    src: '/wp-content/uploads/2025/02/DSC_0477.png',
    title: 'Vishwa Leader Socio-Economic Seminar',
    desc: 'Vishwa Leader delegation hosting a public seminar on social empowerment.',
    category: 'Social Events',
    tags: ['#SocialDrives'],
    isPopular: true,
    isFeatured: false,
    date: '2025-02-09'
  },
  {
    src: '/wp-content/uploads/2025/02/IMG_1895.png',
    title: 'Constitutional Advocacy Delegates Assembly',
    desc: 'Public delegate assembly coordinating civil rights events and publications.',
    category: 'Social Events',
    tags: ['#SocialDrives'],
    isPopular: false,
    isFeatured: false,
    date: '2025-02-05'
  },
  {
    src: '/wp-content/uploads/2025/02/DSC_0688.png',
    title: 'WL Committee Delegates Group',
    desc: 'WL committee members gathering for a national coordination meet.',
    category: 'Social Events',
    tags: ['#SocialDrives'],
    isPopular: true,
    isFeatured: false,
    date: '2025-02-02'
  }
];

export default function Page() {
  const [activeTab, setActiveTab] = useState<'recent' | 'popular' | 'featured' | 'covers' | 'all'>('recent');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  
  // Interactive Dropdowns
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Lightbox Modal state
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [slideshowActive, setSlideshowActive] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Categories list
  const categoriesList = ['all', 'London Summit', 'Dignitaries', 'Magazine Covers', 'Social Events'];
  
  // Hashtags list
  const hashtagsList = ['#LondonSummit', '#DrAmbedkar', '#HouseOfLords', '#MagazineCovers', '#Dignitaries', '#SocialDrives'];

  // Filtering Logic
  const filteredItems = galleryItems
    .filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Tag filter
      if (selectedTag && !item.tags.includes(selectedTag)) {
        return false;
      }
      // Tab conditions
      if (activeTab === 'popular' && !item.isPopular) return false;
      if (activeTab === 'featured' && !item.isFeatured) return false;
      if (activeTab === 'covers' && item.category !== 'Magazine Covers') return false;

      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          item.title.toLowerCase().includes(query) ||
          item.desc.toLowerCase().includes(query) ||
          item.tags.some((tag) => tag.toLowerCase().includes(query))
        );
      }
      return true;
    })
    .sort((a, b) => {
      // Sort by date descending
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

  // Slideshow loop
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (slideshowActive && lightboxIndex !== null && filteredItems.length > 0) {
      interval = setInterval(() => {
        setLightboxIndex((prevIndex) => {
          if (prevIndex === null) return null;
          return (prevIndex + 1) % filteredItems.length;
        });
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [slideshowActive, lightboxIndex, filteredItems.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") {
        setLightboxIndex(null);
        setSlideshowActive(false);
      } else if (e.key === "ArrowRight") {
        setLightboxIndex((prev) => (prev !== null ? (prev + 1) % filteredItems.length : null));
      } else if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) => (prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : null));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, filteredItems.length]);

  // Fullscreen support
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(() => {});
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      }).catch(() => {});
    }
  };

  // Helper to place active glowing pill dynamically
  const getPillStyle = () => {
    switch (activeTab) {
      case 'recent': return { left: '4px', width: '92px' };
      case 'popular': return { left: '100px', width: '98px' };
      case 'featured': return { left: '202px', width: '104px' };
      case 'covers': return { left: '310px', width: '92px' };
      case 'all': return { left: '406px', width: '110px' };
      default: return { left: '4px', width: '92px' };
    }
  };

  return (
    <>
      {/* Top Alert Banner */}
      <div className="bg-black/40 backdrop-blur text-slate-300 py-2.5 px-4 text-center border-b border-borderDark text-[11px] tracking-wider font-semibold relative z-50">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <a id="nav-abstract-strip" href="/call-for-papers" className="hover:text-brandBlue transition-colors flex items-center gap-1.5">
            <i className="fa-solid fa-graduation-cap text-brandBlue"></i> Call for Abstracts
          </a>
          <span className="hidden sm:inline text-slate-700">|</span>
          <a id="nav-business-strip" href="/business-summit" className="hover:text-brandBlue transition-colors flex items-center gap-1.5">
            <i className="fa-solid fa-briefcase text-brandBlue"></i> Call for Business Participation
          </a>
          <span className="hidden sm:inline text-slate-700">|</span>
          <a id="nav-award-strip" href="/awards" className="hover:text-brandBlue transition-colors flex items-center gap-1.5">
            <i className="fa-solid fa-trophy text-brandBlue"></i> Call for Award Nominations
          </a>
        </div>
      </div>

      {/* Navigation Header */}
      <header className="bg-slate-950/90 backdrop-blur-md border-b border-borderDark sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between gap-3 md:gap-4">
          
          {/* Logo & Techmedia Badge */}
          <div className="flex items-center gap-3 shrink-0">
            <a href="/" className="group flex items-center gap-2 md:gap-3">
              <img src="/assets/images/vishwaleader-logo-hd.png" alt="Vishwa Leader Logo" className="h-9 md:h-10 w-auto object-contain transition-transform group-hover:scale-105" />
              <span className="hidden sm:inline-block text-[9px] font-black tracking-widest text-brandBlue uppercase border border-brandBlue/30 px-2 py-0.5 rounded bg-brandBlue/10">
                Techmedia
              </span>
            </a>
          </div>

          {/* Categories Dropdown Button (Middle) */}
          <div className="relative flex items-center gap-2">
            <button 
              id="categoriesBtn" 
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              className="flex items-center gap-2 px-3 md:px-4 py-2 bg-slate-900 hover:bg-slate-850 border border-borderDark rounded-full text-xs font-semibold text-slate-300 hover:text-white transition-all"
            >
              <span className="capitalize">{selectedCategory === 'all' ? 'Categories' : selectedCategory}</span>
              <i className={`fa-solid fa-chevron-down text-[10px] transition-transform duration-200 ${isCategoryOpen ? 'rotate-180' : ''}`} id="categoriesChevron"></i>
            </button>
            
            {/* Categories Dropdown menu */}
            {isCategoryOpen && (
              <div id="categoriesDropdown" className="absolute top-12 left-0 w-56 bg-slate-950 border border-borderDark rounded-2xl shadow-2xl p-2 z-50">
                {categoriesList.map((cat) => (
                  <button 
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setIsCategoryOpen(false);
                      setSelectedTag(null);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-xs rounded-xl transition-colors capitalize ${selectedCategory === cat ? 'bg-brandBlue text-white font-bold' : 'hover:bg-slate-900 text-slate-350 hover:text-white'}`}
                  >
                    {cat === 'all' ? 'All Collections' : cat}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Main Web Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-bold uppercase tracking-wider text-slate-400">
            <a href="/#about" className="hover:text-white transition-colors">Corporate</a>
            <a href="/#conference" className="hover:text-white transition-colors">SOAS Conference</a>
            <a href="/#events" className="hover:text-white transition-colors">Events</a>
            <a href="/archives" className="hover:text-white transition-colors">Archive</a>
            <div id="nav-login-links">
              <a href="/auth/member" className="text-brandBlue hover:text-brandBlue/80 transition-colors font-bold text-sm flex items-center gap-1">
                <i className="fa-solid fa-right-to-bracket text-xs"></i> Login/SignIn
              </a>
            </div>
          </nav>

          {/* Search bar */}
          <div className="relative hidden sm:block w-44 md:w-60 shrink-0">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
              <i className="fa-solid fa-magnifying-glass text-xs"></i>
            </span>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search archives..." 
              className="w-full bg-slate-900/60 border border-borderDark focus:border-brandBlue focus:ring-1 focus:ring-brandBlue text-xs rounded-full pl-9 pr-4 py-2 outline-none text-slate-200 transition-all placeholder:text-slate-500" 
            />
          </div>

          {/* Mobile Hamburger Menu Button */}
          <button 
            id="menuBtn" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden relative w-10 h-10 text-slate-300 hover:text-white focus:outline-none flex items-center justify-center" 
            aria-label="Toggle Menu"
          >
            <div className="w-6 h-4 flex flex-col justify-between items-center relative">
              <span className={`w-full h-0.5 bg-slate-300 rounded transition-all duration-300 transform ${isMobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} id="bar1"></span>
              <span className={`w-full h-0.5 bg-slate-300 rounded transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} id="bar2"></span>
              <span className={`w-full h-0.5 bg-slate-300 rounded transition-all duration-300 transform ${isMobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} id="bar3"></span>
            </div>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div id="mobileMenu" className="lg:hidden bg-slate-950 border-t border-borderDark px-4 py-3 space-y-3 shadow-inner">
            {/* Mobile search */}
            <div className="sm:hidden">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                  <i className="fa-solid fa-magnifying-glass text-xs"></i>
                </span>
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search archives..." 
                  className="w-full bg-slate-900 border border-borderDark focus:border-brandBlue text-xs rounded-full pl-9 pr-4 py-2.5 outline-none text-slate-200 placeholder:text-slate-500" 
                />
              </div>
            </div>
            
            <div className="space-y-1.5">
              <a href="/#about" className="flex items-center py-2.5 px-3 text-sm font-semibold text-slate-300 hover:text-white active:bg-slate-900 rounded-xl transition-all border-b border-slate-900/50 last:border-0">
                <i className="fa-solid fa-building text-slate-500 mr-3 w-5 text-center text-xs"></i>
                <span>Corporate</span>
                <i className="fa-solid fa-chevron-right text-slate-600 ml-auto text-[9px]"></i>
              </a>
              <a href="/#conference" className="flex items-center py-2.5 px-3 text-sm font-semibold text-slate-300 hover:text-white active:bg-slate-900 rounded-xl transition-all border-b border-slate-900/50 last:border-0">
                <i className="fa-solid fa-graduation-cap text-slate-500 mr-3 w-5 text-center text-xs"></i>
                <span>SOAS Conference</span>
                <i className="fa-solid fa-chevron-right text-slate-600 ml-auto text-[9px]"></i>
              </a>
              <a href="/#events" className="flex items-center py-2.5 px-3 text-sm font-semibold text-slate-300 hover:text-white active:bg-slate-900 rounded-xl transition-all border-b border-slate-900/50 last:border-0">
                <i className="fa-solid fa-calendar-days text-slate-500 mr-3 w-5 text-center text-xs"></i>
                <span>Events</span>
                <i className="fa-solid fa-chevron-right text-slate-600 ml-auto text-[9px]"></i>
              </a>
              <a href="/archives" className="flex items-center py-2.5 px-3 text-sm font-semibold text-slate-300 hover:text-white active:bg-slate-900 rounded-xl transition-all border-b border-slate-900/50 last:border-0">
                <i className="fa-solid fa-box-archive text-slate-500 mr-3 w-5 text-center text-xs"></i>
                <span>Archive</span>
                <i className="fa-solid fa-chevron-right text-slate-600 ml-auto text-[9px]"></i>
              </a>

              <div className="pt-2 border-t border-slate-900 flex flex-col gap-1.5">
                <a href="/auth/member" className="flex items-center py-2.5 px-3 text-sm font-semibold text-brandBlue hover:text-brandBlue/85 active:bg-slate-900 rounded-xl transition-all">
                  <i className="fa-solid fa-right-to-bracket text-brandBlue mr-3 w-5 text-center text-xs"></i>
                  <span>Login/SignIn</span>
                  <i className="fa-solid fa-chevron-right text-slate-600 ml-auto text-[9px]"></i>
                </a>
                <a href="/auth/admin" className="flex items-center py-2.5 px-3 text-sm font-semibold text-indigo-400 hover:text-indigo-300 active:bg-slate-900 rounded-xl transition-all border-b border-slate-800 last:border-0">
                  <i className="fa-solid fa-user-shield text-indigo-400 mr-3 w-5 text-center text-xs"></i>
                  <span>Login as Team</span>
                  <i className="fa-solid fa-chevron-right text-slate-600 ml-auto text-[9px]"></i>
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Top Horizontal Subheader Tags Bar */}
      <div className="bg-slate-950/40 border-b border-borderDark py-3.5 overflow-x-auto select-none">
        <div className="max-w-7xl mx-auto px-6 flex items-center gap-2 md:justify-center text-[10px] md:text-xs font-semibold text-slate-450 whitespace-nowrap scrollbar-none">
          <span className="text-slate-600 uppercase tracking-widest text-[9px] mr-2">Quick Tags:</span>
          {hashtagsList.map((tag) => (
            <button 
              key={tag}
              onClick={() => {
                setSelectedTag(selectedTag === tag ? null : tag);
                setSelectedCategory('all');
              }}
              className={`px-3 py-1 border rounded-md transition-colors ${selectedTag === tag ? 'bg-brandBlue border-brandBlue text-white' : 'bg-slate-900 border-borderDark text-slate-300 hover:border-slate-700 hover:text-white'}`}
            >
              {tag}
            </button>
          ))}
          {(selectedTag || selectedCategory !== 'all' || searchQuery) && (
            <button 
              onClick={() => {
                setSelectedTag(null);
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="px-3 py-1 bg-slate-900/60 border border-borderDark text-amber-500 hover:text-amber-400 rounded-md transition-colors"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Main Workspace */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-6 py-10 space-y-10">
        
        {/* Glowing Navigation Tabs Section */}
        <div className="flex justify-center overflow-x-auto py-2">
          <div className="inline-flex p-1 bg-slate-950 border border-borderDark rounded-full shadow-2xl relative min-w-[520px]">
            <button  
              onClick={() => setActiveTab('recent')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 relative z-10 ${activeTab === 'recent' ? 'text-white font-black' : 'text-slate-400 hover:text-white'}`}
            >
              <i className="fa-solid fa-clock text-[10px]"></i> Recent
            </button>
            <button  
              onClick={() => setActiveTab('popular')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 relative z-10 ${activeTab === 'popular' ? 'text-white font-black' : 'text-slate-400 hover:text-white'}`}
            >
              <i className="fa-solid fa-fire text-[10px]"></i> Popular
            </button>
            <button  
              onClick={() => setActiveTab('featured')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 relative z-10 ${activeTab === 'featured' ? 'text-white font-black' : 'text-slate-400 hover:text-white'}`}
            >
              <i className="fa-solid fa-star text-[10px]"></i> Featured
            </button>
            <button  
              onClick={() => setActiveTab('covers')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 relative z-10 ${activeTab === 'covers' ? 'text-white font-black' : 'text-slate-400 hover:text-white'}`}
            >
              <i className="fa-solid fa-book-open text-[10px]"></i> Covers
            </button>
            <button  
              onClick={() => setActiveTab('all')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 relative z-10 ${activeTab === 'all' ? 'text-white font-black' : 'text-slate-400 hover:text-white'}`}
            >
              <i className="fa-solid fa-circle-nodes text-[10px]"></i> All Assets
            </button>

            {/* Glowing background pill */}
            <div 
              id="tab-glowing-pill" 
              className="absolute bg-brandBlue shadow-[0_0_15px_rgba(0,86,202,0.6)] rounded-full transition-all duration-300 ease-out z-0"
              style={{ ...getPillStyle(), top: '4px', bottom: '4px' }}
            ></div>
          </div>
        </div>

        {/* Section Title with left vertical accent bar */}
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <span className="w-[4px] h-[24px] bg-brandBlue rounded-full shadow-[0_0_8px_rgba(0,86,202,0.8)]"></span>
            <h2 id="section-title-header" className="font-display text-xl md:text-2xl font-black uppercase text-white tracking-tight">
              {activeTab === 'recent' && 'Recent Archives'}
              {activeTab === 'popular' && 'Popular Media'}
              {activeTab === 'featured' && 'Featured Assets'}
              {activeTab === 'covers' && 'Magazine Covers'}
              {activeTab === 'all' && 'All Gallery Assets'}
            </h2>
          </div>
          <p id="section-title-desc" className="text-xs text-slate-500 font-medium pl-4">
            {activeTab === 'recent' && 'Exploring the most recently added historical media and event photologues.'}
            {activeTab === 'popular' && 'High engagement public records and celebrated assembly coverage.'}
            {activeTab === 'featured' && 'Curated high-profile dignitaries and summit milestone photographs.'}
            {activeTab === 'covers' && 'Vishwa Leader monthly periodical cover designs spanning back over a decade.'}
            {activeTab === 'all' && 'Entire archive registry database compiled under corporate guidelines.'}
          </p>
        </div>

        {/* Wallpaper Card Grid */}
        {filteredItems.length > 0 ? (
          <div id="gallery-grid" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 min-h-[400px]">
            {filteredItems.map((item, idx) => (
              <div 
                key={item.src}
                onClick={() => {
                  setLightboxIndex(idx);
                  setSlideshowActive(false);
                }}
                className="group bg-slate-900 border border-borderDark rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:border-brandBlue/35 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="relative aspect-[3/4] md:aspect-[4/5] bg-slate-950 overflow-hidden shrink-0">
                  <img 
                    src={item.src} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-750 group-hover:scale-108"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/20 to-transparent opacity-60 group-hover:opacity-85 transition-opacity"></div>
                  
                  {/* Category overlay */}
                  <span className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur border border-borderDark text-[8px] font-extrabold uppercase tracking-widest text-slate-400 px-2 py-1 rounded">
                    {item.category}
                  </span>

                  {/* Magnifying glass icon overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="w-10 h-10 rounded-full bg-brandBlue shadow-lg flex items-center justify-center text-white text-sm">
                      <i className="fa-solid fa-magnifying-glass-plus"></i>
                    </span>
                  </div>
                </div>

                <div className="p-4 space-y-2 flex-grow flex flex-col justify-between bg-slate-900/50">
                  <div className="space-y-1">
                    <h4 className="font-display font-bold text-white text-xs md:text-sm line-clamp-1 group-hover:text-brandBlue transition-colors">{item.title}</h4>
                    <p className="text-[10px] text-slate-500 line-clamp-2 leading-relaxed font-light">{item.desc}</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 pt-1.5 border-t border-slate-950">
                    {item.tags.map((tag) => (
                      <span key={tag} className="text-[8px] font-mono text-slate-500">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div id="empty-state" className="text-center py-24 space-y-4">
            <div className="w-16 h-16 rounded-full bg-slate-900 border border-borderDark flex items-center justify-center text-slate-500 mx-auto text-xl">
              <i className="fa-solid fa-image-slash"></i>
            </div>
            <h3 className="font-display font-black text-slate-350 text-sm uppercase">No Records Found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
              Adjust your category dropdown selectors or clear search parameters to view other media segments.
            </p>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 pt-16 pb-8 border-t border-borderDark mt-auto">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 mb-12 text-xs">
          <div className="md:col-span-4 space-y-4">
            <span className="font-display text-sm font-black tracking-tight text-white uppercase">VISHWA LEADER</span>
            <p className="text-slate-550 leading-relaxed font-light">
              Vishwa Leader Techmedia Private Limited is an incorporated corporate media platform driving transnational academic forums and universal empowerment programs.
            </p>
            <div className="flex gap-4 text-slate-600 pt-2">
              <a href="https://prgi.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" title="PRGI"><i className="fa-solid fa-earth-asia text-base"></i></a>
              <a href="https://tibet.net/delegation-of-ambedkarites-meets-deputy-speaker-led-standing-committee-members/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" title="Tibet Net"><i className="fa-solid fa-circle-info text-base"></i></a>
            </div>
          </div>

          <div className="md:col-span-4 space-y-3">
            <h4 className="font-display font-bold border-b border-slate-900 pb-2 text-[10px] text-slate-500 uppercase tracking-widest">
              Verification Registers
            </h4>
            <ul className="space-y-2.5 font-light">
              <li>
                <a href="https://prgi.gov.in" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors flex items-center gap-1">
                  Press Registrar General of India Registry <i className="fa-solid fa-arrow-up-right-from-square text-[9px]"></i>
                </a>
              </li>
              <li>
                <a href="https://tracxn.com/d/legal-entities/india/vishwa-leader-techmedia-private-limited/__jDthDz58Owry-yAaHPhKSuhVYScE1DyjR4IGLp2Bhz8" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors flex items-center gap-1">
                  Ministry of Corporate Affairs Profile <i className="fa-solid fa-arrow-up-right-from-square text-[9px]"></i>
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-3">
            <h4 className="font-display font-bold border-b border-slate-900 pb-2 text-[10px] text-slate-500 uppercase tracking-widest">
              Registration Metadata
            </h4>
            <div className="bg-slate-900/40 border border-borderDark p-4 rounded-xl space-y-2 text-[10px] font-mono text-slate-500">
              <p><span className="text-slate-700">CIN:</span> U74999MH2016PTC273606</p>
              <p><span className="text-slate-700">REG DATE:</span> February 29, 2016</p>
              <p><span className="text-slate-700">RNI REG:</span> MAHMAR/2009/34832</p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 border-t border-slate-900 pt-8 text-center text-[10px] text-slate-650 font-normal">
          <p>© 2026 Vishwa Leader Techmedia Private Limited. All Rights Reserved. Compiled under RNI & MCA guidelines.</p>
        </div>
      </footer>

      {/* Interactive Lightbox Modal */}
      {lightboxIndex !== null && filteredItems[lightboxIndex] && (
        <div id="lightbox" className="fixed inset-0 z-50 bg-black/98 flex flex-col justify-center items-center transition-all duration-300">
          
          {/* Close button */}
          <button 
            onClick={() => {
              setLightboxIndex(null);
              setSlideshowActive(false);
            }}
            className="absolute top-6 right-6 text-slate-400 hover:text-white text-2xl focus:outline-none" 
            aria-label="Close Lightbox"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
          
          {/* Back Navigation */}
          <button 
            onClick={() => {
              setLightboxIndex((prev) => (prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : null));
              setSlideshowActive(false);
            }}
            className="absolute left-6 hidden md:block text-slate-400 hover:text-white text-4xl focus:outline-none" 
            aria-label="Previous Image"
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>

          {/* Next Navigation */}
          <button 
            onClick={() => {
              setLightboxIndex((prev) => (prev !== null ? (prev + 1) % filteredItems.length : null));
              setSlideshowActive(false);
            }}
            className="absolute right-6 hidden md:block text-slate-400 hover:text-white text-4xl focus:outline-none" 
            aria-label="Next Image"
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>
          
          <div className="max-w-4xl max-h-[85vh] px-4 flex flex-col justify-center items-center text-center">
            <img 
              id="lightbox-img" 
              src={filteredItems[lightboxIndex].src} 
              alt={filteredItems[lightboxIndex].title} 
              className="max-w-full max-h-[65vh] object-contain rounded-xl shadow-2xl border border-white/10" 
            />
            <h4 id="lightbox-caption" className="text-slate-300 text-xs md:text-sm font-medium mt-6 tracking-wide max-w-2xl px-6 leading-relaxed">
              <span className="font-bold text-white block mb-1 text-sm md:text-base">{filteredItems[lightboxIndex].title}</span>
              {filteredItems[lightboxIndex].desc}
            </h4>
            <div className="flex gap-2 justify-center mt-2.5">
              {filteredItems[lightboxIndex].tags.map((tag) => (
                <span key={tag} className="text-[10px] font-mono text-brandBlue">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Controls overlay bottom */}
          <div className="absolute bottom-6 flex items-center gap-6 bg-slate-950/80 backdrop-blur-md px-6 py-3 rounded-full border border-borderDark text-slate-300 select-none">
            <button 
              onClick={() => {
                setLightboxIndex((prev) => (prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : null));
                setSlideshowActive(false);
              }}
              className="hover:text-amber-400 transition-colors focus:outline-none text-xs" 
              title="Previous"
            >
              <i className="fa-solid fa-backward-step"></i>
            </button>
            <button 
              onClick={() => setSlideshowActive(!slideshowActive)}
              className={`hover:text-amber-400 transition-colors focus:outline-none text-xs ${slideshowActive ? 'text-amber-400' : ''}`} 
              title={slideshowActive ? "Pause Slideshow" : "Play Slideshow"}
            >
              <i className={`fa-solid ${slideshowActive ? 'fa-pause' : 'fa-play'}`}></i>
            </button>
            <button 
              onClick={() => {
                setLightboxIndex((prev) => (prev !== null ? (prev + 1) % filteredItems.length : null));
                setSlideshowActive(false);
              }}
              className="hover:text-amber-400 transition-colors focus:outline-none text-xs" 
              title="Next"
            >
              <i className="fa-solid fa-forward-step"></i>
            </button>
            
            <span className="w-[1px] h-4 bg-slate-800"></span>
            
            <button 
              onClick={toggleFullscreen}
              className={`hover:text-amber-400 transition-colors focus:outline-none text-xs ${isFullscreen ? 'text-amber-400' : ''}`}
              title="Toggle Fullscreen"
            >
              <i className="fa-solid fa-expand"></i>
            </button>
            
            <span className="w-[1px] h-4 bg-slate-800"></span>
            
            <span id="lightbox-counter" className="text-[10px] font-mono text-slate-500">
              {lightboxIndex + 1} / {filteredItems.length}
            </span>
          </div>
        </div>
      )}
    </>
  );
}
