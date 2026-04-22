import { NavLink } from "react-router-dom";
import { FaHome, FaPlus, FaList, FaUsers } from "react-icons/fa";

const PageMenu = () => {
    const menuItems = [
        { path: "/add-test", label: "Add Test", icon: FaPlus },
        { path: "/test-list", label: "Test List", icon: FaList },
        { path: "/users", label: "Registered Users", icon: FaUsers },
    ];

    const navLinkClass = ({ isActive }) =>
        `flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
            isActive
                ? 'text-white bg-[#3475d9]'
                : 'text-gray-600 hover:text-[#3475d9] hover:bg-blue-50'
        }`;

    return (
        <div className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-wrap items-center gap-2 py-3">
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={navLinkClass}
                        >
                            <item.icon className="text-base" />
                            <span className="whitespace-nowrap">{item.label}</span>
                        </NavLink>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PageMenu;
