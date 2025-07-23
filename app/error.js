
"use client";

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body className="flex flex-col items-center justify-center h-screen bg-white text-center">
        <h2 className="text-2xl font-bold text-red-600">
          Something went wrong!
        </h2>
        <p className="mt-2 text-gray-500">{error.message}</p>
        <button
          onClick={() => reset()}
          className="mt-6 px-4 py-2 bg-black text-white rounded"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
