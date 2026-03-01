import type { InstrumentType, OrderSide, OrderStatus, TabName } from '../types';
export const TABS: TabName[] = ['Equity Notes', 'FX Options', 'Swaps'];
export const SIDE_OPTIONS: Array<OrderSide | 'ALL'> = ['ALL', 'BUY', 'SELL'];
export const STATUS_OPTIONS: Array<OrderStatus | 'ALL'> = [
  'ALL',
  'OPEN',
  'FILLED',
  'PARTIAL',
  'CANCELLED',
];

export const TAB_INSTRUMENT_MAP: Record<TabName, InstrumentType> = {
  'Equity Notes': 'Equity',
  'FX Options': 'FX Option',
  Swaps: 'Swap',
};
