const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content w-full">
      <div
        className="
          max-w-7xl mx-auto px-6 py-4
          flex flex-col sm:flex-row
          items-center justify-between gap-4
        "
      >
        <p className="text-sm text-center sm:text-left">
          © {new Date().getFullYear()} Shreyas Dubey. All rights reserved.
        </p>

        <div className="flex gap-6 text-sm">
          <span className="hover:text-primary cursor-pointer">Privacy</span>
          <span className="hover:text-primary cursor-pointer">Terms</span>
          <span className="hover:text-primary cursor-pointer">Contact</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
