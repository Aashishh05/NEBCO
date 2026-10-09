const StatCard = ({ value, label, className = "" }) => {
  return (
    <div className={`border-l-2 border-red pl-5 ${className}`}>
      <div className="text-4xl font-extrabold text-ink max-[700px]:text-3xl">{value}</div>
      <div className="mt-1 text-[15px] text-muted-fg">{label}</div>
    </div>
  );
};

export default StatCard;
