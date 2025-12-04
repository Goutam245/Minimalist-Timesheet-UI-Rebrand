import { useState } from "react";
import { 
  Download, 
  Filter,
  Calendar,
  BarChart3,
  PieChart,
  TrendingUp,
  Users,
  Clock
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPie,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from "recharts";

const weeklyData = [
  { name: "Mon", hours: 8.5, target: 8 },
  { name: "Tue", hours: 9.0, target: 8 },
  { name: "Wed", hours: 7.5, target: 8 },
  { name: "Thu", hours: 8.0, target: 8 },
  { name: "Fri", hours: 7.0, target: 8 },
  { name: "Sat", hours: 0, target: 0 },
  { name: "Sun", hours: 0, target: 0 },
];

const projectDistribution = [
  { name: "Web Development", value: 35, color: "#3b82f6" },
  { name: "Mobile App", value: 25, color: "#8b5cf6" },
  { name: "Design System", value: 20, color: "#ec4899" },
  { name: "Marketing", value: 15, color: "#f97316" },
  { name: "Other", value: 5, color: "#6b7280" },
];

const monthlyTrend = [
  { month: "Jul", hours: 160, billable: 145 },
  { month: "Aug", hours: 168, billable: 155 },
  { month: "Sep", hours: 155, billable: 140 },
  { month: "Oct", hours: 172, billable: 160 },
  { month: "Nov", hours: 165, billable: 150 },
  { month: "Dec", hours: 140, billable: 125 },
];

const teamStats = [
  { name: "Sarah Wilson", hours: 168, utilization: 95, avatar: "SW" },
  { name: "Mike Chen", hours: 160, utilization: 88, avatar: "MC" },
  { name: "Emily Davis", hours: 155, utilization: 85, avatar: "ED" },
  { name: "James Rodriguez", hours: 172, utilization: 92, avatar: "JR" },
  { name: "Lisa Thompson", hours: 148, utilization: 78, avatar: "LT" },
];

export default function Reports() {
  const [period, setPeriod] = useState("week");
  const [reportType, setReportType] = useState("overview");

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Page header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-semibold text-foreground tracking-tight">
            Reports & Analytics
          </h1>
          <p className="text-muted-foreground mt-1">
            Track time allocation and team performance
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[140px]">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Filters
          </Button>
          <Button className="gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Report type tabs */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: "overview", label: "Overview", icon: BarChart3 },
          { id: "projects", label: "By Project", icon: PieChart },
          { id: "team", label: "Team", icon: Users },
          { id: "trends", label: "Trends", icon: TrendingUp },
        ].map((tab) => (
          <Button
            key={tab.id}
            variant={reportType === tab.id ? "default" : "outline"}
            size="sm"
            className="gap-2"
            onClick={() => setReportType(tab.id)}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </Button>
        ))}
      </div>

      {/* Stats overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="card-hover">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center">
                <Clock className="w-5 h-5 text-primary" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">Total Hours</p>
              <p className="text-2xl font-semibold text-foreground mt-1">40.0</p>
              <p className="text-sm text-success mt-1">+5% vs last week</p>
            </div>
          </CardContent>
        </Card>
        <Card className="card-hover">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-success-light flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-success" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">Billable Hours</p>
              <p className="text-2xl font-semibold text-foreground mt-1">36.5</p>
              <p className="text-sm text-muted-foreground mt-1">91% billable</p>
            </div>
          </CardContent>
        </Card>
        <Card className="card-hover">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-info-light flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">Avg Utilization</p>
              <p className="text-2xl font-semibold text-foreground mt-1">88%</p>
              <p className="text-sm text-muted-foreground mt-1">Team average</p>
            </div>
          </CardContent>
        </Card>
        <Card className="card-hover">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-warning-light flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-warning" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">Active Projects</p>
              <p className="text-2xl font-semibold text-foreground mt-1">5</p>
              <p className="text-sm text-muted-foreground mt-1">This period</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly hours chart */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }}
                  />
                  <Bar dataKey="hours" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="target" fill="hsl(var(--muted))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Project distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Project Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center">
              <ResponsiveContainer width="50%" height="100%">
                <RechartsPie>
                  <Pie
                    data={projectDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {projectDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }}
                  />
                </RechartsPie>
              </ResponsiveContainer>
              <div className="flex-1 space-y-3">
                {projectDistribution.map((project, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: project.color }}
                    />
                    <span className="text-sm text-foreground flex-1">{project.name}</span>
                    <span className="text-sm font-medium text-foreground">{project.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly trend */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="hours" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--primary))" }}
                  name="Total Hours"
                />
                <Line 
                  type="monotone" 
                  dataKey="billable" 
                  stroke="hsl(var(--success))" 
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--success))" }}
                  name="Billable Hours"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Team utilization */}
      <Card>
        <CardHeader>
          <CardTitle>Team Utilization</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {teamStats.map((member, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-medium">
                  {member.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-foreground">{member.name}</p>
                    <span className="text-sm text-muted-foreground">{member.hours}h</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Progress value={member.utilization} className="flex-1 h-2" />
                    <span className="text-sm font-medium text-foreground w-12 text-right">
                      {member.utilization}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
