"use client";

import Image from "next/image";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Search, Plus, Eye } from "lucide-react";
import Link from "next/link";
import { formatDate, getAvatar, formatUsername} from "@/lib/utils";
import { EmptyOutline } from "./NotFound";

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

      <div className="overflow-x-auto">
        {data?.data?.length ? 
        <table className="w-full">
          <thead className="bg-gray-50 rounded-sm">
            <tr className="text-xs uppercase tracking-wider text-gray-500">
              <th className="px-6 py-4">
                <Checkbox />
              </th>

              <th className="px-6 py-4 text-left">
                Contact
              </th>

              <th className="px-6 py-4 text-left">
                Source
              </th>

              <th className="px-6 py-4 text-left">
                Last Contact
              </th>

              <th className="px-6 py-4 text-left">
                Next Follow-up
              </th>

              <th className="px-6 py-4 text-right">
                Status
              </th>

              <th className="px-6 py-4 text-right">
               Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.data.map((contact: any) => (
              <tr
                className="border-t transition hover:bg-[#7850CD]/5"
                key={contact.id}
              >
                <td className="px-6 py-4">
                  <Checkbox />
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    
                     <div className="w-8 h-8 overflow-hidden rounded-full shadow-sm flex items-center justify-center border"> 
                                      {contact.contactUrl ? 
                                        <Image
                                        src={getAvatar('/images/user1.png', contact.email as string)}
                                        width={32}
                                        height={32}
                                        alt={contact.name}
                                        className="object-cover object-center size-8" 
                                      /> : 
                                    <p className="text-center">{formatUsername(contact.name)}</p> }
                                      
                                  </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {contact.name}
                      </h4>

                      <p className="text-sm text-gray-500">
                        {contact.email}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-5 text-sm text-gray-700">
                  {contact.source}
                </td>

                <td className="px-6 py-5 text-sm text-gray-500">
                  {formatDate(contact?.lastContact)}
                </td>

                <td className="px-6 py-5 text-sm text-gray-500">
                  {contact?.contactPreference[0]?.reminderCadence ?? '_ _ _'}
                </td>

                <td className="px-6 py-5 text-right">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyles[contact?.priority]}`}
                  >
                    {contact?.priority}
                  </span>
                </td>
                <td className="px-6 py-5 text-right flex items-center justify-center">
                  <Link
                    href={`/workspace/${workspaceId}/contacts/${contact.id}`}
                    className="text-primary font-medium flex items-center justify-between gap-1 sm:gap-0 leading-0"
                  >
                    <Eye className="size-4 text-gray-400"/>
                    {/* <p className="text-xs font-medium">View</p> */}
                  </Link>
                  </td>
              </tr>
            ))}
          </tbody>
        </table>
      : <EmptyOutline
      title="No contact found"
      description={"You don’t have any contact yet. Create your first contact to get started."}
      buttonText="Create Contact"
      navigateLink={`/workspace/${workspaceId}/contacts/create`}
      className="mt-2"
    /> }
      </div>
    </section>
  );
}