import { useState } from 'react';
import { TABS } from '../constants/trade.constants';
import type { HeaderProps } from '../types';
import {
  IconAtom,
  IconBell,
  IconChevronDown,
  IconSearch,
  IconUser,
} from './Icons';

const Header = ({
  activeTab = TABS[0],
  onTabChange = () => {},
  onSearch = () => {},
}: HeaderProps) => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [notifications] = useState(3);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearchChange = (text: string) => {
    setSearchText(text);

    if (text.trim() === '') {
      onSearch('');
      setShowSearch(false);
    }
  };

  const handleSearchToggle = () => {
    if (showSearch && searchText) {
      handleSearchChange('');
    } else {
      setShowSearch((prev) => !prev);
    }
  };

  return (
    <>
      <header className='flex items-center justify-between flex-wrap px-4 lg:px-6 border-b bg-[#1a2336] border-[#2a3a52] min-h-[56px]'>
        {/* LEFT SECTION */}
        <div className='flex items-center gap-4 lg:gap-8'>
          {/* Hamburger (mobile + tablet) */}
          <button
            type='button'
            aria-label='Toggle menu'
            className='lg:hidden text-gray-400 hover:text-white p-2'
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            ☰
          </button>

          {/* Logo */}
          <div className='flex items-center gap-2'>
            <IconAtom className='w-6 h-6 text-blue-400' />
            <span className='text-white font-bold text-xs sm:text-sm tracking-widest uppercase whitespace-nowrap'>
              Trading Dashboard
            </span>
          </div>

          {/* Desktop Tabs */}
          <nav className='hidden lg:flex items-center h-full'>
            {TABS.map((tab) => (
              <button
                type='button'
                key={tab}
                onClick={() => onTabChange(tab)}
                className={`px-5 py-4 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
                  activeTab === tab
                    ? 'border-blue-400 text-white bg-blue-500/10'
                    : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* RIGHT SECTION */}
        <div className='flex items-center gap-3 lg:gap-4 mt-2 lg:mt-0'>
          {/* Search Input */}
          {showSearch && (
            <input
              type='text'
              autoFocus
              value={searchText}
              onChange={(e) => handleSearchChange(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && onSearch(searchText)}
              onBlur={() => !searchText && setShowSearch(false)}
              placeholder='Search orders...'
              className='bg-gray-700 border border-gray-600 text-white text-sm rounded px-3 py-1.5 outline-none focus:border-blue-400 w-40 sm:w-52 transition-all'
            />
          )}

          {/* Search Button */}
          <button
            type='button'
            aria-label='Toggle search'
            onClick={handleSearchToggle}
            className='text-gray-400 hover:text-white p-2 rounded hover:bg-white/5 transition'
          >
            <IconSearch className='w-4 h-4' />
          </button>

          {/* Profile */}
          <button
            type='button'
            aria-label='User profile'
            className='text-gray-400 hover:text-white p-2 rounded hover:bg-white/5 transition'
          >
            <IconUser className='w-4 h-4' />
          </button>

          {/* Notifications */}
          <div className='relative'>
            <button
              type='button'
              aria-label={`Notifications (${notifications} unread)`}
              className='text-gray-400 hover:text-white p-2 rounded hover:bg-white/5 transition'
            >
              <IconBell className='w-4 h-4' />
            </button>

            {notifications > 0 && (
              <span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold leading-none'>
                {notifications}
              </span>
            )}
          </div>

          {/* Divider (desktop only) */}
          <div className='hidden lg:block h-6 w-px bg-gray-600' />

          {/* Welcome (desktop only) */}
          <div className='hidden lg:flex items-center gap-1 text-gray-300 text-sm'>
            <span>
              Welcome,{' '}
              <strong className='text-white font-semibold'>Trader01</strong>
            </span>
            <IconChevronDown className='w-3 h-3 text-gray-400' />
          </div>
        </div>
      </header>

      {/* Mobile / Tablet Slide Menu */}
      {mobileMenuOpen && (
        <div className='lg:hidden bg-[#1a2336] border-b border-[#2a3a52] px-4 py-3 space-y-2'>
          {TABS.map((tab) => (
            <button
              type='button'
              key={tab}
              onClick={() => {
                onTabChange(tab);
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left px-3 py-2 rounded text-sm ${
                activeTab === tab
                  ? 'bg-blue-500/10 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab}
            </button>
          ))}

          <div className='pt-3 border-t border-gray-600 text-gray-300 text-sm'>
            Welcome, <strong className='text-white'>Trader01</strong>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
