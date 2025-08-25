export default function Actions() {
  return (
    <div className="flex justify-between items-center text-xl text-gray-400 p-3 mx-20">
      {["fa-thumbs-up", "fa-comment", "fa-share-from-square"].map(
        (item, idx) => (
          <button key={idx} className="cursor-pointer">
            <i className={`far ${item}`}></i>
          </button>
        )
      )}
    </div>
  );
}
