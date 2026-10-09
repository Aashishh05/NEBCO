const Container = ({ className = "", children }) => {
  return (
    <div
      className={`mx-auto w-[min(1280px,calc(100%-112px))] max-[1200px]:w-[calc(100%-72px)] max-[700px]:w-[calc(100%-44px)] ${className}`}
    >
      {children}
    </div>
  );
};

export default Container;
