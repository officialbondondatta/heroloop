"use client"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    LayoutDashboard,
    BriefcaseBusiness,
    Bookmark,
    FileText,
    Banknote,
    Settings,
    Users,
    Building2,
    HomeIcon,
} from "lucide-react"
import { useSession } from "@/lib/auth-client"

const menuItemsByRole = {
    seeker: [
        { name: "Home", url: "/", icon: HomeIcon },
        { name: "Dashboard", url: "/dashboard/seeker", icon: LayoutDashboard },
        { name: "Jobs", url: "/dashboard/seeker/jobs", icon: BriefcaseBusiness },
        { name: "Saved Jobs", url: "/dashboard/seeker/saved-jobs", icon: Bookmark },
        {
            name: "Applications",
            url: "/dashboard/seeker/applications",
            icon: FileText,
        },
        { name: "Billing", url: "/dashboard/seeker/billing", icon: Banknote },
        { name: "Settings", url: "/dashboard/seeker/settings", icon: Settings },
    ],
    recruiter: [
        { name: "Home", url: "/", icon: HomeIcon },
        { name: "Dashboard", url: "/dashboard/recruiter", icon: LayoutDashboard },
        {
            name: "Manage Jobs",
            url: "/dashboard/recruiter/jobs",
            icon: BriefcaseBusiness,
        },
        {
            name: "Applications",
            url: "/dashboard/recruiter/applications",
            icon: FileText,
        },
        { name: "Settings", url: "/dashboard/recruiter/settings", icon: Settings },
    ],
    admin: [
        { name: "Home", url: "/", icon: HomeIcon },
        { name: "Dashboard", url: "/dashboard/admin", icon: LayoutDashboard },
        { name: "Users", url: "/dashboard/admin/users", icon: Users },
        { name: "Companies", url: "/dashboard/admin/companies", icon: Building2 },
        { name: "Jobs", url: "/dashboard/admin/jobs", icon: BriefcaseBusiness },
        { name: "Payments", url: "/dashboard/admin/payments", icon: Banknote },
        { name: "Settings", url: "/dashboard/admin/settings", icon: Settings },
    ],
}

const DashboardSidebar = () => {
    const { data: session, isPending } = useSession()
    const role = session?.user?.role
    const pathname = usePathname()
    const menuItems =
        !isPending &&
            (role === "seeker" || role === "recruiter" || role === "admin")
            ? menuItemsByRole[role]
            : []
    return (
        <Sidebar>
            <SidebarHeader />
            <SidebarContent>
                <SidebarGroup />
                <SidebarGroup />
                <SidebarGroup>
                    <SidebarMenu>
                        {menuItems.map((item) => (
                            <SidebarMenuItem key={item.name}>
                                <SidebarMenuButton
                                    render={<Link href={item.url} />}
                                    isActive={pathname === item.url}
                                >
                                    <item.icon aria-hidden="true" />
                                    <span>{item.name}</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}

export default DashboardSidebar
