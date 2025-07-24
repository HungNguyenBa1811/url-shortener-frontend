function SortIcon({ width = '1rem', height = '1rem', className}) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      className={className}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier"> 
        <path d="M18 12H6" stroke="#363853" strokeWidth="1.5" strokeLinecap="round"></path> 
        <path d="M21 4L3 4" stroke="#363853" strokeWidth="1.5" strokeLinecap="round"></path> 
        <path d="M9 20L15 20" stroke="#363853" strokeWidth="1.5" strokeLinecap="round"></path> 
      </g>
    </svg>
  );
}

export default SortIcon;