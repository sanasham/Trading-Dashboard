import { useEffect, useRef, useState } from 'react';
import { SIDE_OPTIONS, STATUS_OPTIONS } from '../constants/trade.constants';
import type { ToolbarProps } from '../types';
import {
  IconClose,
  IconDownload,
  IconFilter,
  IconRefresh,
  IconSettings,
} from './Icons';
import ToolbarButton from './ToolbarButton';

const Toolbar = ({
  filters,
  onFilterChange,
  onExport,
  onRefresh,
}: ToolbarProps) => {
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Helper to determine if any filter is active
  const hasActiveFilters = !!(
    filters.text ||
    filters.side !== 'ALL' ||
    filters.status !== 'ALL' ||
    filters.symbol
  );

  // Background mapping for "Side" buttons to avoid nested ternaries (SonarQube S3358)
  const SIDE_BG_MAP: Record<string, string> = {
    BUY: 'bg-[#16a34a]',
    SELL: 'bg-[#ef4444]',
    ALL: 'bg-[#3b82f6]',
  };

  // Close panel when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setShowFilterPanel(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className='flex items-center justify-between'>
      <div className='flex gap-1.5'>
        <div className='relative' ref={panelRef}>
          {/* Main Filter Toggle Button */}
          <button
            type='button'
            onClick={() => setShowFilterPanel((s) => !s)}
            className={`flex items-center gap-1 px-3 py-1.5 rounded transition-colors ${
              hasActiveFilters
                ? 'bg-blue-600 text-white'
                : 'bg-[#2a3f58] text-gray-200 hover:bg-[#344d66]'
            }`}
          >
            <IconFilter />
            <span className='text-sm font-medium'>Filters</span>
            <span className='text-[10px]'>▾</span>
            {hasActiveFilters && (
              <span className='ml-1 bg-blue-400 text-white text-[10px] font-bold w-4 h-4 rounded-full inline-flex items-center justify-center'>
                !
              </span>
            )}
          </button>

          {showFilterPanel && (
            <div className='absolute top-[38px] left-0 z-[100] bg-[#1a2840] border border-[#2a3a52] rounded-[6px] shadow-[0_8px_32px_rgba(0,0,0,0.5)] p-[14px] w-[270px]'>
              {/* Header */}
              <div className='flex items-center justify-between mb-3'>
                <span className='text-white font-semibold text-[13px]'>
                  Filter Orders
                </span>
                <button
                  type='button'
                  aria-label='Close filter panel'
                  onClick={() => setShowFilterPanel(false)}
                  className='text-[#64748b] hover:text-white transition-colors cursor-pointer'
                >
                  <IconClose className='w-4 h-4' />
                </button>
              </div>

              {/* Search Input - Semantic Label Association (SonarQube S6853) */}
              <div className='mb-3'>
                <label
                  htmlFor='search-text'
                  className='text-[11px] text-[#64748b] block mb-1 uppercase tracking-wider font-bold'
                >
                  Search text
                </label>
                <input
                  id='search-text'
                  type='text'
                  placeholder='Order ID, Symbol, Trader...'
                  value={filters.text}
                  onChange={(e) =>
                    onFilterChange({ ...filters, text: e.target.value })
                  }
                  className='w-full bg-[#0f1623] border border-[#2a3a52] text-white text-[12px] px-2.5 py-1.5 rounded outline-none focus:border-blue-500'
                />
              </div>

              {/* Symbol Input - Semantic Label Association */}
              <div className='mb-3'>
                <label
                  htmlFor='symbol-input'
                  className='text-[11px] text-[#64748b] block mb-1 uppercase tracking-wider font-bold'
                >
                  Symbol
                </label>
                <input
                  id='symbol-input'
                  type='text'
                  placeholder='e.g. AAPL'
                  value={filters.symbol}
                  onChange={(e) =>
                    onFilterChange({
                      ...filters,
                      symbol: e.target.value.toUpperCase(),
                    })
                  }
                  className='w-full bg-[#0f1623] border border-[#2a3a52] text-white text-[12px] px-2.5 py-1.5 rounded outline-none focus:border-blue-500'
                />
              </div>

              {/* Side Selector - Semantic Fieldset Grouping (SonarQube S6819) */}
              <fieldset className='mb-3 border-none p-0'>
                <legend className='text-[11px] text-[#64748b] block mb-1.5 uppercase tracking-wider font-bold'>
                  Side
                </legend>
                <div className='flex gap-1'>
                  {SIDE_OPTIONS.map((s) => {
                    const isActive = filters.side === s;
                    const activeBg = SIDE_BG_MAP[s] || 'bg-[#3b82f6]';

                    return (
                      <button
                        type='button'
                        key={s}
                        onClick={() => onFilterChange({ ...filters, side: s })}
                        className={`flex-1 text-[11px] p-1 rounded-sm font-semibold border transition-colors ${
                          isActive
                            ? `${activeBg} text-white border-transparent`
                            : 'bg-[#0f1623] text-[#94a3b8] border-[#2a3a52] hover:bg-[#1e2d45]'
                        }`}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              {/* Status Selector - Semantic Fieldset Grouping */}
              <fieldset className='mb-4 border-none p-0'>
                <legend className='text-[11px] text-[#64748b] block mb-1.5 uppercase tracking-wider font-bold'>
                  Status
                </legend>
                <div className='flex flex-wrap gap-1'>
                  {STATUS_OPTIONS.map((s) => {
                    const isActive = filters.status === s;
                    return (
                      <button
                        type='button'
                        key={s}
                        onClick={() =>
                          onFilterChange({ ...filters, status: s })
                        }
                        className={`text-[11px] px-2 py-1 rounded-sm font-semibold border transition-colors ${
                          isActive
                            ? 'bg-[#3b82f6] text-white border-transparent'
                            : 'bg-[#0f1623] text-[#94a3b8] border-[#2a3a52] hover:bg-[#1e2d45]'
                        }`}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              {/* Clear Button */}
              <button
                type='button'
                onClick={() =>
                  onFilterChange({
                    text: '',
                    side: 'ALL',
                    status: 'ALL',
                    symbol: '',
                  })
                }
                className='w-full text-[12px] text-[#f87171] bg-transparent border border-[#3a2020] rounded p-1.5 hover:bg-[#3a2020] transition-colors font-medium'
              >
                ✕ Clear all filters
              </button>
            </div>
          )}
        </div>

        <button
          type='button'
          className='
        flex items-center gap-1.5 
        border border-[#3d5068] 
        bg-[#2a3f58] hover:bg-[#344d66] 
        text-[#c8d8ee] text-[12px] font-medium 
        px-3 py-1.25 rounded 
        cursor-pointer whitespace-nowrap 
        transition-colors duration-200
      '
          onClick={onExport}
          onMouseEnter={(e) => (e.currentTarget.style.background = '#344d66')}
          onMouseLeave={(e) => (e.currentTarget.style.background = '#2a3f58')}
        >
          <IconDownload />
          Export
        </button>
        <div style={{ position: 'relative' }}>
          <button
            type='button'
            className='
        flex items-center gap-1.5 
        border border-[#3d5068] 
        bg-[#2a3f58] hover:bg-[#344d66] 
        text-[#c8d8ee] text-[12px] font-medium 
        px-3 py-1.25 rounded 
        cursor-pointer whitespace-nowrap 
        transition-colors duration-200
      '
            onClick={() => setShowSettings((s) => !s)}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#344d66')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#2a3f58')}
          >
            <IconSettings />
            Settings
          </button>
          {showSettings && (
            <div
              style={{
                position: 'absolute',
                top: '36px',
                left: 0,
                zIndex: 100,
                background: '#1a2840',
                border: '1px solid #2a3a52',
                borderRadius: '6px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                padding: '14px',
                width: '200px',
              }}
            >
              <p
                style={{
                  fontSize: '11px',
                  color: '#64748b',
                  marginBottom: '8px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.07em',
                }}
              >
                Display
              </p>
              {[
                'Show Timestamps',
                'Show Notional',
                'Compact Rows',
                'Color Rows',
              ].map((opt) => (
                <label
                  key={opt}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '13px',
                    color: '#94a3b8',
                    padding: '4px 0',
                    cursor: 'pointer',
                  }}
                >
                  <input type='checkbox' defaultChecked /> {opt}
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className='flex gap-[6px]'>
        <ToolbarButton
          icon={<IconRefresh />}
          onClick={onRefresh}
          title='Refresh'
        />
        <ToolbarButton icon={<IconSettings />} title='Configure columns' />
      </div>
    </div>
  );
};

export default Toolbar;
