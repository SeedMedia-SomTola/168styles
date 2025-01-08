import Button from "./Button";
export default function Navegation() {
  return (
    <>
      <nav className="bg-white w-full p-3 z-50 max-w-screen-lg sticky top-0">
        <div className="flex justify-between items-center">
          <h1 className="font-[700] text-[24px] text-black">168 Styles</h1>
          <Button />
        </div>

        <div>
          <ul className="flex space-x-2 overflow-x-auto py-4">
            <li className="cursor-pointer whitespace-nowrap rounded-lg">
              <button className="transition-all  group">
                <div className="rounded-full border-2 border-[#fcd28a] px-3 py-1 transition-all text-[#000000] group-hover:bg-[#f9ebd22f] group-hover:text-[#fcd28a]">
                  <span className="text-center font-semibold decoration-[#fcd28a] decoration-[3px] underline-offset-4">
                    Tank Top
                  </span>
                </div>
              </button>
            </li>
          </ul>
        </div>

        <div className="pb-3">
          <div className="grid w-full items-center gap-1.5">
            <div className="relative">
              <input
                className="flex w-full border border-gray-400 border-input text-sm text-black shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 rounded-full h-9 px-3 py-1 bg-white "
                placeholder="Search menus..."
                type="text"
                name="input"
              />
              <div className="absolute bottom-0 right-0 mr-3 flex h-9 w-9 items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#9ca3af"
                  className="h-5 w-5 text-primary"
                >
                  <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path>
                  <path d="M21 21l-6 -6"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
