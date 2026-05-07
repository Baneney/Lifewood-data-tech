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
import { ThemeToggle } from "@/components/ui/ThemeToggle";

import logo from "@/assets/Lifewood-LogoV2.png";

const NAV_MAIN = [
  { label: "Overview",     to: "/admin",              icon: LayoutDashboard, end: true },
  { label: "Applications", to: "/admin/applications", icon: Users },
  { label: "Positions",    to: "/admin/positions",    icon: Briefcase },
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
          "flex flex-row items-center border-b border-white/5 transition-all duration-200",
          collapsed ? "h-16 justify-center px-0" : "h-20 justify-between px-5",
        )}
        style={{ backgroundColor: "var(--admin-sidebar)" }}
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
      <SidebarContent
        className="px-0 py-6"
        style={{ backgroundColor: "var(--admin-sidebar)" }}
      >
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
      <SidebarFooter
        className="p-0 border-t border-white/5"
        style={{ backgroundColor: "var(--admin-sidebar-foot)" }}
      >
        <SidebarMenu className="gap-0">
          {/* Logout */}
          <SidebarMenuItem>
            <button
              onClick={handleLogout}
              className={cn(
                "flex items-center w-full h-12 rounded-none transition-all duration-200 cursor-pointer text-white/30 hover:bg-red-500/10 hover:text-[#FFB347]",
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
          className="border-none text-white"
          style={{ backgroundColor: "var(--admin-sidebar)" }}
        >
          <SidebarNav />
        </Sidebar>

        <SidebarInset style={{ backgroundColor: "var(--admin-bg)" }}>
          <header
            className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b backdrop-blur-md px-8"
            style={{
              backgroundColor: "var(--admin-header-bg)",
              borderColor: "var(--admin-header-border)",
            }}
          >
            <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: "var(--admin-text-faint)" }}>
              <span>Admin</span>
              <ChevronRight size={10} strokeWidth={3} />
              <span className="text-[#046241] capitalize">{crumb}</span>
            </nav>

            <div className="ml-auto flex items-center gap-4">
              <ThemeToggle />
              <div className="flex items-center gap-3 pl-4 border-l" style={{ borderColor: "var(--admin-border-soft)" }}>
                <div className="flex flex-col items-end">
                  <span className="text-sm font-bold" style={{ color: "var(--admin-text)" }}>Administrator</span>
                  <span className="text-[9px] text-emerald-500 font-bold uppercase tracking-wider">Online</span>
                </div>
                <div className="w-9 h-9 rounded-xl bg-[#034E34] flex items-center justify-center text-[#FFB347] font-black shadow-md text-xs">
                  AD
                </div>
              </div>
            </div>
          </header>

          <main className="p-8">
            <Outlet />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}