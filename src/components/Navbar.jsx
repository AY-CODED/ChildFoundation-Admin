import { FiSearch, FiBell, FiHelpCircle } from 'react-icons/fi';

const Navbar = () => {
    return (
        <nav className="flex items-center justify-end h-16 px-6 border-b border-gray-200 bg-white w-full">
            <div className="flex items-center gap-6">
                
                <div className="flex items-center bg-[#f4f5f8] border border-gray-200 rounded-full px-4 py-2 w-80">
                    <FiSearch className="w-4 h-4 text-gray-500 mr-2" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-transparent focus:outline-none text-sm text-gray-700 w-full placeholder-gray-500"
                    />
                </div>

                <div className="flex items-center gap-5 text-gray-600">
                    <button className="hover:text-gray-900 focus:outline-none">
                        <FiBell className="w-5 h-5" />
                    </button>
                    <button className="hover:text-gray-900 focus:outline-none">
                        <FiHelpCircle className="w-5 h-5" />
                    </button>
                </div>

                <button className="focus:outline-none ml-1">
                    <img
                        src="https://ui-avatars.com/api/?name=User&background=1e293b&color=fff"
                        alt="Profile"
                        className="w-8 h-8 rounded-full border border-gray-300 object-cover"
                    />
                </button>
            </div>
        </nav>
    );
}

export default Navbar;