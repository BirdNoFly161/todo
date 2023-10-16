function Spinner({ className }) {
  return (
    <div
      className={`w-[2em] h-[2em] rounded-[100%] border border-accent border-t-transparent animate-spin ${className}`}
    ></div>
  );
}

export default Spinner;
