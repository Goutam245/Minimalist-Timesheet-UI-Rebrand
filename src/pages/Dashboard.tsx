import { 
  Clock, 
  TrendingUp, 
  FolderKanban, 
  Users,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Plus
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const stats = [
  {
    title: "Hours This Week",
    value: "32.5",
    unit: "hrs",
    change: "+12%",
    trend: "up",
    icon: Clock,
  },
  {
    title: "Active Projects",
    value: "8",
    unit: "",
    change: "+2",
    trend: "up",
    icon: FolderKanban,
  },
  {
    title: "Team Members",
    value: "24",
    unit: "",
    change: "0",
    trend: "neutral",
    icon: Users,
  },
  {
    title: "Productivity",
    value: "94",
    unit: "%",
    change: "+5%",
    trend: "up",
    icon: TrendingUp,
  },
];

const recentProjects = [
  { name: "Web Development", hours: 12.5, color: "bg-project-blue", progress: 75 },
  { name: "Mobile App", hours: 8.0, color: "bg-project-purple", progress: 45 },
  { name: "Design System", hours: 6.5, color: "bg-project-pink", progress: 90 },
  { name: "Marketing Site", hours: 5.5, color: "bg-project-orange", progress: 30 },
];

const pendingApprovals = [
  { employee: "Sarah Wilson", hours: 40, status: "pending", date: "Dec 1-7" },
  { employee: "Mike Chen", hours: 38.5, status: "pending", date: "Dec 1-7" },
  { employee: "Emily Davis", hours: 42, status: "review", date: "Dec 1-7" },
];

export default function Dashboard() {
  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-semibold text-foreground tracking-tight">
            Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Welcome back, John. Here's your overview.
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          New Entry
        </Button>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="card-hover">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-primary" />
                </div>
                <div className={`flex items-center gap-1 text-sm ${
                  stat.trend === "up" ? "text-success" : stat.trend === "down" ? "text-destructive" : "text-muted-foreground"
                }`}>
                  {stat.trend === "up" && <ArrowUpRight className="w-3 h-3" />}
                  {stat.trend === "down" && <ArrowDownRight className="w-3 h-3" />}
                  <span>{stat.change}</span>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-semibold text-foreground mt-1">
                  {stat.value}
                  <span className="text-lg text-muted-foreground ml-1">{stat.unit}</span>
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Projects */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle>Recent Projects</CardTitle>
            <Button variant="ghost" size="icon-sm">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentProjects.map((project, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <div className={`w-2.5 h-10 rounded-full ${project.color}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-foreground truncate">{project.name}</p>
                    <span className="text-sm text-muted-foreground">{project.hours}h</span>
                  </div>
                  <Progress value={project.progress} className="h-1.5" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Pending approvals */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle>Pending Approvals</CardTitle>
            <Badge variant="warning">{pendingApprovals.length}</Badge>
          </CardHeader>
          <CardContent className="space-y-3">
            {pendingApprovals.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div>
                  <p className="font-medium text-foreground text-sm">{item.employee}</p>
                  <p className="text-xs text-muted-foreground">{item.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-foreground text-sm">{item.hours}h</p>
                  <Badge 
                    variant={item.status === "pending" ? "warning" : "info"}
                    className="text-xs capitalize"
                  >
                    {item.status}
                  </Badge>
                </div>
              </div>
            ))}
            <Button variant="ghost" className="w-full mt-2 text-primary">
              View all approvals
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
