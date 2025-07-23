"use client";

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body className="flex flex-col items-center justify-center bg-white text-center">
        <div className="flex flex-col items-center justify-center min-h-[100vh]">
          <h2 className="text-2xl font-bold text-red-600">
            Something went wrong!
          </h2>
          <p className="mt-2 text-gray-500">{error.message}</p>
          <button
            onClick={() => reset()}
            className="mt-6 px-4 py-2 bg-black text-white rounded hover:cursor-pointer"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
