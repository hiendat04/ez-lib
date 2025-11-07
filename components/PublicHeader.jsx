const PublicHeader = () => {
  return (
    <header className="flex h-16 items-center justify-between border-gray-200 px-40">
      <div>
        <p className="text-primary cursor-pointer text-4xl font-bold">EzLib</p>
      </div>
      <nav className="flex gap-7">
        <p className="hover:text-primary cursor-pointer">Home</p>
        <p className="hover:text-primary cursor-pointer">Browse Books</p>
        <p className="hover:text-primary cursor-pointer">Features</p>
        <p className="hover:text-primary cursor-pointer">About</p>
      </nav>
      <div className="flex gap-7">
        <p className="text-primary cursor-pointer rounded-lg px-4 py-2 font-medium hover:bg-slate-200">
          Sign In
        </p>
        <p className="bg-primary cursor-pointer rounded-lg px-4 py-2 font-medium text-white">
          Sign Up
        </p>
      </div>
    </header>
  );
};
export default PublicHeader;
