"use client";

import Image from "next/image";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Search, Plus, Eye } from "lucide-react";
import Link from "next/link";
import { formatDate, getAvatar, formatUsername} from "@/lib/utils";
import { EmptyOutline } from "./NotFound";
import { Suspense } from "react";
import ContactsSkeleton from "@/app/(dashboard)/workspace/[workspaceId]/contacts/components/ContactsSkeleton";

const statusStyles: Record<string, string> = {
  ACTIVE:
    "bg-green-100 text-green-700",
  Lead:
    "bg-blue-100 text-blue-700",
  Prospect:
    "bg-orange-100 text-orange-700",
  Inactive:
    "bg-gray-100 text-gray-600",
};

export function ContactTable({workspaceId, data}: {workspaceId: string, data: any}) {


  return (
    <section className="rounded-md borde bg-white ">
      {/* Header */}

      <div className="flex flex-col gap-4 border-b p-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Contacts
          </h2>

          <p className="mt-1 text-sm text-gray-500 font-semibold">
            Manage contacts and keep track of every conversation.
          </p>
        </div>

        <div className="flex gap-3 items-center">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />

            <Input
              placeholder="Search contacts..."
              className="pl-10 w-80 border-gray-200 h-9"
            />
          </div>

            <Link href={`/workspace/${workspaceId}/contacts/create`}>
          <button
            className="flex items-center gap-2 rounded-md shadow-sm cursor-pointer px-3 py-1.5 text-white transition hover:opacity-90"
            style={{
              background: "#7850CD",
            }}
            >
            <Plus size={18} />
            New Contact
          </button>
            </Link>
        </div>
      </div>

      {/* Table */}
     
      <Suspense fallback={<ContactsSkeleton/>}>
      
      <ContactsSkeleton/>
      </Suspense>
    </section>
  );
}