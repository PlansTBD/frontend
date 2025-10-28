export default function CareersPage() {
  return (
    <main className="bg-white text-black min-h-screen flex flex-col items-center justify-center px-6 py-24">
      <h1 className="text-4xl font-bold mb-6">Careers</h1>
      <p className="mb-8 text-gray-700 text-center max-w-xl">
        Our team is currently complete, but if you want to change the way experiences are built, send your CV!
      </p>
      <a href="mailto:careers@yourcompany.com" className="px-6 py-3 bg-black text-white rounded-full font-semibold hover:bg-gray-900 transition">
        Send Your CV
      </a>
    </main>
  );
}
