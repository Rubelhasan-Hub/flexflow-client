

// import { getUserSession } from "@/lib/core/session";
"use client";
import { useSession } from "@/lib/auth-client";
import { LayoutSideContentLeft, PersonPlus, Briefcase, CirclePlusFill, Gear, House, Bookmark, StarFill, CreditCard, File, MapPin, ChevronsExpandToLines, ChartTreemap } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import { Building } from "lucide-react";
import Link from "next/link";

export function DashboardSidebar() {

    const { data: session, isPending } = useSession();
    const user = session?.user;

    // const user = await getUserSession();



    const trainerNavLinks = [
        { icon: House, href: "/dashboard/trainer", label: "Overview" },
        { icon: CirclePlusFill, href: "/dashboard/trainer/add-class", label: "Add Class" },
        { icon: PersonPlus, href: "/dashboard/trainer/my-classes", label: "My Classes" },
        { icon: CirclePlusFill, href: "/dashboard/trainer/add-forum-post", label: "Add Forum Post" },
        { icon: File, href: "/dashboard/trainer/my-forum-posts", label: "My Forum Posts" },
    ]

    const userNavLinks = [
        { icon: House, href: "/dashboard/user", label: "Overview" },
        { icon: Bookmark, href: "/dashboard/user/booked-classes", label: "Booked Classes" },
        { icon: StarFill, href: "/dashboard/user/favorites", label: "Favorites" },
        { icon: MapPin, href: "/dashboard/user/apply-as-trainer", label: "Apply as Trainer" },
    ];

    const adminNavLinks = [
        { icon: House, href: "/dashboard/admin", label: "Overview" },
        { icon: ChevronsExpandToLines, href: "/dashboard/admin/manage-users", label: "Manage Users" },
        { icon: Building, href: "/dashboard/admin/applied-trainers", label: "Applied Trainers" },
        { icon: Briefcase, href: "/dashboard/admin/manage-trainers", label: "Manage Trainers" },
        { icon: CreditCard, href: "/dashboard/admin/manage-classes", label: "Manage Classes" },
        { icon: PersonPlus, href: "/dashboard/admin/add-forum-post", label: "Add Forum Post" },
        { icon: ChartTreemap, href: "/dashboard/admin/transactions", label: "Transactions " },
        { icon: Gear, href: "/dashboard/admin/forum-post-manage", label: "Forum Post Manage " },
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
        <div className="lg:min-h-screen">
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
