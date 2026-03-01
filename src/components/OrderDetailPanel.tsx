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
    <div className='flex flex-col animate-slideUp border border-[#2a3a52] min-h-[260px] font-sans'>
      {/* Header Bar */}
      <div className='flex items-center justify-between px-4 bg-[#1a2840] border-b border-[#2a3a52] min-h-[38px]'>
        <span className='text-[#c8d8ee] font-semibold text-[13px]'>
          Order Details - Equity Notes
        </span>
        <button
          onClick={onClose}
          className='bg-[#2a3a52] border border-[#3a4f6a] text-[#94a3b8] px-[7px] py-[1px] rounded-[2px] text-[14px] leading-[1.4] hover:text-white hover:bg-[#344d66] transition-colors cursor-pointer'
        >
          ✕
        </button>
      </div>

      {/* Tab Strip */}
      <div className='flex bg-[#d0dcea] border-b border-[#b0bfce] px-1 pt-1 gap-[2px]'>
        {DETAIL_TABS.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                px-4 py-1.5 text-[12px] rounded-t-[4px] border-x border-t transition-all cursor-pointer
                ${
                  isActive
                    ? 'bg-[#f0f4f8] border-[#a0b8cc] text-[#1a2840] font-semibold -mb-[1px] z-10'
                    : 'bg-[#b8cce0] border-transparent text-[#3a5068] font-medium hover:bg-[#c6d6e8]'
                }
              `}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Main Content Area */}
      <div className='flex-1 overflow-auto bg-[#f0f4f8] p-4 flex gap-4'>
        {activeTab === 'Order Details' ? (
          <>
            {/* Left: Metadata Fields */}
            <div className='flex-[0_0_45%] min-w-0'>
              <div className='font-bold text-[14px] text-[#1a2840] mb-3'>
                Order ID: {order.orderId}
              </div>
              <div className='space-y-1'>
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
                  ['Status:', order.status],
                ].map(([label, val]) => (
                  <div key={label as string} className='flex gap-1 py-0.5'>
                    <span className='text-[13px] text-[#4a6080] w-[105px] shrink-0'>
                      {label}
                    </span>
                    <span className='text-[13px] text-[#1a2840] font-bold truncate'>
                      {val}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Quick History Table */}
            <div className='flex-1 min-w-0'>
              <table className='w-full border-collapse text-[12px] border border-[#b0bfce] bg-white'>
                <thead>
                  <tr className='bg-[#dce8f0]'>
                    {['Time', 'Event'].map((h) => (
                      <th
                        key={h}
                        className='px-3 py-1.5 text-left font-semibold text-[#2a4060] border-b border-[#b0bfce]'
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {history.map((h, i) => (
                    <tr key={i} className='hover:bg-blue-50/50'>
                      <td className='px-3 py-2 border-b border-[#e0eaf2] text-[11px] text-[#3a5a78] font-mono'>
                        {h.time}
                      </td>
                      <td className='px-3 py-2 border-b border-[#e0eaf2] text-[#1a2840] font-semibold'>
                        {h.event}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          /* Order History Full Tab */
          <div className='flex-1'>
            <div className='font-bold text-[14px] text-[#1a2840] mb-2.5'>
              Order History — {order.orderId}
            </div>
            <table className='w-full border-collapse text-[12px] border border-[#b0bfce] bg-white'>
              <thead>
                <tr className='bg-[#dce8f0]'>
                  {['Time', 'Event', 'Details'].map((h) => (
                    <th
                      key={h}
                      className='px-3 py-1.5 text-left font-semibold text-[#2a4060] border-b border-[#b0bfce]'
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {history.map((h, i) => (
                  <tr key={i} className='hover:bg-blue-50/50'>
                    <td className='px-3 py-2 border-b border-[#e0eaf2] text-[11px] text-[#3a5a78] font-mono'>
                      {h.time}
                    </td>
                    <td className='px-3 py-2 border-b border-[#e0eaf2]'>
                      <EventBadge event={h.event} />
                    </td>
                    <td className='px-3 py-2 border-b border-[#e0eaf2] text-[11px] text-[#4a6080]'>
                      {h.details ?? `Symbol: ${order.symbol}`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
