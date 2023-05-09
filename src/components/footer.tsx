export default function Footer() {
  return (
    <footer>
      <div className="max-w-3xl px-4 mx-auto sm:px-6 lg:px-8 lg:max-w-7xl">
        <div className="py-8 text-xs text-center text-gray-500 border-t border-gray-200 lg:text-sm sm:text-left">
          <span className="block sm:inline">
            &copy; 2021-{new Date().getFullYear()} Busse Inc., Busse Hospital
            Disposables, Inc., Robert Busse & Co., <span>busse</span>
            <span className="italic font-semibold">force</span>.
          </span>{" "}
          <span className="block sm:inline">All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
