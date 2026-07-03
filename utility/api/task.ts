'use server'
import { cookies } from "next/headers"
import { createTaskSchemaType, updateTaskSchemaType } from "../validation/task"
import { TaskProps } from "@/app/(dashboard)/workspace/[workspaceId]/task/[taskId]/page"

export async function createTaskApi(formData: createTaskSchemaType, priority: string, workspaceId: string, collaboratorIds: string[], imageUrl: string) {
   const cookieStore = await cookies()
   
   const accessToken = cookieStore.get('accessToken')?.value

   const {title, description, endDate, category} = formData

   if (!accessToken) {
      throw new Error('Invalid login response: tokens missing')
    }

    try {
        
      const res = await fetch('http://localhost:3000/tasks', {
       method: 'POST',
       headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
       },
       body: JSON.stringify({title, description, endDate, category, workspaceId, priority, collaboratorIds, imageUrl}),
      }) 
      
      const data = await res.json()

      if(!res.ok) {
        throw new Error(data?.message || 'Failed to fetch workspace')
      }

      return data
    } catch (error) {
        console.error("Create Workspace error:", error);
        throw error;
    }
}

export async function updateTaskApi(formData: updateTaskSchemaType, taskId: string, workspaceId: string, priority?: string,  collaboratorIds?: string[], imageUrl?: string) {
  const cookieStore = await cookies()
  
  const accessToken = cookieStore.get('accessToken')?.value

  const {title, description, endDate, category} = formData

  if (!accessToken) {
     throw new Error('Invalid login response: tokens missing')
   }

   try {
       
     const res = await fetch(`http://localhost:3000/tasks/${workspaceId}/task/${taskId}`, {
      method: 'PATCH',
      headers: {
       "Content-Type": "application/json",
       "Authorization": `Bearer ${accessToken}`
      },
      body: JSON.stringify({title, description, endDate, category, priority, collaboratorIds, imageUrl}),
     }) 
     
     const data = await res.json()

     if(!res.ok) {
       throw new Error(data?.message || 'Failed to fetch workspace')
     }

     return data
   } catch (error) {
       console.error("Create Workspace error:", error);
       throw error;
   }
}



export async function getWorkspaceTasksApi(workspaceId: string, priority?: string) {
   const cookieStore = await cookies()
   
   const accessToken = cookieStore.get('accessToken')?.value

   const params = new URLSearchParams();

    if (priority) {
      params.append("priority", priority);
    }

    const url = `http://localhost:3000/tasks/${workspaceId}${
      params.toString() ? `?${params.toString()}` : ""
    }`;

    try {
        
      const res = await fetch(url, { 
       method: 'GET',
       headers: {
        "Content-Type": "application/json",
        ...(accessToken
          ? { Authorization: `Bearer ${accessToken}` }
          : {}),
      },
      }) 
      
      const data = await res.json()

      if (!res.ok) {
        return {
          data: null,
          error: data?.message || "Failed to fetch workspace tasks",
        };
      }

     return {
      data,
      error: null,
    };

    } catch (error: any) {
       return {
      data: null,
      error: error?.message || "Network error, Failed to fetch task.",
    }
    }
}

export async function getWorkspaceTaskId(workspaceId: string, taskId: string) {
  const cookieStore = await cookies()
  
  const accessToken = cookieStore.get('accessToken')?.value

   try {
       
     const res = await fetch(`http://localhost:3000/tasks/${workspaceId}/task/${taskId}`, {
      method: 'GET',
      headers: {
       "Content-Type": "application/json",
       ...(accessToken
         ? { Authorization: `Bearer ${accessToken}` }
         : {}),
     },
     }) 
     
     const data = await res.json()

     if (!res.ok) {
       return {
         data: null,
         error: data?.message || "Failed to fetch workspace task details",
       };
     }

    return {
     data,
     error: null,
   };

   } catch (error: any) {
      return {
     data: null,
     error: error?.message || "Network error, Failed to fetch task.",
   }
   }
}

export async function deleteWorkspaceTask(workspaceId: string, taskId: string) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  try {
    const res = await fetch(`http://localhost:3000/tasks/${workspaceId}/task/${taskId}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
    });

    const hasContent = res.status !== 204 && res.headers.get("content-type")?.includes("application/json");
    const data = hasContent ? await res.json() : null;

    if (!res.ok) {
      return {
        data: null,
        error: data?.message || "Failed to delete task",
      };
    }

    return {
      data: data || { success: true },
      error: null,
    };

  } catch (error: any) {
    return {
      data: null,
      error: error?.message || "Network error, Failed to delete task.",
    };
  }
}







// Claim offer
// hello

// Hello! 👋 How can I help you today?


// Why is this not filtering Task if i am getting the category from the url and i am sending to my backend what is wrong @Get(':workspaceId')
//     @ResponseMessage('Task fetched successfully.')
//     async getWorkspaceTask(
//       @AuthUser() user: User,
//       @Param('workspaceId') workspaceId: string,
//       @Query() query: GetTaskQueryDto
//     ) {
//       return handle(
//         this.logger,
//         () => this.taskService.getTask(workspaceId, user.id, query),
//         'TaskController.getTask'
//       );
//     } async getTask(workspaceId: string, userId: string, query: GetTaskQueryDto) {

//         this.logger.log(fetching task list for ${workspaceId});

//         const member = await this.prisma.workspace.findFirst({
//           where: {
//             id: workspaceId,
//             members: {some: {userId: userId}}
//           },
//           include: {members: true}
//         });
        
//         if (!member) {
//           throw new NotFoundException('User is not a member of this workspace');
//         }
        
//         const where: Prisma.TaskWhereInput = {workspaceId}

//         if(query.priority) {
//           where.priority = query.priority
//         }

//         const tasks = await this.prisma.task.findMany({
//           where,
//           include: { collaborators: {include: {user: true}}},
//           orderBy: {updatedAt: 'desc'},
//         });
      
//         if (!tasks.length) {
//           throw new NotFoundException('No tasks found');
//         }
      
//         return tasks;
//       } const {priority} = await searchParams

//   const [{data, error}, member] = await Promise.all([
//     getWorkspaceTasksApi(workspaceId, priority), export async function getWorkspaceTasksApi(workspaceId: string, priority?: string) {
//    const cookieStore = await cookies()
   
//    const accessToken = cookieStore.get('accessToken')?.value

//     try {
        
//       const res = await fetch(http://localhost:3000/tasks/${workspaceId}?priority=${priority}, { 
//        method: 'GET',
//        headers: {
//         "Content-Type": "application/json",
//         ...(accessToken
//           ? { Authorization: Bearer ${accessToken} }
//           : {}),
//       },
//       })  even with this dto and placing the dto as optional i still get this error No tasks found
// priority must be one of the following values: URGENT, NORMAL, LOW, TODO, INPROGRESS, COMPLETED
//   import { Priority } from "@prisma/client";
// import { IsEnum, IsOptional } from "class-validator";

// export class GetTaskQueryDto {
//     @IsOptional()
//     @IsEnum(Priority)
//     priority? : Priority
// }

// The DTO itself looks fine. The error message points to one of a few common issues.

// 1. You're sending "undefined" as the query value (most likely)
// This line is suspicious:

// const res = await fetch(
//   `http://localhost:3000/tasks/${workspaceId}?priority=${priority}`,
// )
// If priority is undefined, the URL becomes

// /tasks/123?priority=undefined
// Nest receives

// query.priority === "undefined"
// not

// undefined
// Since "undefined" is a string, @IsOptional() does not ignore it, and @IsEnum() throws

// priority must be one of the following values...
// Fix
// Only include the parameter if it exists.

// const params = new URLSearchParams();

// if (priority) {
//   params.append("priority", priority);
// }

// const res = await fetch(
//   `http://localhost:3000/tasks/${workspaceId}?${params.toString()}`
// );
// or

// const url = new URL(`http://localhost:3000/tasks/${workspaceId}`);

// if (priority) {
//   url.searchParams.set("priority", priority);
// }

// await fetch(url);
// 2. Verify what is actually arriving in Nest
// Log it.

// async getWorkspaceTask(
//   @Query() query: GetTaskQueryDto,
// ) {
//   console.log(query);
// }
// If you see

// { priority: 'undefined' }
// that's your problem.

// If you see

// { priority: 'normal' }
// then that's another issue.

// 3. Prisma enums are case-sensitive
// Your enum values are

// enum Priority {
//   URGENT
//   NORMAL
//   LOW
//   TODO
//   INPROGRESS
//   COMPLETED
// }
// So this works

// ?priority=NORMAL
// This does not

// ?priority=normal
// or

// ?priority=Normal
// Check what is in your URL.

// 4. If validation passes but you get "No tasks found"
// Then your query becomes

// where = {
//   workspaceId,
//   priority: query.priority
// }
// If there are no tasks with that exact priority, then

// findMany()
// returns [], causing

// throw new NotFoundException('No tasks found');
// Log it:

// console.log(query.priority);

// const where: Prisma.TaskWhereInput = { workspaceId };

// if (query.priority) {
//   where.priority = query.priority;
// }

// console.log(where);
// 5. Check your frontend value
// You wrote

// const { priority } = await searchParams;
// Make sure priority is actually one of

// URGENT
// NORMAL
// LOW
// TODO
// INPROGRESS
// COMPLETED
// not

// urgent
// normal
// low
// I suspect the issue is #1
// Can you show:

// the exact URL being requested (from your browser's Network tab), and

// the value of console.log(query) inside the Nest controller?

// Those two pieces will immediately identify whether you're sending "undefined" or an incorrectly cased enum value.



