export function VeloxLogo({ className }: { className?: string }) {
  return (
    <div className={className}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-primary"
      >
        <path d="M16 4L28 28H4L16 4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M16 12L22 24H10L16 12Z" fill="currentColor" />
      </svg>
    </div>
  )
}
