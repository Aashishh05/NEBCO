const Eyebrow = ({ children, className = "" }) => {
  return (
    <p className={`eyebrow ${className}`}>
      <span aria-hidden="true" />
      {children}
    </p>
  );
};

export default Eyebrow;
