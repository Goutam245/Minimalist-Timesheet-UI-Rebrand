import { useState } from "react";
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus,
  MoreHorizontal,
  ChevronDown,
  ChevronUp,
  Edit3,
  Trash2,
  Download,
  Upload,
  Settings
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const weekDays = [
  { day: "Mon", date: "01.12" },
  { day: "Tue", date: "02.12" },
  { day: "Wed", date: "03.12" },
  { day: "Thu", date: "04.12" },
  { day: "Fri", date: "05.12" },
  { day: "Sat", date: "06.12" },
  { day: "Sun", date: "07.12" },
];

interface TimeEntry {
  [key: string]: number;
}

interface Task {
  id: string;
  name: string;
  entries: TimeEntry;
}

interface Project {
  id: string;
  name: string;
  color: string;
  tasks: Task[];
  expanded: boolean;
}

const initialProjects: Project[] = [
  {
    id: "1",
    name: "Web Development",
    color: "bg-project-blue",
    expanded: true,
    tasks: [
      { 
        id: "1a", 
        name: "Frontend Development", 
        entries: { mon: 0, tue: 4, wed: 0, thu: 0, fri: 0, sat: 0, sun: 0 }
      },
      { 
        id: "1b", 
        name: "Backend API", 
        entries: { mon: 0, tue: 3, wed: 0, thu: 0, fri: 0, sat: 0, sun: 0 }
      },
    ],
  },
  {
    id: "2",
    name: "Design",
    color: "bg-project-purple",
    expanded: true,
    tasks: [
      { 
        id: "2a", 
        name: "UI Components", 
        entries: { mon: 2, tue: 0, wed: 0, thu: 0, fri: 0, sat: 0, sun: 0 }
      },
    ],
  },
  {
    id: "3",
    name: "Marketing",
    color: "bg-project-pink",
    expanded: true,
    tasks: [
      { 
        id: "3a", 
        name: "Campaign Planning", 
        entries: { mon: 0, tue: 0, wed: 5, thu: 0, fri: 0, sat: 0, sun: 0 }
      },
    ],
  },
];

export default function WeeklyTimeEntry() {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [weekNumber, setWeekNumber] = useState(49);
  const [year, setYear] = useState(2025);

  const toggleProject = (projectId: string) => {
    setProjects(projects.map(p => 
      p.id === projectId ? { ...p, expanded: !p.expanded } : p
    ));
  };

  const calculateProjectTotal = (project: Project): number => {
    return project.tasks.reduce((sum, task) => {
      return sum + Object.values(task.entries).reduce((a, b) => a + b, 0);
    }, 0);
  };

  const calculateDayTotal = (dayKey: string): number => {
    return projects.reduce((sum, project) => {
      return sum + project.tasks.reduce((taskSum, task) => {
        return taskSum + (task.entries[dayKey] || 0);
      }, 0);
    }, 0);
  };

  const totalHours = projects.reduce((sum, p) => sum + calculateProjectTotal(p), 0);

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Page header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-semibold text-foreground tracking-tight">
            Weekly Time Entry
          </h1>
          <p className="text-muted-foreground mt-1">
            Week {weekNumber}, {year}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Settings className="w-4 h-4" />
            Settings
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Upload className="w-4 h-4" />
            Import
          </Button>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            New Project
          </Button>
        </div>
      </div>

      {/* Summary card */}
      <Card className="bg-gradient-to-r from-primary-light to-card border-primary/20">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Total Hours</p>
              <p className="text-4xl font-bold text-foreground">{totalHours.toFixed(2)}</p>
              <p className="text-sm text-muted-foreground mt-1">
                <span className="font-medium text-primary">{projects.length}</span> Projects Active
              </p>
            </div>
            <Button variant="soft" className="gap-2">
              View Breakdown
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Week navigation */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">KW</span>
              <select 
                value={weekNumber}
                onChange={(e) => setWeekNumber(Number(e.target.value))}
                className="h-9 rounded-lg border border-border bg-card px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                {Array.from({ length: 52 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
              <span className="text-muted-foreground">-</span>
              <select
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="h-9 rounded-lg border border-border bg-card px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value={2024}>2024</option>
                <option value={2025}>2025</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="gap-1">
                <ChevronLeft className="w-4 h-4" />
                Previous Week
              </Button>
              <Button variant="ghost" size="sm" className="gap-1">
                Next Week
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timesheet table */}
      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 font-medium text-muted-foreground w-[280px]">
                  Project / Task
                </th>
                {weekDays.map((day, index) => (
                  <th key={index} className="p-4 text-center">
                    <div className="font-medium text-foreground">{day.day}</div>
                    <div className="text-sm text-muted-foreground">{day.date}</div>
                  </th>
                ))}
                <th className="p-4 text-center font-medium text-muted-foreground w-[100px]">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <>
                  {/* Project row */}
                  <tr 
                    key={project.id} 
                    className="border-b border-border bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <Button 
                          variant="ghost" 
                          size="icon-sm" 
                          className="h-6 w-6"
                          onClick={() => toggleProject(project.id)}
                        >
                          {project.expanded ? (
                            <ChevronDown className="w-4 h-4" />
                          ) : (
                            <ChevronRight className="w-4 h-4" />
                          )}
                        </Button>
                        <div className={`w-2.5 h-2.5 rounded-full ${project.color}`} />
                        <span className="font-medium text-foreground">{project.name}</span>
                        <Button variant="ghost" size="icon-sm" className="h-6 w-6 ml-1">
                          <Plus className="w-3 h-3" />
                        </Button>
                        <Button variant="ghost" size="icon-sm" className="h-6 w-6">
                          <Edit3 className="w-3 h-3" />
                        </Button>
                        <Button variant="ghost" size="icon-sm" className="h-6 w-6 text-destructive">
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </td>
                    {weekDays.map((_, dayIndex) => (
                      <td key={dayIndex} className="p-2 text-center">
                        <div className="h-9" />
                      </td>
                    ))}
                    <td className="p-4 text-center">
                      <span className="font-semibold text-foreground">
                        {calculateProjectTotal(project).toFixed(2)}
                      </span>
                    </td>
                  </tr>
                  
                  {/* Task rows */}
                  {project.expanded && project.tasks.map((task) => (
                    <tr 
                      key={task.id} 
                      className="border-b border-border/50 hover:bg-muted/20 transition-colors"
                    >
                      <td className="p-4 pl-14">
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">{task.name}</span>
                          <Button variant="ghost" size="icon-sm" className="h-5 w-5 opacity-0 hover:opacity-100">
                            <Edit3 className="w-3 h-3" />
                          </Button>
                          <Button variant="ghost" size="icon-sm" className="h-5 w-5 opacity-0 hover:opacity-100 text-destructive">
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </td>
                      {["mon", "tue", "wed", "thu", "fri", "sat", "sun"].map((dayKey, dayIndex) => (
                        <td key={dayIndex} className="p-2">
                          <Input
                            type="number"
                            min="0"
                            step="0.5"
                            value={task.entries[dayKey] || ""}
                            placeholder="0"
                            className={cn(
                              "h-9 w-full text-center bg-card",
                              task.entries[dayKey] > 0 && "bg-primary-light border-primary/30 text-primary font-medium"
                            )}
                          />
                        </td>
                      ))}
                      <td className="p-4 text-center">
                        <span className="text-muted-foreground">
                          {Object.values(task.entries).reduce((a, b) => a + b, 0).toFixed(2)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </>
              ))}
              
              {/* Totals row */}
              <tr className="bg-muted/50 font-medium">
                <td className="p-4 text-foreground">Daily Totals</td>
                {["mon", "tue", "wed", "thu", "fri", "sat", "sun"].map((dayKey, index) => (
                  <td key={index} className="p-4 text-center">
                    <span className="text-foreground">{calculateDayTotal(dayKey).toFixed(2)}</span>
                  </td>
                ))}
                <td className="p-4 text-center">
                  <Badge variant="info" className="text-sm font-semibold px-3 py-1">
                    {totalHours.toFixed(2)}h
                  </Badge>
                </td>
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
