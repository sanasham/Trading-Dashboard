// ─────────────────────────────────────────────────────────────────────────────
// Domain types
// ─────────────────────────────────────────────────────────────────────────────

export type OrderSide = 'BUY' | 'SELL';
export type OrderStatus = 'OPEN' | 'FILLED' | 'CANCELLED' | 'PARTIAL';
export type InstrumentType = 'Equity' | 'FX Option' | 'Swap';
export type TabName = 'Equity Notes' | 'FX Options' | 'Swaps';
export type SortDirection = 'asc' | 'desc';

export interface Order {
  id: string;
  orderId: string;
  tradeId: string;
  symbol: string;
  instrument: InstrumentType;
  side: OrderSide;
  quantity: number;
  price: number;
  notional: number;
  currency: string;
  trader: string;
  traderDisplay: string;
  counterparty: string;
  status: OrderStatus;
  timestamp: string;
}

export interface OrderHistoryEvent {
  time: string;
  event: string;
  details?: string;
}

export interface SortConfig {
  key: keyof Order | null;
  direction: SortDirection;
}

export interface FilterState {
  text: string;
  side: OrderSide | 'ALL';
  status: OrderStatus | 'ALL';
  symbol: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// API request / response shapes
// ─────────────────────────────────────────────────────────────────────────────

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface OrdersQueryParams {
  instrument?: InstrumentType;
  side?: OrderSide;
  status?: OrderStatus;
  symbol?: string;
  search?: string;
  sortBy?: keyof Order;
  sortDir?: SortDirection;
  page?: number;
  pageSize?: number;
}

// Discriminated union for async state
export type AsyncState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: string };

export interface HeaderProps {
  activeTab: TabName;
  onTabChange: (tab: TabName) => void;
  onSearch: (text: string) => void;
}
export interface ToolbarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onExport: () => void;
  onRefresh: () => void;
}
export interface OrderTableProps {
  orders: Order[];
  selectedOrder: Order | null;
  sortConfig: SortConfig;
  onSelectOrder: (order: Order) => void;
  onSort: (key: keyof Order) => void;
  maxHeight: string;
  isLoading?: boolean;
}
