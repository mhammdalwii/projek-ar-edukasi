import { useNavigate } from "react-router-dom";
import MenuButton from "../2_molecules/MenuButton";
import { FaBook, FaClipboardList, FaQuestionCircle, FaMicrochip, FaUserFriends } from "react-icons/fa";
import { IoIosPower } from "react-icons/io";

export default function MainMenuGrid() {
  const navigate = useNavigate();

  const menuItems = [
    { text: "Standar Kompetensi...", icon: FaClipboardList, color: "bg-orange-500", path: "/standar-kompetensi" },
    { text: "Augmented Reality Elektronika", icon: FaMicrochip, color: "bg-fuchsia-500", path: "/augmented-reality" },
    { text: "Materi Pembelajaran", icon: FaBook, color: "bg-red-600", path: "/materi" },
    { text: "Soal", icon: FaQuestionCircle, color: "bg-pink-400", path: "/soal" },
    { text: "Petunjuk Penggunaan", icon: FaUserFriends, color: "bg-blue-500", path: "/petunjuk" },
    { text: "Tentang", icon: FaUserFriends, color: "bg-emerald-500", path: "/tentang" },
  ];

  return (
    <div className="w-full px-4">
      <div className="grid grid-cols-2 gap-4">
        {menuItems.map((item, index) => (
          <MenuButton key={index} IconComponent={item.icon} text={item.text} bgColor={item.color} onClick={() => navigate(item.path)} />
        ))}
      </div>

      <div className="flex justify-end mt-6">
        {/* Menggunakan warna merah default */}
        <button className="bg-red-600 p-3 rounded-lg text-white shadow-md hover:opacity-90 transition-opacity">
          <IoIosPower size={32} />
        </button>
      </div>
    </div>
  );
}
