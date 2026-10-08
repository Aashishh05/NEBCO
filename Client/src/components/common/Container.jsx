const Container = ({ className = "", children }) => {
  return (
    <div
      className={`mx-auto w-full max-w-[1280px] px-[56px] max-[1200px]:px-9 max-[700px]:px-[22px] ${className}`}
    >
      {children}
    </div>
  );
};

export default Container;
