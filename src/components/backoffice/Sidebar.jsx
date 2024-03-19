"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/logo.jpg";
import {
  ChevronRight,
  ExternalLink,
  LayoutGrid,
  LogOut,
  Settings,
  Slack,
  Truck,
  User,
  Building2,
  UserSquare2,
  Users,
  Warehouse,
  Boxes,
  LayoutList, 
  ScanSearch,
  MonitorPlay,
  ChevronDown,
  CircleDollarSign,
  HeartHandshake,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { signOut, useSession } from "next-auth/react";


export default function Sidebar({ showSidebar, setShowSidebar }) {
  const [openMenu, setOpenMenu] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const role = session?.user?.role;

  if (status === "loading") {
    return <p>Loading...</p>;
  }
  // const role = session?.user?.role;
  // const pathname = usePathname();

  let sidebarLinks = [
    {
      title: "Customers",
      icon: Users,
      href: "/dashboard/customers",
    },
    {
      title: "Markets",
      icon: Warehouse,
      href: "/dashboard/markets",
    },
    {
      title: "Farmers",
      icon: UserSquare2,
      href: "/dashboard/farmers",
    },
    {
      title: "Orders",
      icon: Truck,
      href: "/dashboard/orders",
    },
    {
      title: "Sales",
      icon: Truck,
      href: "/dashboard/sales",
    },
    {
      title: "Our Staff",
      icon: User,
      href: "/dashboard/staff",
    },
    {
      title: "Hygienic Community Trainings",
      icon: Building2,
      href: "/dashboard/community",
    },
    {
      title: "Wallet",
      icon: CircleDollarSign,
      href: "/dashboard/wallet",
    },
    {
      title: "Settings",
      icon: Settings,
      href: "/dashboard/settings",
    },
    {
      title: "Online Store",
      icon: ExternalLink,
      href: "/",
    },
  ];
  let catalogueLinks = [
    {
      title: "Products",
      icon: Boxes,
      href: "/dashboard/products",
    },
    {
      title: "Categories",
      icon: LayoutList,
      href: "/dashboard/categories",
    },
    {
      title: "Coupons",
      icon: ScanSearch,
      href: "/dashboard/coupons",
    },
    {
      title: "Store Banners",
      icon: MonitorPlay,
      href: "/dashboard/banners",
    },
  ];
  
  if (role === "FARMER") {
    sidebarLinks = [
      {
        title: "Customers",
        icon: Users,
        href: "/dashboard/customers",
      },
      {
        title: "Markets",
        icon: Warehouse,
        href: "/dashboard/markets",
      },
      {
        title: "Orders",
        icon: Truck,
        href: "/dashboard/orders",
      },
      {
        title: "Sales",
        icon: Truck,
        href: "/dashboard/sales",
      },
      {
        title: "Hygienic Community Trainings",
        icon: Building2,
        href: "/dashboard/community",
      },
      {
        title: "Wallet",
        icon: CircleDollarSign,
        href: "/dashboard/wallet",
      },
      {
        title: "Farmer Support",
        icon: HeartHandshake,
        href: "/dashboard/settings",
      },
      {
        title: "Settings",
        icon: LayoutGrid,
        href: "/dashboard/settings",
      },
      {
        title: "Online Store",
        icon: ExternalLink,
        href: "/",
      },
    ];
  }
  if (role === "USER") {
    sidebarLinks = [
      {
        title: "My Orders",
        icon: Truck,
        href: "/dashboard/orders",
      },
      {
        title: "Profile",
        icon: Truck,
        href: "/dashboard/profile",
      },
      {
        title: "Online Store",
        icon: ExternalLink,
        href: "/",
      },
    ];
    catalogueLinks = [];
  }
  
  async function handleLogout(){
    await signOut()
    router.push("/")
  }

  return (
    <div
      className={
        showSidebar
          ? "sm:block mt-20 sm:mt-0 dark:bg-slate-800 bg-white space-y-6 w-60 h-screen text-slate-800 dark:text-slate-300 fixed left-0 top-0 shadow-md overflow-y-scroll"
          : "mt-20 sm:mt-0 hidden sm:block dark:bg-slate-800 bg-white space-y-6 w-60 h-screen text-slate-800 dark:text-slate-300 fixed left-0 top-0 shadow-md overflow-y-scroll"
      }
    >
      <Link
        onClick={() => setShowSidebar(false)}
        className="px-6 py-4"
        href="/dashboard"
      >
        <Image
          src={logo}
          alt="hygienicfood logo"
          className="w-24 rounded-full"
        />
      </Link>

      <div className="space-y-3 flex flex-col">
        <Link
          onClick={() => setShowSidebar(false)}
          href="/dashboard"
          className={
            pathname === "/dashboard"
              ? "flex items-center space-x-3 px-6 py-2 border-l-8 border-lime-500 text-lime-500"
              : "flex items-center space-x-3 px-6 py-2"
          }
        >
          <LayoutGrid />
          <span>Dashboard</span>
        </Link>
        {catalogueLinks.length > 0 && (
           <Collapsible className="px-6 py-2">
           <CollapsibleTrigger
             className=""
             onClick={() => setOpenMenu(!openMenu)}
           >
             <button className="flex items-center space-x-6 py-2">
               <div className="flex items-center space-x-3">
                 <Slack />
                 <span>Catalogue</span>
               </div>
               {openMenu ? <ChevronDown /> : <ChevronRight />}
             </button>
           </CollapsibleTrigger>
           
            <CollapsibleContent className="rounded-lg py-3 px-3 pl-6 dark:text-slate-300 dark:bg-slate-800 shadow">
               {catalogueLinks.map((item, i) => {
                 const Icon = item.icon;
                 return (
                   <Link
                     onClick={() => setShowSidebar(false)}
                     key={i}
                     href={item.href}
                     className={
                       pathname === item.href
                         ? "flex items-center space-x-3 py-1 text-sm text-lime-500"
                         : "flex items-center space-x-3 py-1"
                     }
                   >
                     <Icon className="w-4 h-4" />
                     <span>{item.title}</span>
                   </Link>
                 );
               })}
             </CollapsibleContent>
         </Collapsible>
           )}        

        {sidebarLinks.map((item, i) => {
          const Icon = item.icon;
          return (
            <Link
              onClick={() => setShowSidebar(false)}
              key={i}
              href={item.href}
              className={
                item.href == pathname
                  ? "flex items-center space-x-3 px-6 py-2 border-l-8 border-lime-500 text-lime-500"
                  : "flex items-center space-x-3 px-6 py-2"
              }
            >
              <Icon />
              <span>{item.title}</span>
            </Link>
          );
        })}
        <div className="px-6 py-2">
          <button onClick={handleLogout} className="bg-lime-600 rounded-full flex items-center space-x-3 px-6 py-2">
            <LogOut />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}
