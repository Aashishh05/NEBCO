const StatCard = ({ value, symbol, label, note }) => {
  return (
    <div className="flex items-center gap-4 max-[960px]:block">
      <strong className="text-[42px] font-medium leading-none tracking-[-0.03em] text-ink max-[1200px]:text-[36px] max-[960px]:text-[38px]">
        {value}
        {symbol && <span className="text-red">{symbol}</span>}
      </strong>
      <p className="text-[13px] leading-relaxed text-[#60635c]">
        {label}
        {note && <small className="mt-1 block text-[12px] text-[#83857c]">{note}</small>}
      </p>
    </div>
  );
};

export default StatCard;
