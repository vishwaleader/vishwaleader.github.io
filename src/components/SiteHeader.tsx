"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { checkAdminSession, logoutAdmin } from "@/app/actions/adminAuth";
import Link from "next/link";

export default function SiteHeader() {
    const pathname = usePathname();
    const [user, setUser] = useState<User | null>(null);
    const [memberData, setMemberData] = useState<any>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // All hooks run unconditionally — guard is AFTER hooks below
    useEffect(() => {
        // Don't run auth listener on auth pages
        if (pathname?.startsWith("/auth")) return;

        let unsubscribe = () => {};

        const initAuth = async () => {
            try {
                const isAdmin = await checkAdminSession();
                if (isAdmin) {
                    setUser({ email: "vishwaleader@admin", displayName: "Studio Admin", isAdmin: true } as any);
                    return;
                }
            } catch (err) {
                console.error("Session check failed", err);
            }

            unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
                setUser(currentUser);
                if (currentUser) {
                    try {
                        const userRef = doc(db, 'users', currentUser.uid);
                        const docSnap = await getDoc(userRef);
                        if (docSnap.exists()) {
                            setMemberData(docSnap.data());
                        }
                    } catch (e) {
                        console.error("Firestore not initialized:", e);
                    }
                }
            });
        };

        initAuth();
        return () => unsubscribe();
    }, [pathname]);

    const handleLogout = async () => {
        try {
            if ((user as any)?.isAdmin) {
                await logoutAdmin();
                window.location.href = '/';
                return;
            }
            await signOut(auth);
            window.location.href = '/';
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    // Guard placed AFTER all hooks — safe to return null here
    if (pathname?.startsWith("/auth") || pathname?.startsWith("/checkout")) {
        return null;
    }

    return (
        <>
            <div className="bg-brandBlue text-white py-3 px-4 text-center border-b border-white/10 text-xs tracking-wide font-semibold relative z-50">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                    <a id="nav-abstract-strip" href="/call-for-papers" className="hover:text-amber-300 transition-colors flex items-center gap-1.5"><i className="fa-solid fa-graduation-cap"></i> Call for Abstracts</a>
                    <span className="hidden sm:inline text-white/30">|</span>
                    <a id="nav-business-strip" href="/business-summit" className="hover:text-amber-300 transition-colors flex items-center gap-1.5"><i className="fa-solid fa-briefcase"></i> Call for Business Participation</a>
                    <span className="hidden sm:inline text-white/30">|</span>
                    <a id="nav-award-strip" href="/awards" className="hover:text-amber-300 transition-colors flex items-center gap-1.5"><i className="fa-solid fa-trophy"></i> Call for Award Nominations</a>
                </div>
            </div>

            {/* Navigation Header */}
            <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-40 view-transition-header">
                <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/#home" className="group flex items-center gap-2 md:gap-3">
                            <img src="/assets/images/vishwaleader-logo-hd.png" 
                                alt="Vishwa Leader Logo" 
                                className="h-9 md:h-12 w-auto object-contain transition-transform group-hover:scale-105" 
                                fetchPriority="high"
                                onError={() => {}} />
                            <div className="flex flex-col gap-0.5 leading-none">
                                <span className="text-base md:text-lg font-black tracking-tight text-brandBlue font-display">Vishwa Leader</span>
                                <span className="text-[9px] md:text-[10px] font-black tracking-widest text-brandBlue uppercase border border-brandBlue/20 px-2 py-0.5 rounded bg-brandBlue/5 self-start">
                                    Techmedia
                                </span>
                            </div>
                        </Link>
                    </div>

                    {/* Hamburger Button for Mobile */}
                    <button 
                        className="md:hidden flex flex-col items-center justify-center gap-1.5 p-2 rounded-lg hover:bg-slate-100 transition-colors focus:outline-none ml-auto"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle Menu"
                    >
                        <div className={`w-6 h-0.5 bg-slate-700 rounded transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
                        <div className={`w-6 h-0.5 bg-slate-700 rounded transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></div>
                        <div className={`w-6 h-0.5 bg-slate-700 rounded transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
                    </button>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600">
                        <Link href="/mission" className="hover:text-brandBlue transition-colors font-bold text-slate-800">Mission</Link>
                        <Link href="/#about" className="hover:text-brandBlue transition-colors">Corporate</Link>
                        <Link href="/pricing" className="hover:text-brandBlue transition-colors">Pricing</Link>
                        <div className="relative group/nav">
                            <button className="hover:text-brandBlue transition-colors flex items-center gap-1">
                                Events 2026 <i className="fa-solid fa-chevron-down text-[10px]"></i>
                            </button>
                            <div className="absolute top-full left-0 pt-2 w-56 hidden group-hover/nav:block z-50">
                                <div className="bg-white border border-slate-200 rounded-xl shadow-xl p-2">
                                    <Link href="/call-for-papers" className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-brandBlue rounded-lg transition-colors">Call for Papers</Link>
                                    <Link href="/business-summit" className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-brandBlue rounded-lg transition-colors">Business Summit</Link>
                                    <Link href="/awards" className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-brandBlue rounded-lg transition-colors">Awards Nominations</Link>
                                    <Link href="/souvenir-articles" className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-brandBlue rounded-lg transition-colors">Souvenir Articles</Link>
                                    <Link href="/tour-package" className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-brandBlue rounded-lg transition-colors">London Tour Package</Link>
                                    <Link href="/advertise" className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-brandBlue rounded-lg transition-colors">Advertise with Us</Link>
                                </div>
                            </div>
                        </div>
                        <Link href="/gallery" className="hover:text-brandBlue transition-colors">Gallery</Link>
                        <Link href="/archives" className="hover:text-brandBlue transition-colors">Archive</Link>
                        <Link href="/#networks" className="hover:text-brandBlue transition-colors">Networks</Link>
                        <Link href="/organizers" className="hover:text-brandBlue transition-colors">Organizers</Link>

                        {/* Auth State */}
                        {!user ? (
                        <div id="nav-login-links">
                            <Link href="/auth/member" className="text-brandBlue hover:text-brandBlue/80 transition-colors font-bold text-sm flex items-center gap-1">
                                <i className="fa-solid fa-right-to-bracket text-xs"></i> Login/SignIn
                            </Link>
                        </div>
                        ) : (
                        <div id="nav-user-status" className="relative flex items-center">
                            <button id="nav-status-btn" onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center gap-1.5 focus:outline-none rounded-full p-0.5 border border-slate-200 hover:border-brandBlue transition-all bg-white" aria-expanded={isDropdownOpen}>
                                <img 
                                    src={user.photoURL || "https://placehold.co/100x100/0a1e4b/ffffff?text=User"} 
                                    referrerPolicy="no-referrer"
                                    alt="Profile" 
                                    className="w-11 h-11 rounded-full object-cover shrink-0" 
                                />
                                <i className={`fa-solid fa-chevron-down text-[8px] text-slate-500 mr-2 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} id="nav-status-chevron"></i>
                            </button>

                            {/* Dropdown card */}
                            <div id="nav-user-dropdown" className={`vl-dropdown absolute right-0 top-[calc(100%+8px)] w-64 bg-white border border-slate-200 rounded-2xl shadow-2xl p-4 z-50 ${isDropdownOpen ? 'block' : 'hidden'}`}>
                                {/* User info */}
                                <div className="flex items-center gap-3 mb-3 pb-3 border-b border-slate-100">
                                    <div id="nav-avatar" className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0 bg-brandBlue">
                                        {user.displayName ? user.displayName.charAt(0) : 'U'}
                                    </div>
                                    <div className="overflow-hidden">
                                        <p id="nav-display-name" className="text-xs font-bold text-slate-900 truncate">{user.displayName || 'User'}</p>
                                        <p id="nav-display-email" className="text-[10px] text-slate-405 truncate">{user.email}</p>
                                    </div>
                                </div>
                                {/* Role badge */}
                                <div id="nav-role-badge" className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full mb-3 text-center bg-brandBlue/10 text-brandBlue">
                                    {memberData?.role || 'Member'}
                                </div>
                                {/* Actions */}
                                <div className="space-y-1.5">
                                    <Link id="nav-portal-link" href={(user as any)?.isAdmin ? "/auth/admin" : "/auth/member"} className="flex items-center gap-2 w-full text-left text-xs font-semibold text-slate-700 hover:text-brandBlue hover:bg-brandBlue/5 px-3 py-2 rounded-xl transition-all">
                                        <i id="nav-portal-icon" className="fa-solid fa-user text-brandBlue"></i>
                                        <span id="nav-portal-text">{(user as any)?.isAdmin ? "Go to Dashboard" : "Go to Profile"}</span>
                                    </Link>
                                    <button onClick={handleLogout} className="flex items-center gap-2 w-full text-left text-xs font-semibold text-rose-600 hover:bg-rose-50 px-3 py-2 rounded-xl transition-all">
                                        <i className="fa-solid fa-right-from-bracket text-rose-500"></i> Sign Out
                                    </button>
                                </div>
                            </div>
                        </div>
                        )}
                    </nav>
                </div>

                {/* Mobile Navigation */}
                <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-[80vh] overflow-y-auto border-t border-slate-200' : 'max-h-0'}`}>
                    <nav className="flex flex-col py-4 px-4 gap-4 text-sm font-semibold text-slate-600 bg-white shadow-inner">
                        <Link href="/mission" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-brandBlue transition-colors font-bold text-slate-800">Mission</Link>
                        <Link href="/#about" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-brandBlue transition-colors">Corporate</Link>
                        <Link href="/pricing" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-brandBlue transition-colors">Pricing</Link>
                        <div className="flex flex-col gap-2">
                            <span className="font-bold text-slate-800 flex items-center gap-1">Events 2026 <i className="fa-solid fa-chevron-down text-[10px]"></i></span>
                            <div className="flex flex-col gap-3 pl-4 border-l-2 border-slate-100 mt-1">
                                <Link href="/call-for-papers" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-brandBlue transition-colors">Call for Papers</Link>
                                <Link href="/business-summit" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-brandBlue transition-colors">Business Summit</Link>
                                <Link href="/awards" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-brandBlue transition-colors">Awards Nominations</Link>
                                <Link href="/souvenir-articles" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-brandBlue transition-colors">Souvenir Articles</Link>
                                <Link href="/tour-package" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-brandBlue transition-colors">London Tour Package</Link>
                                <Link href="/advertise" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-brandBlue transition-colors">Advertise with Us</Link>
                            </div>
                        </div>
                        <Link href="/gallery" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-brandBlue transition-colors">Gallery</Link>
                        <Link href="/archives" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-brandBlue transition-colors">Archive</Link>
                        <Link href="/#networks" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-brandBlue transition-colors">Networks</Link>
                        <Link href="/organizers" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-brandBlue transition-colors">Organizers</Link>
                        
                        {/* Auth State for Mobile */}
                        {!user ? (
                            <div className="pt-4 border-t border-slate-100">
                                <Link href="/auth/member" onClick={() => setIsMobileMenuOpen(false)} className="text-brandBlue hover:text-brandBlue/80 transition-colors font-bold flex items-center gap-2">
                                    <i className="fa-solid fa-right-to-bracket"></i> Login/SignIn
                                </Link>
                            </div>
                        ) : (
                            <div className="pt-4 border-t border-slate-100 flex flex-col gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white bg-brandBlue shrink-0">
                                        {user.displayName ? user.displayName.charAt(0) : 'U'}
                                    </div>
                                    <div className="overflow-hidden">
                                        <p className="text-sm font-bold text-slate-900 truncate">{user.displayName || 'User'}</p>
                                        <p className="text-xs text-slate-500 truncate">{user.email}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <Link href={(user as any)?.isAdmin ? "/auth/admin" : "/auth/member"} onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-brandBlue">
                                        <i className="fa-solid fa-user text-brandBlue w-4 text-center"></i> {(user as any)?.isAdmin ? "Dashboard" : "Profile"}
                                    </Link>
                                    <button onClick={() => { setIsMobileMenuOpen(false); handleLogout(); }} className="flex items-center gap-2 text-sm font-semibold text-rose-600 text-left">
                                        <i className="fa-solid fa-right-from-bracket text-rose-500 w-4 text-center"></i> Sign Out
                                    </button>
                                </div>
                            </div>
                        )}
                    </nav>
                </div>
            </header>
        </>
    );
}
