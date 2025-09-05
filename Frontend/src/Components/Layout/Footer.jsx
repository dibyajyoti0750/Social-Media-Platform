export default function Footer() {
  return (
    <footer className="w-full flex flex-col gap-2 bg-black text-white border-t border-neutral-700">
      <div className="flex justify-center gap-6 py-4 text-sm text-neutral-500">
        {["Home", "About", "Contact", "Option3", "Option4", "Option5"].map(
          (item, idx) => (
            <a key={idx} href="#" className="hover:text-sky-400 transition">
              {item}
            </a>
          )
        )}
      </div>

      <div className="flex justify-center items-center pb-6">
        <p className="text-neutral-500 text-sm text-center md:text-right">
          &copy; {new Date().getFullYear()} GlowUp. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
