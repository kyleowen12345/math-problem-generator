export function Header() {
  return (
    <div className="mb-4 text-center sm:mb-6">
      <div className="mb-3 inline-block transform rounded-xl bg-white px-4 py-3 shadow-lg transition-transform hover:scale-105 sm:mb-4 sm:px-8 sm:py-4">
        <h1 className="bg-blue-500 bg-clip-text text-3xl font-black text-transparent sm:text-4xl md:text-5xl">
          MATH ADVENTURE!
        </h1>
      </div>
      <p className="drop-shadow-lg px-4 text-base font-bold text-white sm:text-lg md:text-xl">
        Solve problems and become a Math Champion!
      </p>
    </div>
  );
}
