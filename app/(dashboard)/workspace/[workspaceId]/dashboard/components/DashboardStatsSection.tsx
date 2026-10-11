import DashboardStats from "@/components/shared/DashboardStats";
import { getDashboardStatApi } from "@/utility/api/dashboard";
import {
    Star,
    FilePlus,
    Layers,
  } from "lucide-react";
  
  export default async function DashboardStatsSection({
    workspaceId,
  }: {
    workspaceId: string;
  }) {
    const dashboardStats =
      await getDashboardStatApi(workspaceId);
  
    const {
      todayFollowUpCount,
      yesterdayFollowUpCount,
      upcomingFollowUpCount,
      newTodoTaskCount,
      overdueTasks,
      totalContactCount,
      newContactsThisWeek,
    } = dashboardStats;
  
    return (
      <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
        <DashboardStats
          statsLabel="Today's Follow-ups"
          statsScore={todayFollowUpCount}
          statsDescription={`${yesterdayFollowUpCount} from yesterday`}
          statsIcon={<Star className="size-5 text-primary" />}
          trendType="up"
        />
  
        <DashboardStats
          statsLabel="Upcoming Follow-ups"
          statsScore={upcomingFollowUpCount}
          statsDescription="Next: Tomorrow"
          statsIcon={<FilePlus className="size-5 text-primary" />}
          trendType="down"
        />
  
        <DashboardStats
          statsLabel="Todo's Task"
          statsScore={newTodoTaskCount}
          statsDescription={`${overdueTasks} Overdue`}
          statsIcon={<Layers className="size-5 text-primary" />}
          trendType="up"
        />
  
        <DashboardStats
          statsLabel={totalContactCount > 1 ? "Contacts" : "Contact"}
          statsScore={totalContactCount}
          statsDescription={`${newContactsThisWeek} new this week`}
          statsIcon={<Layers className="size-5 text-primary" />}
          trendType="up"
        />
      </div>
    );
  }