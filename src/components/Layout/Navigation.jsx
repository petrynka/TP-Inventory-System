import { NavLink } from "react-router-dom";
import { ShoppingBag, Package, ChevronRight } from "lucide-react";

const Navigation = () => {
  const navItems = [
    {
      path: "/orders",
      label: "Приходы",
      icon: ShoppingBag,
      count: 25,
    },
    {
      path: "/products",
      label: "Продукты",
      icon: Package,
      count: null,
    },
  ];

  return (
    <nav className="w-64 bg-white shadow-lg border-r border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
            <Package className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold text-gray-800">INVENTORY</h1>
        </div>
      </div>

      {/* Navigation Items */}
      <div className="p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center justify-between p-3 rounded-lg transition-all duration-200 group hover:bg-gray-50 ${
                    isActive
                      ? "bg-green-50 text-green-600 border-r-4 border-green-500"
                      : "text-gray-600 hover:text-gray-800"
                  }`
                }
              >
                <div className="flex items-center space-x-3">
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </div>

                <div className="flex items-center space-x-2">
                  {item.count && (
                    <span className="text-sm text-gray-500">{item.count}</span>
                  )}
                  <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
