// import { NavLink, Outlet, useLocation } from "react-router-dom"
// import {
//   Sidebar, SidebarContent, SidebarFooter, SidebarGroup,
//   SidebarGroupLabel, SidebarHeader, SidebarInset, SidebarMenu,
//   SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarRail,
//   SidebarTrigger,
// } from "@/components/ui/sidebar"
// import { Separator } from "@/components/ui/separator"
// import { TooltipProvider } from "@/components/ui/tooltip"
// import {
//   LayoutDashboard, Users, Briefcase, Bell, LogOut, ChevronRight, Settings,
// } from "lucide-react"
// import logo from "@/assets/Lifewood-Logo.png"

// const NAV_MAIN = [
//   { label: "Overview",     to: "/admin",              icon: LayoutDashboard, end: true },
//   { label: "Applications", to: "/admin/applications", icon: Users },
//   { label: "Positions",    to: "/admin/positions",    icon: Briefcase },
// ]

// const NAV_BOTTOM = [
//   { label: "Settings",    to: "/admin/settings", icon: Settings },
//   { label: "Back to Site", to: "/",              icon: LogOut },
// ]

// export default function AdminLayout() {
//   const { pathname } = useLocation()

//   const crumb = pathname === "/admin"
//     ? "Overview"
//     : pathname.split("/admin/")[1]?.replace("-", " ") ?? ""

//   return (
//     <TooltipProvider>
//       <SidebarProvider>
//         <Sidebar
//           collapsible="icon"
//           // Modern White Sidebar with subtle border
//           className="border-r border-slate-200 bg-white"
//         >
//           {/* Header Area */}
//           <SidebarHeader className="h-16 px-6 flex-row items-center justify-between border-b border-slate-100">
//             <div className="flex items-center gap-3 overflow-hidden">
//               {/* Logo - Removed invert so it shows original colors */}
//               <img src={logo} alt="Lifewood" className="h-8 w-auto shrink-0" />
//             </div>
//           </SidebarHeader>

//           <SidebarContent className="px-3 py-4">
//             <SidebarGroup>
//               <SidebarGroupLabel className="text-slate-400 text-[11px] font-semibold uppercase px-3 mb-2">
//                 Main Navigation
//               </SidebarGroupLabel>
//               <SidebarMenu className="gap-1">
//                 {NAV_MAIN.map(({ label, to, icon: Icon, end }) => {
//                   const active = end ? pathname === to : pathname.startsWith(to)
//                   return (
//                     <SidebarMenuItem key={to}>
//                       <SidebarMenuButton
//                         asChild
//                         isActive={active}
//                         tooltip={label}
//                         size="lg"
//                         className={`transition-all duration-200 px-3 ${
//                           active
//                             ? "bg-emerald-50 text-emerald-700 font-semibold shadow-sm shadow-emerald-100/50"
//                             : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
//                         }`}
//                       >
//                         <NavLink to={to} end={end} className="flex items-center gap-3">
//                           <Icon size={18} className={active ? "text-emerald-600" : "text-slate-400"} />
//                           <span className="text-[14px]">{label}</span>
//                         </NavLink>
//                       </SidebarMenuButton>
//                     </SidebarMenuItem>
//                   )
//                 })}
//               </SidebarMenu>
//             </SidebarGroup>
//           </SidebarContent>

//           <SidebarFooter className="p-4 border-t border-slate-100">
//             <SidebarMenu className="gap-1">
//               {NAV_BOTTOM.map(({ label, to, icon: Icon }) => (
//                 <SidebarMenuItem key={to}>
//                   <SidebarMenuButton
//                     asChild
//                     tooltip={label}
//                     className="text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors px-3"
//                   >
//                     <NavLink to={to}>
//                       <Icon size={18} />
//                       <span className="text-[14px]">{label}</span>
//                     </NavLink>
//                   </SidebarMenuButton>
//                 </SidebarMenuItem>
//               ))}
//             </SidebarMenu>
//           </SidebarFooter>
//           <SidebarRail />
//         </Sidebar>

//         <SidebarInset className="bg-slate-50/50">
//           {/* Top Bar - Complementary Modern Design */}
//           <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-slate-200 bg-white/80 backdrop-blur-md px-6">
//             <SidebarTrigger className="text-slate-500 hover:bg-slate-100" />
//             <Separator orientation="vertical" className="h-6 bg-slate-200" />

//             <div className="flex items-center gap-2 text-sm font-medium">
//               <span className="text-slate-400">Dashboard</span>
//               <ChevronRight size={14} className="text-slate-300" />
//               <span className="text-slate-900 capitalize">{crumb}</span>
//             </div>

//             <div className="ml-auto flex items-center gap-4">
//               {/* Notification Bell */}
//               <button className="relative p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors">
//                 <Bell size={19} />
//                 <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-500 border-2 border-white" />
//               </button>

//               {/* User Profile Section */}
//               <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
//                 <div className="flex flex-col items-end hidden md:flex">
//                   <span className="text-xs font-bold text-slate-900 leading-tight">Admin User</span>
//                   <span className="text-[10px] text-emerald-600 font-medium">Super Admin</span>
//                 </div>
//                 <div className="w-9 h-9 rounded-xl bg-emerald-600 shadow-lg shadow-emerald-200 flex items-center justify-center text-white text-xs font-bold">
//                   AD
//                 </div>
//               </div>
//             </div>
//           </header>

//           {/* Page Content */}
//           <div className="p-8 max-w-[1600px] mx-auto w-full">
//             <Outlet />
//           </div>
//         </SidebarInset>
//       </SidebarProvider>
//     </TooltipProvider>
//   )
// }

// import { NavLink, Outlet, useLocation } from "react-router-dom"

// //assets
// import {
//   Sidebar, SidebarContent, SidebarFooter, SidebarGroup,
//   SidebarGroupLabel, SidebarHeader, SidebarInset, SidebarMenu,
//   SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarRail,
//   SidebarTrigger,
// } from "@/components/ui/sidebar"

// import { TooltipProvider } from "@/components/ui/tooltip"

// //icons
// import {
//   LayoutDashboard, Users, Briefcase, Bell, LogOut, ChevronRight, Settings,
// } from "lucide-react"

// //assets
// import logo from "@/assets/Lifewood-Logo.png"

// const NAV_MAIN = [
//   { label: "Overview",     to: "/admin",             icon: LayoutDashboard, end: true },
//   { label: "Applications", to: "/admin/applications", icon: Users },
//   { label: "Positions",    to: "/admin/positions",    icon: Briefcase },
// ]

// const NAV_BOTTOM = [
//   { label: "Settings",    to: "/admin/settings", icon: Settings },
//   { label: "Back to Site", to: "/",               icon: LogOut },
// ]

// export default function AdminLayout() {
//   const { pathname } = useLocation()

//   const crumb = pathname === "/admin"
//     ? "Overview"
//     : pathname.split("/admin/")[1]?.replace("-", " ") ?? ""

//   return (
//     <TooltipProvider>
//       <SidebarProvider>
//         <Sidebar
//           collapsible="icon"
//           className="border-r border-slate-200 bg-white"
//         >
//           {/* Header Area - Updated to include the Trigger */}
//           <SidebarHeader className="h-16 flex-row items-center justify-between border-b border-slate-100 px-4 transition-all duration-200 group-data-[state=collapsed]:px-0 group-data-[state=collapsed]:justify-center">
//             <div className="flex items-center gap-3 overflow-hidden group-data-[state=collapsed]:hidden">
//               <img src={logo} alt="Lifewood" className="h-8 w-auto shrink-0" />
//             </div>

//             <SidebarTrigger className="text-slate-500 hover:bg-slate-100 shrink-0" />
//           </SidebarHeader>

//           <SidebarContent className="px-3 py-4">
//             <SidebarGroup>
//               <SidebarGroupLabel className="text-slate-400 text-[11px] font-semibold uppercase px-3 mb-2">
//                 Menu
//               </SidebarGroupLabel>
//               <SidebarMenu className="gap-1">
//                 {NAV_MAIN.map(({ label, to, icon: Icon, end }) => {
//                   const active = end ? pathname === to : pathname.startsWith(to)
//                   return (
//                     <SidebarMenuItem key={to}>
//                       <SidebarMenuButton
//                         asChild
//                         isActive={active}
//                         tooltip={label}
//                         size="lg"
//                         className={`transition-all duration-200 px-3 ${
//                           active
//                             ? "bg-emerald-50 text-emerald-700 font-semibold shadow-sm shadow-emerald-100/50"
//                             : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
//                         }`}
//                       >
//                         <NavLink to={to} end={end} className="flex items-center gap-3">
//                           <Icon size={18} className={active ? "text-emerald-600" : "text-slate-400"} />
//                           <span className="text-[14px]">{label}</span>
//                         </NavLink>
//                       </SidebarMenuButton>
//                     </SidebarMenuItem>
//                   )
//                 })}
//               </SidebarMenu>
//             </SidebarGroup>
//           </SidebarContent>

//           <SidebarFooter className="p-4 border-t border-slate-100">
//             <SidebarMenu className="gap-1">
//               {NAV_BOTTOM.map(({ label, to, icon: Icon }) => (
//                 <SidebarMenuItem key={to}>
//                   <SidebarMenuButton
//                     asChild
//                     tooltip={label}
//                     className="text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors px-3"
//                   >
//                     <NavLink to={to}>
//                       <Icon size={18} />
//                       <span className="text-[14px]">{label}</span>
//                     </NavLink>
//                   </SidebarMenuButton>
//                 </SidebarMenuItem>
//               ))}
//             </SidebarMenu>
//           </SidebarFooter>
//           <SidebarRail />
//         </Sidebar>

//         <SidebarInset className="bg-slate-50/50">
//           {/* Top Bar - Trigger removed from here */}
//           <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-slate-200 bg-white/80 backdrop-blur-md px-6">
//             <div className="flex items-center gap-2 text-sm font-medium">
//               <span className="text-slate-400">Dashboard</span>
//               <ChevronRight size={14} className="text-slate-300" />
//               <span className="text-slate-900 capitalize">{crumb}</span>
//             </div>

//             <div className="ml-auto flex items-center gap-4">
//               <button className="relative p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors">
//                 <Bell size={19} />
//                 <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-500 border-2 border-white" />
//               </button>

//               <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
//                 <div className="flex flex-col items-end hidden md:flex">
//                   <span className="text-xs font-bold text-slate-900 leading-tight">Admin User</span>
//                   <span className="text-[10px] text-emerald-600 font-medium">Super Admin</span>
//                 </div>
//                 <div className="w-9 h-9 rounded-xl bg-emerald-600 shadow-lg shadow-emerald-200 flex items-center justify-center text-white text-xs font-bold">
//                   AD
//                 </div>
//               </div>
//             </div>
//           </header>

//           <div className="p-8 max-w-[1600px] mx-auto w-full">
//             <Outlet />
//           </div>
//         </SidebarInset>
//       </SidebarProvider>
//     </TooltipProvider>
//   )
// }

import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

import {
  LayoutDashboard,
  Users,
  Briefcase,
  LogOut,
  ChevronRight,
  Settings,
} from "lucide-react";

import { supabase } from "@/supabaseClient";

import logo from "@/assets/Lifewood-LogoV2.png";

const NAV_MAIN = [
  { label: "Overview",     to: "/admin",              icon: LayoutDashboard, end: true },
  { label: "Applications", to: "/admin/applications", icon: Users },
  { label: "Positions",    to: "/admin/positions",    icon: Briefcase },
];

const NAV_BOTTOM = [
  { label: "Settings", to: "/admin/settings", icon: Settings },
];

function SidebarNav() {
  const { pathname } = useLocation();
  const { state } = useSidebar();
  const navigate = useNavigate();
  const collapsed = state === "collapsed";

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/", { replace: true });
  };

  return (
    <>
      {/* Header */}
      <SidebarHeader
        className={cn(
          "flex flex-row items-center border-b border-white/5 bg-[#022c1d] transition-all duration-200",
          collapsed ? "h-16 justify-center px-0" : "h-20 justify-between px-5",
        )}
      >
        {!collapsed && (
          <div className="flex items-center gap-3 overflow-hidden">
            <img src={logo} alt="Lifewood" className="h-8 w-auto shrink-0" />
          </div>
        )}
        <SidebarTrigger
          className={cn(
            "text-white/40 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200",
            collapsed && "mx-auto",
          )}
        />
      </SidebarHeader>

      {/* Main Nav */}
      <SidebarContent className="bg-[#022c1d] px-0 py-6">
        <SidebarGroup className="p-0">
          {!collapsed && (
            <SidebarGroupLabel className="text-white/20 text-[9px] font-black uppercase tracking-[0.25em] px-6 mb-3">
              Management
            </SidebarGroupLabel>
          )}
          <SidebarMenu className="gap-0.5">
            {NAV_MAIN.map(({ label, to, icon: Icon, end }) => {
              const active = end ? pathname === to : pathname.startsWith(to);
              return (
                <SidebarMenuItem key={to}>
                  <SidebarMenuButton
                    asChild
                    isActive={active}
                    tooltip={collapsed ? label : undefined}
                    size="lg"
                    className={cn(
                      "relative rounded-none h-12 transition-all duration-200 bg-transparent! border-none",
                      collapsed ? "justify-center px-0 w-full" : "px-6",
                      active
                        ? "text-[#FFB347]"
                        : "text-white/50 hover:text-white hover:bg-white/5",
                    )}
                  >
                    <NavLink
                      to={to}
                      end={end}
                      className={cn(
                        "flex items-center w-full",
                        collapsed ? "justify-center" : "gap-4",
                      )}
                    >
                      {/* Active left bar — only in expanded */}
                      {active && !collapsed && (
                        <span className="absolute left-0 w-0.75 h-5 bg-[#FFB347] rounded-r-full" />
                      )}
                      {/* Active dot — only in collapsed */}
                      {active && collapsed && (
                        <span className="absolute right-1.5 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-[#FFB347]" />
                      )}
                      <Icon
                        size={collapsed ? 20 : 18}
                        strokeWidth={active ? 2.5 : 2}
                        className={
                          active
                            ? "drop-shadow-[0_0_6px_rgba(255,179,71,0.5)]"
                            : ""
                        }
                      />
                      {!collapsed && (
                        <span
                          className={cn(
                            "text-[13px] tracking-wide",
                            active ? "font-bold" : "font-medium",
                          )}
                        >
                          {label}
                        </span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="p-0 bg-[#011f15] border-t border-white/5">
        <SidebarMenu className="gap-0">
          {NAV_BOTTOM.map(({ label, to, icon: Icon }) => (
            <SidebarMenuItem key={to}>
              <SidebarMenuButton
                asChild
                tooltip={collapsed ? label : undefined}
                size="lg"
                className={cn(
                  "rounded-none h-12 bg-transparent! transition-all duration-200",
                  collapsed ? "justify-center px-0 w-full" : "px-6",
                  "text-white/30 hover:bg-white/5 hover:text-white/60",
                )}
              >
                <NavLink
                  to={to}
                  className={cn(
                    "flex items-center w-full",
                    collapsed ? "justify-center" : "gap-3",
                  )}
                >
                  <Icon size={17} />
                  {!collapsed && (
                    <span className="text-[11px] font-bold uppercase tracking-widest">
                      {label}
                    </span>
                  )}
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}

          {/* Logout */}
          <SidebarMenuItem>
            <button
              onClick={handleLogout}
              className={cn(
                "flex items-center w-full h-12 rounded-none transition-all duration-200 cursor-pointer text-white/30 hover:bg-red-500/10 hover:text-red-400",
                collapsed ? "justify-center px-0" : "gap-3 px-6",
              )}
            >
              <LogOut size={17} />
              {!collapsed && (
                <span className="text-[11px] font-bold uppercase tracking-widest">
                  Logout
                </span>
              )}
            </button>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}

export default function AdminLayout() {
  const { pathname } = useLocation();

  const crumb =
    pathname === "/admin"
      ? "Overview"
      : (pathname.split("/admin/")[1]?.replace("-", " ") ?? "");

  return (
    <TooltipProvider>
      <SidebarProvider>
        <Sidebar
          collapsible="icon"
          className="border-none bg-[#022c1d] text-white"
        >
          <SidebarNav />
        </Sidebar>

        <SidebarInset className="bg-[#F8FAF9]">
          <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-slate-100 bg-white/90 backdrop-blur-md px-8">
            <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-emerald-900/30">
              <span>Admin</span>
              <ChevronRight size={10} strokeWidth={3} />
              <span className="text-[#046241] capitalize">{crumb}</span>
            </nav>

            <div className="ml-auto flex items-center gap-4 pl-6 border-l border-gray-100">
              <div className="flex flex-col items-end">
                <span className="text-sm font-bold text-[#034E34]">Administrator</span>
                <span className="text-[9px] text-emerald-600 font-bold uppercase tracking-wider">Online</span>
              </div>
              <div className="w-9 h-9 rounded-xl bg-[#034E34] flex items-center justify-center text-[#FFB347] font-black shadow-md text-xs">
                AD
              </div>
            </div>
          </header>

          <main className="p-8">
            <div className="max-w-6xl mx-auto">
              <Outlet />
            </div>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}