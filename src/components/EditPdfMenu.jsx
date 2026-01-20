import { RotateCw, Hash, Droplet, Crop, Pencil, Slash } from "lucide-react"; 

// Add Slash icon from lucide-react for "Remove Watermark"

export default function EditPdfMenu({ active, setActive }) {
  const items = [
    { id: "rotate", label: "Rotate PDF", icon: RotateCw },
    { id: "pageNumbers", label: "Add page numbers", icon: Hash },
    { id: "watermark", label: "Add watermark", icon: Droplet },
    { id: "removeWatermark", label: "Remove Watermark", icon: Slash },
    { id: "crop", label: "Crop PDF", icon: Crop },
    { id: "edit", label: "Edit PDF", icon: Pencil },
  ];

  return (
    <aside className="w-64 bg-white border-r p-4">
      <h3 className="font-bold text-gray-700 mb-4">EDIT PDF</h3>

      <ul className="space-y-2">
        {items.map(item => (
          <li
            key={item.id}
            onClick={() => setActive(item.id)}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer
              ${active === item.id 
                ? "bg-purple-100 text-purple-700 font-semibold" 
                : "hover:bg-gray-100 text-gray-700"}`}
          >
            <item.icon size={18} />
            {item.label}
          </li>
        ))}
      </ul>
    </aside>
  );
}
