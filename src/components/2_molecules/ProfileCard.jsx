import { FaUser, FaIdBadge, FaEnvelope, FaGithub } from "react-icons/fa";

export default function ProfileCard({ name, role, nim, email, photoUrl, socialLinks }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-5 text-center transform hover:scale-105 transition-transform duration-300">
      <img
        src={photoUrl || "https://via.placeholder.com/150"} // Foto placeholder
        alt={`Foto ${name}`}
        className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-emerald-500"
      />
      <h3 className="text-xl font-bold text-gray-800">{name}</h3>
      <p className="text-emerald-600 font-semibold mb-3">{role}</p>

      <div className="text-left text-gray-600 space-y-2">
        {nim && (
          <div className="flex items-center">
            <FaIdBadge className="mr-3 text-gray-400" />
            <span>{nim}</span>
          </div>
        )}
        {email && (
          <div className="flex items-center">
            <FaEnvelope className="mr-3 text-gray-400" />
            <span>{email}</span>
          </div>
        )}
      </div>

      {socialLinks && (
        <div className="mt-4 flex justify-center space-x-4">
          {socialLinks.github && (
            <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-800">
              <FaGithub size={24} />
            </a>
          )}
          {/* Tambahkan link sosial media lain di sini */}
        </div>
      )}
    </div>
  );
}
