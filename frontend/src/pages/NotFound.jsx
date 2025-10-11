export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <img
        src="/404.svg"
        alt="404 error illustration"
        className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xl h-auto mb-2"
      />

      <h1 className="text-6xl font-bold mb-2" style={{ color: 'var(--main)' }}>
        Error 404: Page Not Found
      </h1>
      <h2
        className="text-6xl font-bold mb-2"
        style={{ color: 'var(--main)' }}
      ></h2>
      <p className="text-gray-600 mb-8">
        The page you're looking for doesn't exist.
        <a href="https://storyset.com/people">
          People illustrations by Storyset
        </a>
      </p>
    </div>
  );
}
