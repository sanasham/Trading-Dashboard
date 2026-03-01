export const getStatusColor = (status: string) => {
  switch (status) {
    case 'BUY':
      return 'bg-emerald-500';
    case 'SELL':
      return 'bg-red-500';
    case 'OPEN':
      return 'bg-blue-500';
    case 'CANCELLED':
      return 'bg-yellow-500';
    default:
      return 'bg-slate-500';
  }
};
