

// import { getUserSession } from "@/lib/core/session";
"use client";
import { useSession } from "@/lib/auth-client";
import { LayoutSideContentLeft, Bell, Briefcase, Envelope, Gear, House, Magnifier, Person, Bookmark, FileText, CreditCard } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import { Building, Train, Users } from "lucide-react";
import Link from "next/link";

export function DashboardSidebar() {

    const { data: session, isPending } = useSession();
    const user = session?.user;

    // const user = await getUserSession();



    const trainerNavLinks = [
        { icon: House, href: "/dashboard/trainer", label: "Overview" },
        { icon: Magnifier, href: "/dashboard/trainer/add-class", label: "Add Class" },
        { icon: Bell, href: "/dashboard/trainer/my-classes", label: "My Classes" },
        { icon: Briefcase, href: "/dashboard/trainer/add-forum-post", label: "Add Forum Post" },
        { icon: Briefcase, href: "/dashboard/trainer/my-forum-posts", label: "My Forum Posts" },
    ]

    const userNavLinks = [
        { icon: House, href: "/dashboard/user", label: "Overview" },
        { icon: Bookmark, href: "/dashboard/user/booked-classes", label: "Booked Classes" },
        { icon: FileText, href: "/dashboard/user/Favorites", label: "Favorites" },
        { icon: CreditCard, href: "/dashboard/user/apply-as-trainer", label: "Apply as Trainer" },
    ];

    const adminNavLinks = [
        { icon: House, href: "/dashboard/admin", label: "Dashboard" },
        { icon: Users, href: "/dashboard/admin/users", label: "Users" },
        { icon: Building, href: "/dashboard/admin/companies", label: "Companies" },
        { icon: Briefcase, href: "/dashboard/admin/jobs", label: "Jobs" },
        { icon: CreditCard, href: "/dashboard/admin/payments", label: "Payments" },
        { icon: Gear, href: "/dashboard/admin/settings", label: "Settings" },
    ];

    const navLinksMap = {
        user: userNavLinks,
        trainer: trainerNavLinks,
        admin: adminNavLinks
    }

    const navItems = navLinksMap[user?.role || 'user'];


    const navContent = <nav className="flex flex-col gap-1">
        {navItems.map((item) => (
            <Link
                key={item.label}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
                href={item.href}
            >
                <item.icon className="size-5 text-muted" />
                {item.label}
            </Link>
        ))}
    </nav>

    return (
        <div className="min-h-screen">
            <aside className="hidden w-64 shrink-0 border-r border-default p-4 lg:block">
                {navContent}
            </aside>
            <Drawer>
                <Button className="lg:hidden" variant="secondary">
                    <LayoutSideContentLeft />
                    Sidebar
                </Button>
                <Drawer.Backdrop>
                    <Drawer.Content placement="left">
                        <Drawer.Dialog>
                            <Drawer.CloseTrigger />
                            <Drawer.Header>
                                <Drawer.Heading>Navigation</Drawer.Heading>
                            </Drawer.Header>
                            <Drawer.Body>
                                {navContent}
                            </Drawer.Body>
                        </Drawer.Dialog>
                    </Drawer.Content>
                </Drawer.Backdrop>
            </Drawer>
        </div>
    );
}
