 export interface myTeamProps {
     id: number
     profilePics: string
     name: string;
     email: string,
     lastMessage: string
   }

   export interface CategoryType {
    value: string;
    label: string;
   }
 
   export const priorityColors = {
    Urgent: {
      text: "text-red-600",
      bg: "bg-red-100",
      hex: "#ef4444",
    },
    Normal: {
      text: "text-orange-600",
      bg: "bg-orange-100",
      hex: "#f97316",
    },
    Low: {
      text: "text-yellow-600",
      bg: "bg-yellow-100",
      hex: "#eab308",
    },
    ToDo: {
      text: "text-gray-600",
      bg: "bg-gray-100",
      hex: "#6b7280",
    },
    InProgress: {
      text: "text-blue-600",
      bg: "bg-blue-100",
      hex: "#3b82f6",
    },
    Completed: {
      text: "text-green-600",
      bg: "bg-green-100",
      hex: "#22c55e",
    },
  };
  
  export const Category: CategoryType[] = [
      { value: "DESIGN", label: "Design" },
      { value: "DEVELOPMENT", label: "Development" },
      { value: "MARKETING", label: "Marketing" },
      { value: "PRODUCT", label: "Product" },
      { value: "SALES", label: "Sales" },
      { value: "SUPPORT", label: "Support" },
    ];