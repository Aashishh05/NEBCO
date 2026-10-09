const Eyebrow = ({ children, className = "" }) => {
  return (
    <span
      className={`inline-block text-[13px] font-bold uppercase tracking-[0.18em] text-red ${className}`}
    >
      {children}
    </span>
  );
};

export default Eyebrow;
