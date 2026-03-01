interface Props {
  readonly message: string; // Added readonly
  readonly onRetry?: () => void; // Added readonly
}

export default function ErrorBanner({ message, onRetry }: Props) {
  return (
    <div className='flex items-center justify-between bg-[rgba(239,68,68,0.12)] border border-[rgba(239,68,68,0.35)] rounded-[5px] px-[14px] py-[10px] text-[#fca5a5] text-[13px] gap-3'>
      <div className='flex items-center gap-2'>
        <svg
          width='16'
          height='16'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          className='shrink-0'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z'
          />
        </svg>
        <span>{message}</span>
      </div>

      {onRetry && (
        <button
          type='button'
          onClick={onRetry}
          className='bg-[rgba(239,68,68,0.2)] border border-[rgba(239,68,68,0.4)] text-[#fca5a5] px-3 py-1 rounded text-[12px] font-inherit whitespace-nowrap cursor-pointer hover:bg-[rgba(239,68,68,0.3)] transition-colors'
        >
          Retry
        </button>
      )}
    </div>
  );
}
