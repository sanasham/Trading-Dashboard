// ─────────────────────────────────────────────────────────────────────────────
// Mock "database" — the single source of truth for all sample data.
// When you switch to a real API, delete this file; nothing else changes.
// ─────────────────────────────────────────────────────────────────────────────

import type { Order, OrderHistoryEvent } from '../../types';

export const MOCK_ORDERS: Order[] = [
  { id:'1',  orderId:'203456', tradeId:'TRD10234', symbol:'AAPL',    instrument:'Equity',    side:'BUY',  quantity:5000,     price:145.75, notional:728750,   currency:'USD', trader:'JSmith',    traderDisplay:'John Smith',      counterparty:'Goldman Sachs',   status:'OPEN',      timestamp:'2024-04-25 10:45:12' },
  { id:'2',  orderId:'203325', tradeId:'TRD10233', symbol:'MIX',     instrument:'Equity',    side:'SELL', quantity:16000,    price:147.75, notional:109000,   currency:'USD', trader:'Imefe',     traderDisplay:'Imefe',           counterparty:'Goldman Sachs',   status:'OPEN',      timestamp:'2024-04-25 10:45:30' },
  { id:'3',  orderId:'203336', tradeId:'FHP20563', symbol:'PWX',     instrument:'Equity',    side:'SELL', quantity:16000,    price:145.75, notional:129758,   currency:'USD', trader:'Blogz',     traderDisplay:'Blogz',           counterparty:'Burdon Bank',     status:'FILLED',    timestamp:'2024-04-25 10:45:30' },
  { id:'4',  orderId:'203567', tradeId:'FHP20563', symbol:'PTX',     instrument:'Equity',    side:'SELL', quantity:20000,    price:145.55, notional:128798,   currency:'USD', trader:'Tim',       traderDisplay:'Tim',             counterparty:'Hurgios Bank',    status:'FILLED',    timestamp:'2024-04-25 10:45:30' },
  { id:'5',  orderId:'203492', tradeId:'FAD20566', symbol:'FPEN',    instrument:'Equity',    side:'SELL', quantity:86000,    price:176.70, notional:122300,   currency:'USD', trader:'Zaric',     traderDisplay:'Zaric',           counterparty:'Corprese Bank',   status:'FILLED',    timestamp:'2024-04-25 10:45:30' },
  { id:'6',  orderId:'203393', tradeId:'TRD10238', symbol:'DTX',     instrument:'Equity',    side:'SELL', quantity:16000,    price:178.70, notional:135350,   currency:'USD', trader:'Mlane',     traderDisplay:'Mlane',           counterparty:'Goldman Sachs',   status:'OPEN',      timestamp:'2024-04-25 10:45:30' },
  { id:'7',  orderId:'203393', tradeId:'FHP20566', symbol:'APAL',    instrument:'Equity',    side:'SELL', quantity:16000,    price:161.62, notional:128750,   currency:'USD', trader:'Aleve',     traderDisplay:'Aleve',           counterparty:'Redmond Bank',    status:'FILLED',    timestamp:'2024-04-25 10:45:30' },
  { id:'8',  orderId:'203399', tradeId:'FHP20253', symbol:'AAPL',    instrument:'Equity',    side:'SELL', quantity:20000,    price:177.75, notional:109600,   currency:'USD', trader:'Casey',     traderDisplay:'Casey',           counterparty:'Goldman Sachs',   status:'OPEN',      timestamp:'2024-04-25 10:45:30' },
  { id:'9',  orderId:'203394', tradeId:'TRD10238', symbol:'DWX',     instrument:'Equity',    side:'SELL', quantity:14000,    price:161.62, notional:129350,   currency:'USD', trader:'JSmith',    traderDisplay:'John Smith',      counterparty:'Kick Bank',       status:'FILLED',    timestamp:'2024-04-25 10:45:30' },
  { id:'10', orderId:'203401', tradeId:'TRD10241', symbol:'MSFT',    instrument:'Equity',    side:'BUY',  quantity:12000,    price:312.45, notional:374940,   currency:'USD', trader:'RJones',    traderDisplay:'Robert Jones',    counterparty:'Morgan Stanley',  status:'OPEN',      timestamp:'2024-04-25 11:00:00' },
  { id:'11', orderId:'203402', tradeId:'TRD10242', symbol:'TSLA',    instrument:'Equity',    side:'SELL', quantity:3000,     price:189.30, notional:56790,    currency:'USD', trader:'BKim',      traderDisplay:'Brian Kim',       counterparty:'JP Morgan',       status:'FILLED',    timestamp:'2024-04-25 11:05:22' },
  { id:'12', orderId:'203403', tradeId:'TRD10243', symbol:'NVDA',    instrument:'Equity',    side:'BUY',  quantity:2500,     price:875.40, notional:2188500,  currency:'USD', trader:'AMiller',   traderDisplay:'Alice Miller',    counterparty:'Barclays',        status:'PARTIAL',   timestamp:'2024-04-25 11:10:45' },
  { id:'13', orderId:'203410', tradeId:'TRD10250', symbol:'AMZN',    instrument:'Equity',    side:'BUY',  quantity:800,      price:186.20, notional:148960,   currency:'USD', trader:'DChang',    traderDisplay:'David Chang',     counterparty:'UBS',             status:'OPEN',      timestamp:'2024-04-25 11:20:00' },
  { id:'14', orderId:'300101', tradeId:'FX20100',  symbol:'EUR/USD', instrument:'FX Option', side:'BUY',  quantity:1000000,  price:1.0832, notional:1083200,  currency:'EUR', trader:'PVoss',     traderDisplay:'Peter Voss',      counterparty:'Deutsche Bank',   status:'OPEN',      timestamp:'2024-04-25 11:15:00' },
  { id:'15', orderId:'300102', tradeId:'FX20101',  symbol:'GBP/USD', instrument:'FX Option', side:'SELL', quantity:500000,   price:1.2745, notional:637250,   currency:'GBP', trader:'SLewis',    traderDisplay:'Sarah Lewis',     counterparty:'HSBC',            status:'FILLED',    timestamp:'2024-04-25 11:22:10' },
  { id:'16', orderId:'300103', tradeId:'FX20102',  symbol:'USD/JPY', instrument:'FX Option', side:'BUY',  quantity:2000000,  price:153.42, notional:306840,   currency:'JPY', trader:'KNakamura', traderDisplay:'K. Nakamura',     counterparty:'Nomura',          status:'OPEN',      timestamp:'2024-04-25 11:30:00' },
  { id:'17', orderId:'300104', tradeId:'FX20103',  symbol:'AUD/USD', instrument:'FX Option', side:'SELL', quantity:750000,   price:0.6512, notional:488400,   currency:'AUD', trader:'MWilson',   traderDisplay:'Mark Wilson',     counterparty:'ANZ Bank',        status:'CANCELLED', timestamp:'2024-04-25 11:45:00' },
  { id:'18', orderId:'400201', tradeId:'SW30001',  symbol:'IRS-5Y',  instrument:'Swap',      side:'SELL', quantity:5000000,  price:4.25,   notional:5000000,  currency:'USD', trader:'LTorres',   traderDisplay:'Luis Torres',     counterparty:'Citi',            status:'OPEN',      timestamp:'2024-04-25 11:20:10' },
  { id:'19', orderId:'400202', tradeId:'SW30002',  symbol:'CDS-10Y', instrument:'Swap',      side:'BUY',  quantity:10000000, price:1.45,   notional:10000000, currency:'USD', trader:'JBrown',    traderDisplay:'James Brown',     counterparty:'Bank of America', status:'FILLED',    timestamp:'2024-04-25 11:35:00' },
  { id:'20', orderId:'400203', tradeId:'SW30003',  symbol:'IRS-2Y',  instrument:'Swap',      side:'SELL', quantity:2500000,  price:5.12,   notional:2500000,  currency:'EUR', trader:'FDubois',   traderDisplay:'François Dubois', counterparty:'BNP Paribas',     status:'OPEN',      timestamp:'2024-04-25 11:55:00' },
];

export const MOCK_ORDER_HISTORY: Record<string, OrderHistoryEvent[]> = {
  '203456': [
    { time:'2024-04-25 10:45:30', event:'ORDER FILLED',  details:'Qty: 5,000 @ 145.75' },
    { time:'2024-04-25 10:45:12', event:'ORDER PLACED',  details:'Symbol: AAPL' },
  ],
  '203336': [
    { time:'2024-04-25 10:46:10', event:'ORDER FILLED',  details:'Qty: 16,000 @ 145.75' },
    { time:'2024-04-25 10:45:40', event:'ORDER AMENDED', details:'Qty changed: 14,000 → 16,000' },
    { time:'2024-04-25 10:45:30', event:'ORDER PLACED',  details:'Symbol: PWX' },
  ],
};

/** Generate a default history when no specific one is defined */
export const defaultHistory = (order: Order): OrderHistoryEvent[] => [
  {
    time:    order.timestamp.replace(':12', ':30'),
    event:   'ORDER FILLED',
    details: `Qty: ${order.quantity.toLocaleString()} @ ${order.price}`,
  },
  {
    time:    order.timestamp,
    event:   'ORDER PLACED',
    details: `Symbol: ${order.symbol}`,
  },
];
