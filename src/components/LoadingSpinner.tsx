interface Props {
  readonly message?: string;
}

export default function LoadingSpinner({ message = 'Loading…' }: Props) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 16px',
        gap: '12px',
        color: '#64748b',
      }}
    >
      <svg
        style={{ animation: 'spin 0.8s linear infinite' }}
        width='28'
        height='28'
        viewBox='0 0 24 24'
        fill='none'
      >
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
        <circle cx='12' cy='12' r='10' stroke='#2a3a52' strokeWidth='3' />
        <path
          d='M12 2a10 10 0 0 1 10 10'
          stroke='#3b82f6'
          strokeWidth='3'
          strokeLinecap='round'
        />
      </svg>
      <span style={{ fontSize: '13px' }}>{message}</span>
    </div>
  );
}
