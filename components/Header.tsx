export default function Header() {
  return (
    <header className="relative">
      <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gray-100" />
      <div className="mx-auto">
        <div className="relative shadow-xl sm:overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-zinc-400 mix-blend-multiply" />
          </div>
          <div className="relative px-4 py-8 sm:px-6 sm:py-8 lg:py-10 lg:px-8">
            <p className="relative left-0 right-0 mx-auto mt-5 max-w-xl text-center text-2xl font-semibold text-black-600">
              Marvel API Demo
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}
