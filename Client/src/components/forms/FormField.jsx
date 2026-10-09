const FormField = ({ label, htmlFor, error, required = false, children, className = "" }) => {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={htmlFor} className="text-sm font-semibold text-ink">
          {label}
          {required && <span className="ml-0.5 text-red">*</span>}
        </label>
      )}
      {children}
      {error && <p className="text-sm text-red">{error}</p>}
    </div>
  );
};

export default FormField;
