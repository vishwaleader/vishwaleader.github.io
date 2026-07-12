"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { pdfDownloadsList, magazineCoversList, createSlug } from "../data";
import { ArrowLeft, Download, ExternalLink, FileText, BookOpen } from "lucide-react";
import { use } from "react";

export default function ArchiveDocumentPage(props: { params: Promise<{ slug: string }> }) {
    const params = use(props.params);
    const { slug } = params;
    const [isMobile, setIsMobile] = useState(false);
    const [viewerMode, setViewerMode] = useState<'iframe' | 'google'>('iframe');

    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.innerWidth < 1024 || /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            setIsMobile(mobile);
            if (mobile) {
                setViewerMode('google');
            }
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    let item: any = pdfDownloadsList.find(pdf => createSlug(pdf.title) === slug);
    let type: 'pdf' | 'image' = 'pdf';

    if (!item) {
        item = magazineCoversList.find(cover => createSlug(cover.title) === slug);
        type = 'image';
    }

    if (!item) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                <div className="text-center space-y-4">
                    <p className="text-white text-xl font-semibold">Document not found.</p>
                    <Link href="/archives" className="text-blue-400 underline">← Back to Archives</Link>
                </div>
            </div>
        );
    }

    const pdfUrl = type === 'pdf' ? `/pdfs/${item.file}` : null;
    const fullPdfUrl = pdfUrl ? `${typeof window !== 'undefined' ? window.location.origin : ''}${pdfUrl}` : null;
    const googleViewerUrl = fullPdfUrl ? `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(fullPdfUrl)}` : null;

    return (
        <div className="flex flex-col bg-slate-100 font-sans" style={{ minHeight: 'calc(100vh - 64px)' }}>

            {/* Mobile Header Bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-slate-200 lg:hidden sticky top-0 z-30 shadow-sm">
                <Link href="/archives" className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-brandBlue transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    Archives
                </Link>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    {type === 'pdf' ? 'PDF Document' : 'Magazine'}
                </span>
            </div>

            <div className="flex-grow flex flex-col lg:flex-row w-full overflow-hidden bg-white" style={{ minHeight: 0 }}>

                {/* Desktop Sidebar */}
                <div className="hidden lg:flex w-80 shrink-0 border-r border-slate-200 bg-slate-50 p-6 flex-col justify-between overflow-y-auto">
                    <div className="space-y-6">
                        <Link href="/archives" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-brandBlue transition-colors group">
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                            Back to Archives
                        </Link>

                        <div className="aspect-[3/4] w-48 mx-auto rounded-xl overflow-hidden bg-white border border-slate-200 shadow-lg relative">
                            {type === 'image' ? (
                                <img src={encodeURI(`/magazine-covers/${item.src}`)} alt="Cover Image" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-slate-100 to-white flex flex-col justify-between p-4">
                                    <div className="absolute top-0 left-0 w-2.5 h-full bg-black/5"></div>
                                    <span className="self-end bg-brandBlue text-white text-[8px] font-bold px-1.5 py-0.5 rounded">VL DOC</span>
                                    <p className="text-slate-900 text-xs font-bold font-display pl-2 leading-tight">{item.title}</p>
                                </div>
                            )}
                        </div>

                        <div className="space-y-3 pt-6 border-t border-slate-200">
                            <div className="flex justify-between items-center text-[10px] font-mono border-b border-slate-100 pb-2">
                                <span className="text-slate-500 uppercase tracking-wider">File Size</span>
                                <span className="text-brandBlue font-bold">{item.size || 'IMG'}</span>
                            </div>
                            <div className="flex justify-between items-center text-[10px] font-mono border-b border-slate-100 pb-2">
                                <span className="text-slate-500 uppercase tracking-wider">Document Type</span>
                                <span className="text-amber-500 font-bold">{type === 'pdf' ? 'PDF' : 'JPG'}</span>
                            </div>
                        </div>

                        <div className="pt-2">
                            <h4 className="text-[9px] uppercase tracking-widest text-slate-400 font-bold mb-2">Description</h4>
                            <p className="text-xs text-slate-600 leading-relaxed font-medium">
                                {item.desc || `High resolution scanned archive of the ${item.title} magazine.`}
                            </p>
                        </div>

                        {type === 'pdf' && pdfUrl && (
                            <div className="pt-4 space-y-2 border-t border-slate-200">
                                <a
                                    href={pdfUrl}
                                    download={item.file}
                                    className="flex items-center justify-center gap-2 w-full bg-brandBlue text-white text-xs font-bold py-2.5 px-4 rounded-lg hover:bg-brandDark transition-colors"
                                >
                                    <Download className="w-3.5 h-3.5" />
                                    Download PDF
                                </a>
                                <a
                                    href={pdfUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 w-full bg-slate-100 text-slate-700 text-xs font-bold py-2.5 px-4 rounded-lg hover:bg-slate-200 transition-colors border border-slate-200"
                                >
                                    <ExternalLink className="w-3.5 h-3.5" />
                                    Open in New Tab
                                </a>
                            </div>
                        )}
                    </div>
                </div>

                {/* Main Viewer Area */}
                <div className="flex-grow flex flex-col bg-slate-900 overflow-hidden" style={{ minHeight: isMobile ? 'auto' : 0 }}>

                    {/* Mobile: Document Info Card */}
                    {isMobile && (
                        <div className="bg-white border-b border-slate-200 px-4 py-4 space-y-3">
                            <div className="flex items-start gap-4">
                                {type === 'image' ? (
                                    <div className="w-16 h-20 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shadow-sm shrink-0">
                                        <img src={encodeURI(`/magazine-covers/${item.src}`)} alt="Cover" className="w-full h-full object-cover" />
                                    </div>
                                ) : (
                                    <div className="w-16 h-20 rounded-lg overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 shadow-sm flex items-center justify-center shrink-0">
                                        <FileText className="w-7 h-7 text-white/40" />
                                    </div>
                                )}
                                <div className="flex-grow min-w-0">
                                    <h1 className="text-sm font-bold text-slate-900 leading-snug mb-1 line-clamp-3">{item.title}</h1>
                                    <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400 uppercase mb-2">
                                        <span className="bg-amber-100 text-amber-600 font-bold px-1.5 py-0.5 rounded">
                                            {type === 'pdf' ? 'PDF' : 'Image'}
                                        </span>
                                        {item.size && <span>{item.size}</span>}
                                    </div>
                                    {item.desc && (
                                        <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2">{item.desc}</p>
                                    )}
                                </div>
                            </div>

                            {/* Mobile Action Buttons */}
                            {type === 'pdf' && pdfUrl && (
                                <div className="flex gap-2 pt-1">
                                    <a
                                        href={pdfUrl}
                                        download={item.file}
                                        className="flex-1 flex items-center justify-center gap-1.5 bg-brandBlue text-white text-xs font-bold py-2.5 px-3 rounded-lg active:scale-95 transition-transform"
                                    >
                                        <Download className="w-3.5 h-3.5" />
                                        Download
                                    </a>
                                    <a
                                        href={pdfUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 flex items-center justify-center gap-1.5 bg-slate-100 text-slate-700 text-xs font-bold py-2.5 px-3 rounded-lg border border-slate-200 active:scale-95 transition-transform"
                                    >
                                        <ExternalLink className="w-3.5 h-3.5" />
                                        Open PDF
                                    </a>
                                </div>
                            )}

                            {/* Mobile Viewer Toggle for PDF */}
                            {type === 'pdf' && (
                                <div className="flex gap-2 pt-1">
                                    <button
                                        onClick={() => setViewerMode('google')}
                                        className={`flex-1 py-2 text-[11px] font-bold rounded-lg border transition-all ${viewerMode === 'google' ? 'bg-brandBlue text-white border-brandBlue' : 'bg-white text-slate-600 border-slate-200'}`}
                                    >
                                        Google Viewer
                                    </button>
                                    <button
                                        onClick={() => setViewerMode('iframe')}
                                        className={`flex-1 py-2 text-[11px] font-bold rounded-lg border transition-all ${viewerMode === 'iframe' ? 'bg-brandBlue text-white border-brandBlue' : 'bg-white text-slate-600 border-slate-200'}`}
                                    >
                                        Direct Embed
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Viewer */}
                    <div className="flex-grow relative flex justify-center items-center" style={{ minHeight: isMobile ? '60vh' : '100%' }}>
                        {type === 'pdf' ? (
                            viewerMode === 'google' && googleViewerUrl ? (
                                <iframe
                                    key="google-viewer"
                                    src={googleViewerUrl}
                                    className="w-full h-full border-none"
                                    style={{ minHeight: isMobile ? '60vh' : '100%', display: 'block' }}
                                    allow="fullscreen"
                                    title={item.title}
                                />
                            ) : (
                                <iframe
                                    key="direct-viewer"
                                    src={`${pdfUrl}#pagemode=thumbs&toolbar=1`}
                                    className="w-full h-full border-none bg-white"
                                    style={{ minHeight: isMobile ? '60vh' : '100%', display: 'block' }}
                                    title={item.title}
                                />
                            )
                        ) : (
                            <div className="w-full h-full flex items-center justify-center p-4 bg-slate-900">
                                <img
                                    src={encodeURI(`/magazine-covers/${item.src}`)}
                                    className="max-w-full max-h-full object-contain shadow-2xl rounded-sm"
                                    alt={item.title}
                                    style={{ maxHeight: isMobile ? '70vh' : '100%' }}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Bottom Safe Area */}
            {isMobile && <div style={{ height: 'env(safe-area-inset-bottom, 16px)' }} className="bg-white" />}
        </div>
    );
}
