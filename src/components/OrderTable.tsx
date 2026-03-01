import type { Order, OrderTableProps } from '../types';
import { IconSortAsc, IconSortDesc } from './Icons';

const ALERT_PRICES = new Set([145.55, 161.62]);

interface Column {
  label: string;
  key: keyof Order;
  align?: 'left' | 'right' | 'center';
  width?: string;
}

const COLUMNS: Column[] = [
  { label: 'Order ID', key: 'orderId', width: '90px' },
  { label: 'Trade ID', key: 'tradeId', width: '100px' },
  { label: 'Symbol', key: 'symbol', width: '80px' },
  { label: 'Instrument', key: 'instrument', width: '100px' },
  { label: 'Side', key: 'side', width: '70px', align: 'center' },
  { label: 'Quantity', key: 'quantity', width: '90px', align: 'right' },
  { label: 'Price', key: 'price', width: '80px', align: 'right' },
  { label: 'Notional', key: 'notional', width: '110px', align: 'right' },
  { label: 'Currency', key: 'currency', width: '80px' },
  { label: 'Trader', key: 'trader', width: '90px' },
  { label: 'Trader', key: 'traderDisplay', width: '110px' },
  { label: 'Counterparty', key: 'counterparty', width: '130px' },
  { label: 'Status', key: 'status', width: '90px', align: 'center' },
  { label: 'Timestamp', key: 'timestamp', width: '155px' },
];

const SideBadge = ({ side }: { side: string }) => (
  <span
    className={`inline-block px-2 py-0.5 rounded text-xs font-bold ${
      side === 'BUY' ? 'bg-green-600 text-white' : 'bg-red-500 text-white'
    }`}
  >
    {side}
  </span>
);

const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    OPEN: 'bg-blue-500 text-white',
    FILLED: 'bg-green-600 text-white',
    PARTIAL: 'bg-amber-500 text-white',
    CANCELLED: 'bg-gray-500 text-white',
    SELL: 'bg-red-500 text-white',
  };
  return (
    <span
      className={`inline-block px-2 py-0.5 rounded text-xs font-bold ${styles[status] ?? 'bg-gray-600 text-white'}`}
    >
      {status}
    </span>
  );
};

export default function OrderTable({
  orders,
  selectedOrder,
  sortConfig,
  onSelectOrder,
  onSort,
  maxHeight,
}: OrderTableProps) {
  return (
    <div
      className='rounded overflow-auto'
      style={{
        maxHeight,
        backgroundColor: '#151e2d',
        border: '1px solid #2a3a52',
      }}
    >
      <table
        className='w-full text-sm'
        style={{ borderCollapse: 'separate', borderSpacing: 0 }}
      >
        <thead className='sticky top-0 z-10'>
          <tr style={{ backgroundColor: '#1d2840' }}>
            {COLUMNS.map((col) => (
              <th
                key={col.label + col.key}
                onClick={() => onSort(col.key)}
                className='px-3 py-2 text-left text-xs font-semibold uppercase tracking-wider whitespace-nowrap cursor-pointer select-none transition-colors hover:text-white'
                style={{
                  color: '#94a3b8',
                  borderBottom: '1px solid #2a3a52',
                  minWidth: col.width,
                  textAlign: col.align ?? 'left',
                }}
              >
                {col.label}
                {sortConfig.key === col.key ? (
                  sortConfig.direction === 'asc' ? (
                    <IconSortAsc />
                  ) : (
                    <IconSortDesc />
                  )
                ) : null}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td
                colSpan={COLUMNS.length}
                className='text-center py-12 text-gray-500'
              >
                No orders match the current filters
              </td>
            </tr>
          ) : (
            orders.map((order, i) => {
              const isSelected = selectedOrder?.id === order.id;
              const isEven = i % 2 === 0;

              return (
                <tr
                  key={order.id}
                  onClick={() => onSelectOrder(order)}
                  className='cursor-pointer transition-colors'
                  style={{
                    backgroundColor: isSelected
                      ? 'rgba(59,130,246,0.15)'
                      : isEven
                        ? '#151e2d'
                        : '#131b2a',
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected)
                      (
                        e.currentTarget as HTMLTableRowElement
                      ).style.backgroundColor = '#1d2840';
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected)
                      (
                        e.currentTarget as HTMLTableRowElement
                      ).style.backgroundColor = isEven ? '#151e2d' : '#131b2a';
                  }}
                >
                  {/* Order ID */}
                  <td
                    className='px-3 py-1.5 whitespace-nowrap font-mono text-xs'
                    style={{
                      borderBottom: '1px solid #1e2a3a',
                      color: '#cbd5e1',
                    }}
                  >
                    <span
                      style={
                        isSelected
                          ? {
                              borderBottom: '2px solid #60a5fa',
                              paddingBottom: '2px',
                              color: '#93c5fd',
                            }
                          : {}
                      }
                    >
                      {order.orderId}
                    </span>
                  </td>

                  {/* Trade ID */}
                  <td
                    className='px-3 py-1.5 whitespace-nowrap font-mono text-xs'
                    style={{
                      borderBottom: '1px solid #1e2a3a',
                      color: '#94a3b8',
                    }}
                  >
                    {order.tradeId}
                  </td>

                  {/* Symbol */}
                  <td
                    className='px-3 py-1.5 font-bold text-white'
                    style={{ borderBottom: '1px solid #1e2a3a' }}
                  >
                    {order.symbol}
                  </td>

                  {/* Instrument */}
                  <td
                    className='px-3 py-1.5'
                    style={{
                      borderBottom: '1px solid #1e2a3a',
                      color: '#94a3b8',
                    }}
                  >
                    {order.instrument}
                  </td>

                  {/* Side */}
                  <td
                    className='px-3 py-1.5 text-center'
                    style={{ borderBottom: '1px solid #1e2a3a' }}
                  >
                    <SideBadge side={order.side} />
                  </td>

                  {/* Quantity */}
                  <td
                    className='px-3 py-1.5 text-right font-mono text-xs'
                    style={{
                      borderBottom: '1px solid #1e2a3a',
                      color: '#e2e8f0',
                    }}
                  >
                    {order.quantity.toLocaleString()}
                  </td>

                  {/* Price */}
                  <td
                    className='px-3 py-1.5 text-right'
                    style={{ borderBottom: '1px solid #1e2a3a' }}
                  >
                    {ALERT_PRICES.has(order.price) ? (
                      <span className='price-alert'>
                        {order.price.toFixed(2)}
                      </span>
                    ) : (
                      <span className='price-normal'>
                        {order.price.toFixed(2)}
                      </span>
                    )}
                  </td>

                  {/* Notional */}
                  <td
                    className='px-3 py-1.5 text-right font-mono text-xs'
                    style={{
                      borderBottom: '1px solid #1e2a3a',
                      color: '#94a3b8',
                    }}
                  >
                    {order.notional.toLocaleString()}
                  </td>

                  {/* Currency */}
                  <td
                    className='px-3 py-1.5 font-mono text-xs'
                    style={{
                      borderBottom: '1px solid #1e2a3a',
                      color: '#94a3b8',
                    }}
                  >
                    {order.currency}
                  </td>

                  {/* Trader */}
                  <td
                    className='px-3 py-1.5 text-xs'
                    style={{
                      borderBottom: '1px solid #1e2a3a',
                      color: '#e2e8f0',
                    }}
                  >
                    {order.trader}
                  </td>

                  {/* Trader Display */}
                  <td
                    className='px-3 py-1.5 text-xs'
                    style={{
                      borderBottom: '1px solid #1e2a3a',
                      color: '#e2e8f0',
                    }}
                  >
                    {order.traderDisplay}
                  </td>

                  {/* Counterparty */}
                  <td
                    className='px-3 py-1.5 text-xs'
                    style={{
                      borderBottom: '1px solid #1e2a3a',
                      color: '#94a3b8',
                    }}
                  >
                    {order.counterparty}
                  </td>

                  {/* Status */}
                  <td
                    className='px-3 py-1.5 text-center'
                    style={{ borderBottom: '1px solid #1e2a3a' }}
                  >
                    <StatusBadge status={order.status} />
                  </td>

                  {/* Timestamp */}
                  <td
                    className='px-3 py-1.5 whitespace-nowrap font-mono text-xs'
                    style={{
                      borderBottom: '1px solid #1e2a3a',
                      color: '#64748b',
                    }}
                  >
                    {order.timestamp.split(' ')[0]}
                    <br />
                    <span style={{ color: '#475569' }}>
                      {order.timestamp.split(' ')[1]}
                    </span>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
