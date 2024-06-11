export default function Home() {
  return (
    <div>
      <div className="relative w-32 h-32">
        <div className="absolute w-full h-full rounded-full bg-gray-200 dark:bg-gray-700"></div>
        <div className="absolute w-full h-full rounded-full flex items-center justify-center">
          <div className="text-4xl font-bold text-gray-800 dark:text-gray-200">
            75%
          </div>
        </div>
        <div
          className="absolute w-full h-full rounded-full bg-blue-500 flex items-center justify-center"
          style="clip-path: inset(0 50% 0 0); transform: rotate(135deg);"
        ></div>
      </div>
    </div>
  );
}
