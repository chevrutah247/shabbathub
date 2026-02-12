'use client';
import { t } from '@/lib/translations';

import { useState } from 'react';
import { 
  Download, Printer, Share2, ZoomIn, ZoomOut, 
  Maximize2, FileText, ChevronLeft, ChevronRight,
  Columns, Square, Grid3X3, X, Copy, Check
} from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

interface PDFViewerProps {
  url: string;
  title: string;
  onClose?: () => void;
  showControls?: boolean;
}

type ViewMode = 'single' | 'two' | 'all';

export default function PDFViewer({ url, title, onClose, showControls = true }: PDFViewerProps) {
  const { lang } = useLanguage();
  const [zoom, setZoom] = useState(100);
  const [viewMode, setViewMode] = useState<ViewMode>('single');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const handleZoomIn = () => setZoom((z) => Math.min(z + 25, 200));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 25, 50));

  const handleDownload = () => {
    const link = document.createElement('a', lang);
    link.href = url;
    link.download = title + '.pdf';
    link.click();
  };

  const handlePrint = () => {
    window.open(url, '_blank')?.print();
  };

  const handleShare = async (platform: 'whatsapp' | 'telegram' | 'copy') => {
    const shareUrl = window.location.href;
    
    switch (platform) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(title + '\n' + shareUrl)}`, '_blank');
        break;
      case 'telegram':
        window.open(`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`, '_blank');
        break;
      case 'copy':
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        break;
    }
    setShowShareMenu(false);
  };

  const handleFullscreen = () => {
    const viewer = document.getElementById('pdf-viewer-container');
    if (viewer) {
      if (!document.fullscreenElement) {
        viewer.requestFullscreen();
        setIsFullscreen(true);
      } else {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const viewModeIcons = {
    single: Square,
    two: Columns,
    all: Grid3X3,
  };

  return (
    <div 
      id="pdf-viewer-container"
      className={`flex flex-col bg-gray-900 ${isFullscreen ? 'fixed inset-0 z-50' : 'rounded-xl overflow-hidden'}`}
    >
      {/* Toolbar */}
      {showControls && (
        <div className="flex items-center justify-between px-4 py-3 bg-gray-800 border-b border-gray-700">
          {/* Left side - Title & Close */}
          <div className="flex items-center gap-4">
            {onClose && (
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            )}
            <div className="flex items-center gap-2 text-white">
              <FileText size={18} />
              <span className="font-medium truncate max-w-xs">{title}</span>
            </div>
          </div>

          {/* Center - Page Navigation */}
          <div className="hidden md:flex items-center gap-2 text-white">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage <= 1}
              className="p-1 hover:bg-gray-700 rounded disabled:opacity-50"
            >
              <ChevronLeft size={20} />
            </button>
            <span className="text-sm">
              {t('pdfViewer.page', lang)} {currentPage} {t('pdfViewer.of', lang)} {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage >= totalPages}
              className="p-1 hover:bg-gray-700 rounded disabled:opacity-50"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center gap-1">
            {/* Zoom */}
            <button
              onClick={handleZoomOut}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
              title={t('actions.zoomOut', lang)}
            >
              <ZoomOut size={18} />
            </button>
            <span className="text-white text-sm w-12 text-center">{zoom}%</span>
            <button
              onClick={handleZoomIn}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
              title={t('actions.zoomIn', lang)}
            >
              <ZoomIn size={18} />
            </button>

            <div className="w-px h-6 bg-gray-700 mx-2" />

            {/* View Mode */}
            <div className="hidden md:flex items-center gap-1 bg-gray-700 rounded-lg p-1">
              {(['single', 'two', 'all'] as ViewMode[]).map((mode) => {
                const Icon = viewModeIcons[mode];
                return (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    className={`p-1.5 rounded transition-colors ${
                      viewMode === mode ? 'bg-primary-600 text-white' : 'text-gray-400 hover:text-white'
                    }`}
                    title={t(`pdfViewer.${mode === 'single' ? 'singlePage' : mode === 'two' ? 'twoPages' : 'allPages'}`)}
                  >
                    <Icon size={16} />
                  </button>
                );
              })}
            </div>

            <div className="w-px h-6 bg-gray-700 mx-2" />

            {/* Share */}
            <div className="relative">
              <button
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                title={t('actions.share', lang)}
              >
                <Share2 size={18} />
              </button>
              
              {showShareMenu && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg py-2 z-50">
                  <button
                    onClick={() => handleShare('whatsapp')}
                    className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center gap-3"
                  >
                    <span className="text-green-500">📱</span>
                    WhatsApp
                  </button>
                  <button
                    onClick={() => handleShare('telegram')}
                    className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center gap-3"
                  >
                    <span className="text-blue-500">✈️</span>
                    Telegram
                  </button>
                  <button
                    onClick={() => handleShare('copy')}
                    className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center gap-3"
                  >
                    {copied ? (
                      <>
                        <Check size={16} className="text-green-500" />
                        <span className="text-green-600">{t('messages.linkCopied', lang)}</span>
                      </>
                    ) : (
                      <>
                        <Copy size={16} />
                        {t('actions.copyLink', lang)}
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* Print */}
            <button
              onClick={handlePrint}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
              title={t('actions.print', lang)}
            >
              <Printer size={18} />
            </button>

            {/* Download */}
            <button
              onClick={handleDownload}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
              title={t('actions.download', lang)}
            >
              <Download size={18} />
            </button>

            {/* Fullscreen */}
            <button
              onClick={handleFullscreen}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
              title={t('pdfViewer.fullscreen', lang)}
            >
              <Maximize2 size={18} />
            </button>
          </div>
        </div>
      )}

      {/* PDF Content */}
      <div 
        className="flex-1 overflow-auto bg-gray-700 flex items-center justify-center p-4"
        style={{ minHeight: '70vh' }}
      >
        <iframe
          src={`${url}#view=FitH&zoom=${zoom}`}
          className="bg-white shadow-2xl"
          style={{
            width: viewMode === 'single' ? '100%' : viewMode === 'two' ? '90%' : '95%',
            maxWidth: viewMode === 'single' ? '800px' : viewMode === 'two' ? '1200px' : '100%',
            height: '100%',
            minHeight: '600px',
            transform: `scale(${zoom / 100})`,
            transformOrigin: 'center top',
          }}
          title={title}
        />
      </div>

      {/* Bottom Bar (Mobile) */}
      <div className="md:hidden flex items-center justify-around px-4 py-3 bg-gray-800 border-t border-gray-700">
        <button
          onClick={handleShare.bind(null, 'copy')}
          className="flex flex-col items-center gap-1 text-gray-400 hover:text-white"
        >
          <Share2 size={20} />
          <span className="text-xs">{t('actions.share', lang)}</span>
        </button>
        <button
          onClick={handleDownload}
          className="flex flex-col items-center gap-1 text-gray-400 hover:text-white"
        >
          <Download size={20} />
          <span className="text-xs">{t('actions.download', lang)}</span>
        </button>
        <button
          onClick={handlePrint}
          className="flex flex-col items-center gap-1 text-gray-400 hover:text-white"
        >
          <Printer size={20} />
          <span className="text-xs">{t('actions.print', lang)}</span>
        </button>
        <button
          onClick={handleFullscreen}
          className="flex flex-col items-center gap-1 text-gray-400 hover:text-white"
        >
          <Maximize2 size={20} />
          <span className="text-xs">{t('pdfViewer.fullscreen', lang)}</span>
        </button>
      </div>
    </div>
  );
}
