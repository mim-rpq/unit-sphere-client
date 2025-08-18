import { NavLink } from "react-router";
import { MdDashboard, MdPeople, MdAnnouncement, MdPayment, MdHistory, MdPerson, MdLocalOffer } from "react-icons/md";
import Spinner from "../Pages/Shared/Spinner";
import useRole from "../hooks/useRole";
import { HiOutlineSpeakerphone } from "react-icons/hi";

export default function DashboardSidebar() {
  const NavItem = ({ to, icon, label }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2 rounded-lg font-medium ${isActive
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
        <NavItem to="/dashboard/adminProfile" icon={<MdPerson />} label="My Profile" />
        <NavItem to="/dashboard/manageMembers" icon={<MdPeople />} label="All Members" />
         <NavItem to="/dashboard/overview" icon={<MdPeople />} label="Overview" />
        <NavItem to="/dashboard/makeAnnouncement" icon={<HiOutlineSpeakerphone />} label="Announcement" />
        <NavItem to="/dashboard/agreementRequests" icon={<MdDashboard />} label="All Requests" />
        <NavItem to="/dashboard/manageCoupons" icon={<MdLocalOffer />} label="All Coupons" />

      </nav>
    );
  if (role === "member")
    return (
      <nav className="flex flex-col gap-4">
        <NavItem to="/dashboard/memberProfile" icon={<MdPerson />} label="My Profile" />
         <NavItem to="/dashboard/overview" icon={<MdPeople />} label="Overview" />
        <NavItem to="/dashboard/makePayment" icon={<MdPayment />} label="Make Payment" />
        <NavItem to="/dashboard/paymentHistory" icon={<MdHistory />} label="Payment History" />
        <NavItem to="/dashboard/announcements" icon={<MdAnnouncement />} label="Announcements" />
      </nav>
    );

  // user sidebar
  return (
     <nav className="flex flex-col gap-4">
      <NavItem to="/dashboard/userProfile" icon={<MdPerson />} label="My Profile" />
      <NavItem to="/dashboard/announcements" icon={<MdAnnouncement />} label="Announcements" />
    </nav>
  );
}
