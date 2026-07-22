
const Message = () => {
  return (
    <div className="text-purple-500 w-full flex justify-center h-full">
       <div className="w-full px-2 max-w-6xl">
       <div className="max-w-72 top-16 h-[calc(100vh-4rem)] bg-white-100 flex flex-col px-2 pt-4 pb-2 gap-4 sticky  border-l-2 border-gray-200">
          {/* w-72 h-screen bg-white flex flex-col px-2 py-4 gap-2 sticky top-0 border-l border-gray-200 */}
              <div className="flex items-center justify-between">
                <p className="text-[1.2rem] leading-tight font-semibold">Today Schedule's</p>
                <Calendar className="size-5 text-gray-500" strokeWidth={1.5}/>
              </div>

              <div className="flex items-center justify-between text-blue-500 mt-2">
                  <p className="text-xs leading-tight font-medium">10+ Member's active</p>
                  <Button className="flex items-center text-blue-500" variant={'ghost'}>
                      <Plus className="size-4 cursor-pointer" strokeWidth={1.5}/>
                      <p className="text-xs leading-tight font-medium">Invite</p>
                  </Button>
              </div>
                <p className="text-[1.2rem] leading-tight font-medium">Project Discovery</p>
                 
                <div className="w-full mt-2 bg-primary h-11 rounded-md flex justify-between items-center p-2 shadow-sm">
                     <div className="flex items-center -space-x-2 z-10"> 
                {myTeam.slice(0, 3).map((team: myTeamProps) => (
                  <div key={team.id} className="relative">
                    <div className="w-8 h-8 overflow-hidden rounded-full shadow-sm"> 
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

                <div className="w-8 h-8 overflow-hidden rounded-full shadow-sm flex items-center justify-center z-20 ring ring-white-100 cursor-pointer bg-primary">
                  <UserPlus className="size-5 text-white-100"/>
                </div>
              </div>

                     <p className="text-sm leading-tight font-medium text-white-100 text-center">1:30</p>
                      <EllipsisVertical
                       className="size-5 text-white-100"/>
                </div>
                
                 <div className="w-full flex flex-col mt-2">
                   <p className="text-[1.2rem] leading-tight font-medium mb-2">Messages</p>

                   <div className="flex flex-col w-full pt-2 border-t-2 border-gray-100">
                     <div className="w-full flex flex-col gap-3 rounded-md cursor-pointer">
                     {myTeam.map((team: myTeamProps) => (
                        <div className="flex gap-3 items-center hover:bg-background rounded-md px-2 py-1" key={team.id}>
                          <div className="w-12 h-12 overflow-hidden rounded-full">
                              <Image
                              src={getAvatar(null, team.email)}
                              width={62}
                              height={62}
                              alt={team.name}
                              className="object-contain ring-2 ring-gray-400 shadow-sm rounded-full"
                              />
                            </div>

                          <div className="flex flex-col gap-y-2">
                  <p className="text-sm leading-tight font-semibold">{team.name}</p>
                  <p className="text-xs leading-tight font-medium text-gray-400 truncate">{team.lastMessage}</p>
                          </div>
                        </div>
                     ))}
                     </div>
                   </div>
                 </div>
        </div>
       </div>
    </div>
  )
}

export default Message


 