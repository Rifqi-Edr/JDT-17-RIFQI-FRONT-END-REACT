const Box = ({
  title,
  desc,
}: {
  title: string;
  desc: string;
}) => {
  return (
    <div className="relative p-8 rounded-3xl flex flex-col gap-4 bg-white/50 backdrop-blur-sm border border-white/50 shadow-sm transition-all duration-500 hover:shadow-md hover:bg-white/60 overflow-hidden">
      <span className="absolute inset-0 rounded-3xl pointer-events-none bg-gradient-to-br from-white/40 via-white/5 to-transparent" />
      <h3 className="relative text-xl font-bold text-black tracking-wide">
        {title}
      </h3>
      <div className="relative w-10 h-px bg-black/20" />
      <p className="relative text-base text-black/80 leading-relaxed">
        {desc}
      </p>
    </div>
  );
};

export default Box;
