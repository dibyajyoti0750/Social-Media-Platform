export default function NavIcons() {
  const navIcons = ["fa-grip-vertical", "fa-message", "fa-bell", "fa-user"];

  return (
    <>
      {navIcons.map((item, idx) => (
        <button
          key={idx}
          className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300"
        >
          <i className={`fas ${item}`}></i>
        </button>
      ))}
    </>
  );
}
