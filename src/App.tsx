import { useCallback, useMemo, useState } from 'react';
import ErrorBanner from './components/ErrorBanner';
import Header from './components/Header';
import LoadingSpinner from './components/LoadingSpinner';
import OrderDetailPanel from './components/OrderDetailPanel';
import OrderTable from './components/OrderTable';
import Toolbar from './components/Toolbar';
import { TAB_INSTRUMENT_MAP } from './constants/trade.constants';
import { useOrderHistory } from './hooks/useOrderHistory';
import { useOrders } from './hooks/useOrders';
import type {
  FilterState,
  Order,
  OrdersQueryParams,
  SortConfig,
  TabName,
} from './types';

function App() {
  const [activeTab, setActiveTab] = useState<TabName>('Equity Notes');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: 'asc',
  });
  const [filters, setFilters] = useState<FilterState>({
    text: '',
    side: 'ALL',
    status: 'ALL',
    symbol: '',
  });
  const [globalSearch, setGlobalSearch] = useState('');

  const queryParams = useMemo(
    (): OrdersQueryParams => ({
      instrument: TAB_INSTRUMENT_MAP[activeTab],
      side: filters.side !== 'ALL' ? filters.side : undefined,
      status: filters.status !== 'ALL' ? filters.status : undefined,
      symbol: filters.symbol || undefined,
      search: globalSearch || filters.text || undefined,
      sortBy: sortConfig.key ?? undefined,
      sortDir: sortConfig.key ? sortConfig.direction : undefined,
      page: 1,
      pageSize: 100,
    }),
    [activeTab, filters, globalSearch, sortConfig],
  );
  const { state: ordersState, refresh } = useOrders(queryParams);

  const historyState = useOrderHistory(selectedOrder?.id ?? null);

  const displayOrders = useMemo(() => {
    if (ordersState.status !== 'success') return [];
    return ordersState.data.data;
  }, [ordersState]);
  const handleSort = useCallback((key: keyof Order) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  }, []);

  const handleTabChange = (tab: TabName) => {
    setActiveTab(tab);
    setSelectedOrder(null);
    setShowDetail(false);
    setSortConfig({ key: null, direction: 'asc' });
    setFilters({ text: '', side: 'ALL', status: 'ALL', symbol: '' });
    setGlobalSearch('');
  };

  const handleSelectOrder = (order: Order) => {
    setSelectedOrder(order);
    setShowDetail(true);
  };

  const handleExport = () => {
    if (!displayOrders.length) return;
    const headers = [
      'Order ID',
      'Trade ID',
      'Symbol',
      'Instrument',
      'Side',
      'Quantity',
      'Price',
      'Notional',
      'Currency',
      'Trader',
      'Trader Display',
      'Counterparty',
      'Status',
      'Timestamp',
    ];
    const rows = displayOrders.map((o) => [
      o.orderId,
      o.tradeId,
      o.symbol,
      o.instrument,
      o.side,
      o.quantity,
      o.price,
      o.notional,
      o.currency,
      o.trader,
      o.traderDisplay,
      o.counterparty,
      o.status,
      o.timestamp,
    ]);
    const csv = [headers, ...rows].map((r) => r.join(',')).join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activeTab.replace(' ', '_').toLowerCase()}_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };
  const tableMaxHeight = showDetail && selectedOrder ? '300px' : '65vh';
  const orderHistory =
    historyState.status === 'success' ? historyState.data : [];
  return (
    <div className='min-h-screen flex flex-col bg-navy-dark'>
      <Header
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onSearch={setGlobalSearch}
      />
      <main className='flex-1 flex flex-col gap-3 p-4 overflow-hidden'>
        <h1 className='text-xl font-bold text-white'>
          {activeTab} <span className='text-gray-500 font-normal'>Blotter</span>
        </h1>
        <Toolbar
          filters={filters}
          onFilterChange={setFilters}
          onExport={handleExport}
          onRefresh={refresh}
        />

        {ordersState.status === 'error' && (
          <ErrorBanner message={ordersState.error} onRetry={refresh} />
        )}

        {ordersState.status === 'loading' && (
          <LoadingSpinner message='Fetching orders…' />
        )}

        {(ordersState.status === 'success' ||
          ordersState.status === 'idle') && (
          <OrderTable
            orders={displayOrders}
            selectedOrder={selectedOrder}
            sortConfig={sortConfig}
            onSelectOrder={handleSelectOrder}
            onSort={handleSort}
            maxHeight={tableMaxHeight}
            isLoading={(ordersState.status as string) === 'loading'}
          />
        )}
        {showDetail && selectedOrder && (
          <OrderDetailPanel
            order={selectedOrder}
            history={orderHistory}
            isHistoryLoading={historyState.status === 'loading'}
            onClose={() => setShowDetail(false)}
          />
        )}
      </main>
    </div>
  );
}

export default App;
