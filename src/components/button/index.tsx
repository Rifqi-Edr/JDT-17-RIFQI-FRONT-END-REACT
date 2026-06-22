interface ButtonProps {
  content: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = ({ content, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="relative px-6 py-3 bg-white/50 backdrop-blur-sm border border-white/50 text-black text-base tracking-wide rounded-full hover:bg-white/70 hover:shadow-sm transition-all duration-300 overflow-hidden"
    >
      <span className="absolute inset-0 rounded-full pointer-events-none bg-gradient-to-br from-white/40 via-white/5 to-transparent" />
      <span className="relative">{content}</span>
    </button>
  );
};

export default Button;
