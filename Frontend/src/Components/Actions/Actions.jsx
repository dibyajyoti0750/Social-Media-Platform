export default function Actions() {
  return (
    <div className="flex justify-around items-center text-xl text-zinc-600 p-2">
      {["fa-thumbs-up", "fa-comment", "fa-share-from-square"].map(
        (item, idx) => (
          <button key={idx} className="cursor-pointer hover:text-zinc-300">
            <i className={`far ${item}`}></i>
          </button>
        )
      )}
    </div>
  );
}
