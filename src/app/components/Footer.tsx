export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 bg-background text-foreground mt-10">
      <div className="container mx-auto px-6 py-8 text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} <span className="font-semibold">RideBite</span>. All rights reserved.
        </p>
        <div className="mt-3 space-x-4">
          <a href="#" className="hover:text-orange-500 transition">Privacy</a>
          <a href="#" className="hover:text-orange-500 transition">Terms</a>
          <a href="#" className="hover:text-orange-500 transition">Support</a>
        </div>
      </div>
    </footer>
  );
}
