import { Button } from "@/components/ui/button"
import {ArrowDown, Download, EllipsisVertical, Eye, Folder, Link, Plus, Image as Media, Music, FilesIcon, FileStackIcon} from "lucide-react"
import { myTeam, myTeamProps } from "@/constants"
import { getAvatar } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import { ChartRadialText } from "@/components/shared/ChartRadialText"
import { ChartBarDefault } from "@/components/shared/ChartBarDefault"

const Files = () => {

   const LibaryItem = [
    {
      id: 1,
      name: 'Document',
      size: '10'
    },
    {
      id: 2,
      name: 'Images',
      size: '8'
    },
    {
      id: 3,
      name: 'Video',
      size: '5'
    },
    {
      id: 4,
      name: 'Image',
      size: '2'
    },
    {
      id: 5,
      name: 'PDF',
      size: '6'
    },
   ]

   const recentFile = [
    {
      id: 1,
      name: 'Proposal.docs',
      size: '6',
      date: 'Feb 21 2026'
    },
    {
      id: 2,
      name: 'Background.jpg',
      size: '6',
      date: 'Feb 21 2026'
    },
    {
      id: 3,
      name: 'Appex.md',
      size: '6',
      date: 'Feb 21 2026'
    },
    {
      id: 4,
      name: 'Illustration.pdf',
      size: '6',
      date: 'Feb 21 2026'
    }
   ]

  return (
    <div className="w-full flex gap-4 flex-1 min-h-0 ">
       <div className="w-full max-w-6xl px-8 py-4 flex flex-1 flex-col">

           <div className="flex items-center justify-between">
              <p className="text-2xl leading-tight font-bold text-primary">Files</p>

              <div className="flex gap-4 items-center">

                   <div className="flex items-center -space-x-2"> 
                {myTeam.slice(0, 3).map((team: myTeamProps) => (
                  <div key={team.id} className="relative">
                    <div className="w-8 h-8 overflow-hidden rounded-full ring-2 ring-white shadow-sm"> 
                      <Image
                        src={getAvatar(null, team.email)}
                        width={32}
                        height={32}
                        alt={team.name}
                        className="object-cover" 
                      />
                    </div>
                  </div>
                ))}

                <div className="w-8 h-8 overflow-hidden rounded-full ring-2 ring-white shadow-sm flex items-center justify-center bg-primary">
                  <Plus className="size-5 text-white-100"/>
                </div>
              </div>

              <Button variant="ghost" className="ring ring-gray-400 rounded-full">
                       <Link className="size-5 text-gray-500"/>
                       <p className="text-[1rem] leading-tight font-semibold text-primary">Upload</p>
                   </Button>
              </div>
           </div>

           <div className="">

            <div className="flex w-full h-fit flex-row gap-6 max-w-6xl">

           <Card className="rounded-lg border mt-8 p-5 flex flex-col max-w-3xl w-full ">
               <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">

                  <div className="flex items-center gap-2 shadow-sm border p-1 rounded-sm">
                    <Folder className="size-5 text-primary"/>
                     <ArrowDown className="size-4 text-gray-500"/>
                  </div>
                    <p className="text-sm leading-tight text-primary font-semibold">All Files</p>
                    </div>

                  <div className="flex items-center gap-2 p-1 rounded-sm">
                    <p className="text-sm leading-tight text-primary font-semibold">Show All</p>
                    <ArrowDown className="size-4 text-gray-500"/>
                  </div>
               </div>

               <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(180px,1fr))] mt-5">
                {LibaryItem.map((item) => (
                  <Card className="shadow ring-0 p-2 flex flex-col rounded-sm border" key={item.id}>
                     <div className="flex items-center justify-between">
                    <Folder className="size-5 text-primary"/>

                  <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded bg-primary flex items-center justify-center">
                       <Eye className="size-4 text-white-100 "/>
                      </div>

                      <div className="h-6 w-6 rounded bg-primary flex items-center justify-center">
                       <Download className="size-4 text-white-100"/>
                      </div>
                  </div>
                  </div>

                    <div className="flex flex-col gap-4 mt-5">
                          <p className="text-[1rem] font-semibold leading-tight text-gray-500">{item.name}</p>
                          <p className="text-xs font-semibold leading-tight text-gray-500">{item.size}mb</p>
                    </div>
                </Card>
                ))}
               </div>
           </Card>
            
            <Card className="flex flex-col p-4 max-w-xs w-full h-full mt-8 border">
            <Card className=" flex flex-row items-center p-0">
               < ChartRadialText />
                <div className="flex flex-col gap-3">
                  <p className="text-black font-semibold text-lg leading-tight">Avalable Storage</p>
                  <p className="text-muted-foreground font-medium text-sm leading-tight">500MB - 10GB</p>
                </div>
           </Card>
                 
                 {/* Media & Mb Begin */}
               <div className="flex flex-col mt-4 gap-5">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded bg-blue-500 flex items-center justify-center">
                       <Media className="size-4 text-white-100"/>
                      </div>
                            
                      <div className="flex flex-col w-full gap-1">
                        <div className="w-full flex items-center justify-between">
                      <p className="text-[1rem] leading-tight text-muted-foreground font-semibold">Media</p>
                      <p className="text-xs leading-tight text-muted-foreground font-semibold">12MB</p>
                        </div>
                          
                          <div className="flex items-center">
                       <span className="h-1 w-full bg-blue-500 rounded-l-full"></span>
                       <span className="h-1 w-full bg-secondary rounded-r-full"></span>
                        </div>
                      </div>
                      </div>

                      <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded bg-primary flex items-center justify-center">
                       <Folder className="size-4 text-white-100"/>
                      </div>
                            
                      <div className="flex flex-col w-full gap-1">
                        <div className="w-full flex items-center justify-between">
                      <p className="text-[1rem] leading-tight text-muted-foreground font-semibold">Document</p>
                      <p className="text-xs leading-tight text-muted-foreground font-semibold">50MB</p>
                        </div>
                          
                          <div className="flex items-center">
                       <span className="h-1 w-full bg-primary rounded-l-full"></span>
                       <span className="h-1 w-full bg-secondary rounded-r-full"></span>
                        </div>
                      </div>
                      </div>

                      <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded bg-red-500 flex items-center justify-center">
                       <Music className="size-4 text-white-100"/>
                      </div>
                            
                      <div className="flex flex-col w-full gap-1">
                        <div className="w-full flex items-center justify-between">
                      <p className="text-[1rem] leading-tight text-muted-foreground font-semibold">Audio</p>
                      <p className="text-xs leading-tight text-muted-foreground font-semibold">100MB</p>
                        </div>
                          
                          <div className="flex items-center">
                       <span className="h-1 w-full bg-red-500 rounded-l-full"></span>
                       <span className="h-1 w-full bg-secondary rounded-r-full"></span>
                        </div>
                      </div>
                      </div>

                      <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded bg-gray-500 flex items-center justify-center">
                       <FileStackIcon className="size-4 text-white-100"/>
                      </div>
                            
                      <div className="flex flex-col w-full gap-1">
                        <div className="w-full flex items-center justify-between">
                      <p className="text-[1rem] leading-tight text-gray-500 font-semibold">Other Files</p>
                      <p className="text-xs leading-tight text-muted-foreground font-semibold">12MB</p>
                        </div>
                          
                          <div className="flex items-center">
                       <span className="h-1 w-full bg-gray-500 rounded-l-full"></span>
                       <span className="h-1 w-full bg-secondary rounded-r-full"></span>
                        </div>
                      </div>
                      </div>

               </div>
               {/* Media & Mb End */}

            </Card>
           </div>

            <div className="flex w-full h-fit flex-row gap-6 max-w-6xl ">

           <Card className="rounded-lg mt-5 p-5 flex flex-col max-w-3xl w-full border">
               <div className="flex items-center justify-between">
                  <p className="text-xl leading-tight text-primary font-semibold">Recent Files</p>

                  <div className="flex items-center gap-2 p-1 rounded-sm">
                    <p className="text-sm leading-tight text-primary font-semibold">View All</p>
                    <ArrowDown className="size-4 text-gray-500"/>
                  </div>
               </div>

                  <div className="grid gap-x-4 gap-y-6 grid-cols-[repeat(auto-fill,minmax(110px,1fr))] mt-5 px-1">
                    <div className="flex items-center justify-start">
                    <p className="text-sm leading-tight font-medium text-gray-500">Name</p>
                    <ArrowDown className="size-4 text-gray-500"/>
                  </div>

                    <div className="flex items-center justify-center">
                    <p className="text-sm leading-tight font-medium text-gray-500">Size</p>
                    <ArrowDown className="size-4 text-gray-500"/>
                  </div>

                    <div className="flex items-center justify-end">
                    <p className="text-sm leading-tight font-medium text-gray-500">Last Modified</p>
                    <ArrowDown className="size-4 text-gray-500"/>
                  </div>
                    <div className="flex items-center justify-end">
                    <p className="text-sm leading-tight font-medium text-gray-500">Modifier</p>
                    <ArrowDown className="size-4 text-gray-500"/>
                  </div>
                  </div>

                 <div className="grid gap-x-4 gap-y-6 grid-cols-[repeat(auto-fill,minmax(110px,1fr))] mt-2">

                  {recentFile.map((recent) => (
                    <>
                     <div className="flex items-center justify-between p-1" key={recent.id}>
                      <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded bg-primary flex items-center justify-center">
                       <Eye className="size-4 text-white-100"/>
                      </div>
                    <p className="text-sm leading-tight text-primary font-semibold">{recent.name}</p>
                      </div>
                  </div>

                  <div className="flex items-center justify-center p-1">
                    <p className="text-sm leading-tight font-medium text-gray-500">{recent.size}mb</p>
                  </div>

                  <div className="flex items-center font-medium p-1">
                    <p className="text-sm leading-tight font-semibold text-gray-500">{recent.date}</p>
                  </div>

                   <div className="flex items-center justify-end -space-x-2 "> 
                {myTeam.slice(0, 3).map((team: myTeamProps) => (
                  <div key={team.id} className="relative">
                    <div className="w-7 h-7 overflow-hidden rounded-full ring-2 ring-white shadow-sm z-10"> 
                      <Image
                        src={getAvatar(null, team.email)}
                        width={32}
                        height={32}
                        alt={team.name}
                        className="object-cover" 
                        />
                    </div>
                  </div>
                ))}

                <div className="w-7 h-7 overflow-hidden rounded-full ring-2 ring-white shadow-sm flex items-center justify-center bg-primary text-white-100 z-40">
                  <Plus className="size-4 text-white-100 "/> <p className="text-xs">3</p>
                </div>
              </div>
               
               <div className="flex items-center justify-end">
              <EllipsisVertical className="size-4 text-gray-500"/>
               </div>
                    </>
                  ))}

                 </div>
           </Card>

           <Card className="max-w-xs w-full flex flex-col justify-center gap-4 mt-5 p-0 border">
                <ChartBarDefault />
           </Card>
                  </div>
                  </div>

                  </div>
              </div>
            )
          }

export default Files
