const Footer = () => {
  return (
    <footer className="border-t border-white/30 bg-white/20 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-8 h-14 flex items-center justify-center">
        <p className="text-sm text-slate-500 tracking-wide">
          &copy; {new Date().getFullYear()} JDT Training Rifqi_Edr
        </p>
      </div>
    </footer>
  );
};

export default Footer;
