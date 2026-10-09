const Spinner = ({ className = "size-6" }) => {
  return (
    <span
      className={`inline-block animate-spin rounded-full border-2 border-red border-t-transparent ${className}`}
      role="status"
      aria-label="Loading"
    />
  );
};

export default Spinner;
