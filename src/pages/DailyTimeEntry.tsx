import { useState } from "react";
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus,
  Play,
  Pause,
  MoreHorizontal,
  Trash2,
  Edit3
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const timeEntries = [
  { 
    id: 1,
    project: "Web Development", 
    task: "Frontend Development",
    startTime: "09:00",
    endTime: "12:30",
    duration: "3h 30m",
    color: "bg-project-blue",
    notes: "Working on dashboard components"
  },
  { 
    id: 2,
    project: "Web Development", 
    task: "Code Review",
    startTime: "14:00",
    endTime: "15:30",
    duration: "1h 30m",
    color: "bg-project-blue",
    notes: "PR reviews for team"
  },
  { 
    id: 3,
    project: "Design System", 
    task: "Component Library",
    startTime: "16:00",
    endTime: "18:00",
    duration: "2h",
    color: "bg-project-pink",
    notes: "Button variants"
  },
];

const projects = [
  { id: 1, name: "Web Development", color: "bg-project-blue" },
  { id: 2, name: "Mobile App", color: "bg-project-purple" },
  { id: 3, name: "Design System", color: "bg-project-pink" },
  { id: 4, name: "Marketing Site", color: "bg-project-orange" },
];

export default function DailyTimeEntry() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isTracking, setIsTracking] = useState(false);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", { 
      weekday: "long",
      month: "long", 
      day: "numeric",
      year: "numeric"
    });
  };

  const totalHours = "7h 00m";

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-5xl mx-auto">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-semibold text-foreground tracking-tight">
            Daily Time Entry
          </h1>
          <p className="text-muted-foreground mt-1">
            Track your time for {formatDate(selectedDate)}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon-sm">
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button variant="outline" className="min-w-[140px]">
            Today
          </Button>
          <Button variant="outline" size="icon-sm">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-primary-light border-primary/20">
          <CardContent className="p-4">
            <p className="text-sm text-primary/80">Total Today</p>
            <p className="text-2xl font-semibold text-primary mt-1">{totalHours}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Entries</p>
            <p className="text-2xl font-semibold text-foreground mt-1">{timeEntries.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Projects</p>
            <p className="text-2xl font-semibold text-foreground mt-1">2</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Billable</p>
            <p className="text-2xl font-semibold text-foreground mt-1">85%</p>
          </CardContent>
        </Card>
      </div>

      {/* Timer */}
      <Card className="border-primary/30 shadow-glow">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Select>
                <SelectTrigger className="bg-card">
                  <SelectValue placeholder="Select project" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  {projects.map((project) => (
                    <SelectItem key={project.id} value={project.id.toString()}>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${project.color}`} />
                        {project.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input placeholder="Task description" className="bg-card" />
              <Input placeholder="Notes (optional)" className="bg-card" />
            </div>
            <Button 
              size="lg" 
              className={`gap-2 min-w-[140px] ${isTracking ? 'bg-destructive hover:bg-destructive/90' : ''}`}
              onClick={() => setIsTracking(!isTracking)}
            >
              {isTracking ? (
                <>
                  <Pause className="w-4 h-4" />
                  Stop Timer
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Start Timer
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Time entries list */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Time Entries</CardTitle>
          <Button variant="outline" size="sm" className="gap-2">
            <Plus className="w-4 h-4" />
            Add Manual Entry
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {timeEntries.map((entry) => (
            <div
              key={entry.id}
              className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:shadow-md transition-all duration-200 group"
            >
              <div className={`w-1 h-14 rounded-full ${entry.color}`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-medium text-foreground">{entry.project}</p>
                  <Badge variant="ghost" className="text-xs">{entry.task}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{entry.notes}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-foreground">{entry.duration}</p>
                <p className="text-sm text-muted-foreground">{entry.startTime} - {entry.endTime}</p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon-sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-card border-border">
                  <DropdownMenuItem className="gap-2">
                    <Edit3 className="w-4 h-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-2 text-destructive">
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
