const Eyebrow = ({ children, className = "" }) => {
  return (
    <p
      className={`flex items-center gap-3 text-[12px] font-bold uppercase tracking-[0.12em] leading-relaxed text-[#62645d] ${className}`}
    >
      <span aria-hidden="true" className="h-[2px] w-7 shrink-0 bg-red" />
      {children}
    </p>
  );
};

export default Eyebrow;
