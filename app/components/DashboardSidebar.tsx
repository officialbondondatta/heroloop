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
import Image from "next/image"
import logo from "@/app/assets/images/logo.png"
import { usePathname, useRouter } from "next/navigation"
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
    PlusCircleIcon,
} from "lucide-react"
import { useSession } from "@/lib/auth-client"
import { useEffect } from "react";

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
            name: "Add Jobs",
            url: "/dashboard/recruiter/jobs/new",
            icon: PlusCircleIcon,
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
    const router = useRouter()
    useEffect(() => {
        if (!role && !isPending) {
            router.replace("/sign-in")
        }
    }, [isPending, role, router])
    const pathname = usePathname()
    const menuItems =
        !isPending &&
            (role === "seeker" || role === "recruiter" || role === "admin")
            ? menuItemsByRole[role]
            : []
    return (
        <Sidebar className="border-white/10 text-[#d4d4d8] [--sidebar:#111113] [--sidebar-foreground:#d4d4d8]">
            <SidebarHeader className="px-4 py-6">
                <Link href="/" aria-label="Hireloop home" className="w-fit rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8b80ff]">
                    <Image src={logo} alt="Hireloop" className="h-auto w-38.5" />
                </Link>
            </SidebarHeader>
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
                                    className="text-[#d4d4d8] hover:bg-[#6352ff]/10 hover:text-[#a79fff] data-active:bg-[#6352ff]/20 data-active:text-[#a79fff]"
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
