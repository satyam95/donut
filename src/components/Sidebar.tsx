import { Link, useLocation } from "react-router-dom";

interface SidebarItem {
  title: string;
  path: string;
  badge?: string;
}

interface SidebarGroupProps {
  title: string;
  items: SidebarItem[];
}

const gettingStartedItems = [
  { title: "Introduction", path: "/introduction" },
  { title: "Installation", path: "/installation" },
];

const componentsItems = [{ title: "Button", path: "/components/button" }];

const Sidebar = () => {
  return (
    <div className="no-scrollbar h-full overflow-auto py-6 pr-4">
      <div className="space-y-6">
        <SidebarGroup title="Getting Started" items={gettingStartedItems} />
        <SidebarGroup title="Components" items={componentsItems} />
      </div>
    </div>
  );
};

const SidebarGroup = ({ title, items }: SidebarGroupProps) => {
  const location = useLocation();
  return (
    <div>
      <h4 className="mb-1 text-sm font-semibold text-black">{title}</h4>
      <div className="grid grid-flow-row auto-rows-max text-sm">
        {items.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex justify-between py-1 text-gray-600 hover:text-black ${
              location.pathname === item.path ? "font-medium text-black" : ""
            }`}
          >
            {item.title}
            {item.badge && (
              <span className="ml-2 rounded-md bg-black px-1.5 py-0.5 text-xs text-white">
                {item.badge}
              </span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
