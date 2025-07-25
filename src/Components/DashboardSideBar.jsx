import { NavLink } from "react-router";
import Spinner from "../Pages/Shared/Spinner";
import useRole from "../hooks/useRole";

export default function DashboardSidebar() {
  const NavItem = ({ to, icon, label }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2 rounded-lg font-medium ${
          isActive
            ? "bg-blue-100 text-blue-600"
            : "text-gray-700 hover:bg-gray-200"
        }`
      }
    >
      {icon} {label}
    </NavLink>
  );

  const { role, loading } = useRole();

  
  if (loading) return <Spinner></Spinner>;

  if (role === "admin")
    return (
      <nav className="flex flex-col gap-4">
        <NavItem
          to="/dashboard/adminProfile"
          label="My profile"
        />
        <NavItem
          to="/dashboard/manageMembers"
          label="All Members"
        />
        <NavItem
          to="/dashboard/makeAnnouncement"  
          label="Announcement"
        />
        <NavItem
          to="/dashboard/agreementRequests"
          label="All Requests"
        />
        <NavItem
          to="/dashboard/manageCoupons"
          label="All Coupons"
        />
        
      </nav>
    );
  if (role === "member")
    return (
      <nav className="flex flex-col gap-4">
        <NavItem
          to="/dashboard/memberProfile"
          label="My Profile"
        />
      </nav>
    );

  // user sidebar
  return (
    <nav className="flex flex-col gap-4">
      <NavItem
        to="/dashboard/userProfile"
        label="My Profile"
      />

   
    </nav>
  );
}
