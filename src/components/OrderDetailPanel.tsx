import { useState } from 'react';
import type { Order, OrderHistoryEvent } from '../types';

interface OrderDetailPanelProps {
  order: Order;
  history: OrderHistoryEvent[];
  onClose: () => void;
  isHistoryLoading?: boolean;
}

type DetailTab = 'Order Details' | 'Order History';
const DETAIL_TABS: DetailTab[] = ['Order Details', 'Order History'];

const EventBadge = ({ event }: { event: string }) => {
  const baseClasses =
    'inline-block px-2 py-0.5 rounded text-[10px] font-bold text-white uppercase tracking-wider';
  if (event.includes('FILLED'))
    return <span className={`${baseClasses} bg-green-600`}>{event}</span>;
  if (event.includes('PLACED'))
    return <span className={`${baseClasses} bg-blue-600`}>{event}</span>;
  if (event.includes('AMENDED'))
    return <span className={`${baseClasses} bg-amber-500`}>{event}</span>;
  return <span className={`${baseClasses} bg-gray-500`}>{event}</span>;
};

export default function OrderDetailPanel({
  order,
  history,
  onClose,
}: OrderDetailPanelProps) {
  const [activeTab, setActiveTab] = useState<DetailTab>('Order Details');

  return (
    // Added bg-[#f0f4f8] and pb-4 to ensure the bottom line/area is visible
    <div className='flex flex-col animate-slideUp border border-[#2a3a52] min-h-[300px] font-sans bg-[#f0f4f8] shadow-lg'>
      {/* Header Bar */}
      <div className='flex items-center justify-between px-4 bg-[#1a2840] border-b border-[#2a3a52] min-h-[38px] shrink-0'>
        <span className='text-[#c8d8ee] font-semibold text-[14px]'>
          Order Details - Equity Notes
        </span>
        <button
          onClick={onClose}
          className='bg-[#2a3a52] border border-[#3a4f6a] text-[#94a3b8] px-[8px] py-[2px] rounded-[2px] text-[14px] hover:text-white hover:bg-[#344d66] transition-colors cursor-pointer'
        >
          ✕
        </button>
      </div>

      {/* Tab Strip */}
      <div className='flex bg-[#d0dcea] border-b border-[#b0bfce] px-1 pt-1 gap-[2px] shrink-0'>
        {DETAIL_TABS.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                px-5 py-2 text-[13px] rounded-t-[4px] border-x border-t transition-all cursor-pointer
                ${
                  isActive
                    ? 'bg-[#f0f4f8] border-[#a0b8cc] text-[#1a2840] font-bold -mb-[1px] z-10'
                    : 'bg-[#b8cce0] border-transparent text-[#3a5068] font-medium hover:bg-[#c6d6e8]'
                }
              `}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Main Content Area - Added border-b to create the "bottom line" visually */}
      <div className='flex-1 overflow-auto p-5 flex gap-6 border-b border-[#b0bfce]'>
        {activeTab === 'Order Details' ? (
          <>
            {/* Left: Metadata Fields */}
            <div className='flex-[0_0_40%] min-w-0'>
              <div className='font-bold text-[16px] text-[#1a2840] mb-4'>
                Order ID: {order.orderId}
              </div>
              <div className='grid grid-cols-1 gap-y-1.5'>
                {[
                  ['Order ID:', order.orderId],
                  ['Trade ID:', order.tradeId],
                  ['Symbol:', order.symbol],
                  ['Instrument:', order.instrument],
                  ['Trader:', order.traderDisplay],
                  ['Counterparty:', order.counterparty],
                  ['Side:', order.side],
                  ['Quantity:', order.quantity.toLocaleString()],
                  ['Price:', order.price.toFixed(2)],
                  ['Notional:', order.notional.toLocaleString()],
                  ['Currency:', order.currency],
                ].map(([label, val]) => (
                  <div
                    key={label as string}
                    className='flex items-center gap-2'
                  >
                    <span className='text-[14px] text-[#4a6080] w-[110px] shrink-0'>
                      {label}
                    </span>
                    <span className='text-[14px] text-[#1a2840] font-bold truncate'>
                      {val}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Quick History Table */}
            <div className='flex-1 min-w-0'>
              <div className='overflow-hidden rounded border border-[#b0bfce]'>
                <table className='w-full border-collapse text-[13px] bg-white'>
                  <thead>
                    <tr className='bg-[#dce8f0] border-b border-[#b0bfce]'>
                      <th className='px-4 py-2 text-left font-bold text-[#2a4060] w-[40%]'>
                        Time
                      </th>
                      <th className='px-4 py-2 text-left font-bold text-[#2a4060]'>
                        Event
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.map((h, i) => (
                      <tr
                        key={i}
                        className='border-b border-[#e0eaf2] last:border-0 hover:bg-blue-50/30'
                      >
                        <td className='px-4 py-2.5 text-[12px] text-[#3a5a78] font-mono'>
                          {h.time}
                        </td>
                        <td className='px-4 py-2.5 text-[#1a2840] font-bold uppercase'>
                          {h.event}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          /* Order History Full Tab */
          <div className='flex-1'>
            <div className='font-bold text-[15px] text-[#1a2840] mb-3'>
              Order History — {order.orderId}
            </div>
            <div className='overflow-hidden rounded border border-[#b0bfce]'>
              <table className='w-full border-collapse text-[13px] bg-white'>
                <thead>
                  <tr className='bg-[#dce8f0] border-b border-[#b0bfce]'>
                    <th className='px-4 py-2 text-left font-bold text-[#2a4060]'>
                      Time
                    </th>
                    <th className='px-4 py-2 text-left font-bold text-[#2a4060]'>
                      Event
                    </th>
                    <th className='px-4 py-2 text-left font-bold text-[#2a4060]'>
                      Details
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((h, i) => (
                    <tr
                      key={i}
                      className='border-b border-[#e0eaf2] last:border-0 hover:bg-blue-50/30'
                    >
                      <td className='px-4 py-2.5 text-[12px] text-[#3a5a78] font-mono'>
                        {h.time}
                      </td>
                      <td className='px-4 py-2.5'>
                        <EventBadge event={h.event} />
                      </td>
                      <td className='px-4 py-2.5 text-[12px] text-[#4a6080]'>
                        {h.details ?? `Symbol: ${order.symbol}`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Optional Footer Spacer to ensure the bottom border of the main div is visible */}
      <div className='h-2 bg-[#f0f4f8] shrink-0' />
    </div>
  );
}
