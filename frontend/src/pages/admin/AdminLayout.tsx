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

import { NavLink, Outlet, useLocation } from "react-router-dom";

//assets
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
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { TooltipProvider } from "@/components/ui/tooltip";

//icons
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Bell,
  LogOut,
  ChevronRight,
  Settings,
} from "lucide-react";

//assets
import logo from "@/assets/Lifewood-LogoV2.png";

const NAV_MAIN = [
  { label: "Overview", to: "/admin", icon: LayoutDashboard, end: true },
  { label: "Applications", to: "/admin/applications", icon: Users },
  { label: "Positions", to: "/admin/positions", icon: Briefcase },
];

const NAV_BOTTOM = [
  { label: "Settings", to: "/admin/settings", icon: Settings },
  { label: "Back to Site", to: "/", icon: LogOut },
];

export default function AdminLayout() {
  const { pathname } = useLocation();

  // Logic for generating the page title and breadcrumb
  const pathSegments = pathname.split("/").filter(Boolean);
  const crumb =
    pathname === "/admin"
      ? "Overview"
      : (pathname.split("/admin/")[1]?.replace("-", " ") ?? "");

  return (
    <TooltipProvider>
      <SidebarProvider>
        <Sidebar
          collapsible="icon"
          // Using a slightly deeper green for the main rail and removing the borders
          className="border-none bg-[#022c1d] text-white"
        >
          {/* Header background set to match for a seamless look */}
          <SidebarHeader className="h-24 flex-row items-center justify-between px-6 bg-[#022c1d]">
            <div className="flex items-center gap-3 overflow-hidden group-data-[state=collapsed]:hidden">
              <img
                src={logo}
                alt="Lifewood"
                className="h-9 w-auto shrink-0" // Removed brightness-0 invert
              />
            </div>
            <SidebarTrigger className="text-white/30 hover:bg-white/10 hover:text-white" />
          </SidebarHeader>

          <SidebarContent className="px-0 py-4 bg-[#022c1d]">
            <SidebarGroup>
              <SidebarGroupLabel className="text-white/20 text-[10px] font-black uppercase px-8 mb-4 tracking-[0.2em]">
                Main Management
              </SidebarGroupLabel>
              <SidebarMenu className="gap-1">
                {NAV_MAIN.map(({ label, to, icon: Icon, end }) => {
                  const active = end
                    ? pathname === to
                    : pathname.startsWith(to);
                  return (
                    <SidebarMenuItem key={to}>
                      <SidebarMenuButton
                        asChild
                        isActive={active}
                        tooltip={label}
                        size="lg"
                        // Changed from a "button block" to a "tab" style
                        className={`relative transition-all duration-200 rounded-none px-8 h-12 w-full border-none !bg-transparent ${
                          active
                            ? "text-[#FFB347]"
                            : "text-white/50 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        <NavLink
                          to={to}
                          end={end}
                          className="flex items-center gap-4 w-full"
                        >
                          {/* The Active Indicator Line */}
                          {active && (
                            <div className="absolute left-0 w-1 h-6 bg-[#FFB347] rounded-r-full" />
                          )}

                          <Icon
                            size={20}
                            strokeWidth={active ? 2.5 : 2}
                            className={
                              active
                                ? "drop-shadow-[0_0_8px_rgba(255,179,71,0.4)]"
                                : ""
                            }
                          />
                          <span
                            className={`text-[14px] tracking-wide ${active ? "font-bold" : "font-medium"}`}
                          >
                            {label}
                          </span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="p-0 bg-[#011f15]">
            <SidebarMenu className="gap-0">
              {NAV_BOTTOM.map(({ label, to, icon: Icon }) => (
                <SidebarMenuItem key={to}>
                  <SidebarMenuButton
                    asChild
                    tooltip={label}
                    className="text-white/30 hover:bg-red-500/10 hover:text-red-400 transition-all rounded-none px-8 h-14 !bg-transparent"
                  >
                    <NavLink to={to} className="flex items-center gap-3">
                      <Icon size={18} />
                      <span className="text-[11px] font-bold uppercase tracking-widest">
                        {label}
                      </span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>

        <SidebarInset className="bg-[#F8FAF9]">
          <header className="sticky top-0 z-20 flex h-20 items-center gap-4 border-b border-emerald-900/5 bg-white/80 backdrop-blur-md px-10">
            {/* Subtle Breadcrumbs */}
            <div className="flex flex-col gap-0.5">
              {/* Subtle Breadcrumbs */}
              <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-emerald-900/30">
                <span className="hover:text-emerald-900/60 cursor-default transition-colors">
                  Admin
                </span>
                <ChevronRight size={10} strokeWidth={3} />
                <span className="text-[#FFB347]">{crumb}</span>
              </nav>
            </div>

            <div className="ml-auto flex items-center gap-6">
              <div className="flex items-center gap-4 pl-6 border-l border-gray-100">
                <div className="flex flex-col items-end">
                  <span className="text-sm font-bold text-[#034E34]">
                    Administrator
                  </span>
                  <span className="text-[9px] text-emerald-600 font-bold uppercase tracking-wider">
                    Online
                  </span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-[#034E34] flex items-center justify-center text-[#FFB347] font-black shadow-md border border-white/10 text-xs">
                  AD
                </div>
              </div>
            </div>
          </header>

          <main className="p-10">
            <div className="max-w-6xl mx-auto">
              <Outlet />
            </div>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}