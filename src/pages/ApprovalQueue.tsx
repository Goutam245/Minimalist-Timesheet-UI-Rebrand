import { useState } from "react";
import { 
  Check, 
  X, 
  Clock, 
  Filter,
  Search,
  ChevronDown,
  MoreHorizontal,
  MessageSquare,
  Eye
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { Checkbox } from "@/components/ui/checkbox";

interface ApprovalItem {
  id: string;
  employee: {
    name: string;
    avatar: string;
    initials: string;
    department: string;
  };
  period: string;
  totalHours: number;
  billableHours: number;
  submittedAt: string;
  status: "pending" | "approved" | "rejected" | "review";
  projects: string[];
}

const approvals: ApprovalItem[] = [
  {
    id: "1",
    employee: {
      name: "Sarah Wilson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      initials: "SW",
      department: "Engineering",
    },
    period: "Dec 1 - Dec 7, 2025",
    totalHours: 40,
    billableHours: 38,
    submittedAt: "2 hours ago",
    status: "pending",
    projects: ["Web Development", "Mobile App"],
  },
  {
    id: "2",
    employee: {
      name: "Mike Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      initials: "MC",
      department: "Design",
    },
    period: "Dec 1 - Dec 7, 2025",
    totalHours: 38.5,
    billableHours: 36,
    submittedAt: "5 hours ago",
    status: "pending",
    projects: ["Design System"],
  },
  {
    id: "3",
    employee: {
      name: "Emily Davis",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      initials: "ED",
      department: "Marketing",
    },
    period: "Dec 1 - Dec 7, 2025",
    totalHours: 42,
    billableHours: 40,
    submittedAt: "1 day ago",
    status: "review",
    projects: ["Marketing Campaign", "Content"],
  },
  {
    id: "4",
    employee: {
      name: "James Rodriguez",
      avatar: "",
      initials: "JR",
      department: "Engineering",
    },
    period: "Nov 24 - Nov 30, 2025",
    totalHours: 45,
    billableHours: 42,
    submittedAt: "3 days ago",
    status: "approved",
    projects: ["Backend API", "Infrastructure"],
  },
  {
    id: "5",
    employee: {
      name: "Lisa Thompson",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
      initials: "LT",
      department: "Product",
    },
    period: "Nov 24 - Nov 30, 2025",
    totalHours: 35,
    billableHours: 30,
    submittedAt: "4 days ago",
    status: "rejected",
    projects: ["Product Research"],
  },
];

const statusConfig = {
  pending: { label: "Pending", variant: "warning" as const },
  approved: { label: "Approved", variant: "success" as const },
  rejected: { label: "Rejected", variant: "destructive" as const },
  review: { label: "In Review", variant: "info" as const },
};

export default function ApprovalQueue() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredApprovals = statusFilter === "all" 
    ? approvals 
    : approvals.filter(a => a.status === statusFilter);

  const toggleSelectAll = () => {
    if (selectedItems.length === filteredApprovals.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredApprovals.map(a => a.id));
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const pendingCount = approvals.filter(a => a.status === "pending").length;

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-semibold text-foreground tracking-tight">
            Approval Queue
          </h1>
          <p className="text-muted-foreground mt-1">
            Review and approve team timesheets
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="warning" className="px-3 py-1.5 text-sm">
            {pendingCount} Pending
          </Badge>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-warning-light flex items-center justify-center">
                <Clock className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">{pendingCount}</p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-success-light flex items-center justify-center">
                <Check className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">
                  {approvals.filter(a => a.status === "approved").length}
                </p>
                <p className="text-sm text-muted-foreground">Approved</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-info-light flex items-center justify-center">
                <Eye className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">
                  {approvals.filter(a => a.status === "review").length}
                </p>
                <p className="text-sm text-muted-foreground">In Review</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-destructive-light flex items-center justify-center">
                <X className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">
                  {approvals.filter(a => a.status === "rejected").length}
                </p>
                <p className="text-sm text-muted-foreground">Rejected</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search by employee name..." className="pl-10" />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="review">In Review</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Bulk actions */}
      {selectedItems.length > 0 && (
        <Card className="bg-primary-light border-primary/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-primary font-medium">
                {selectedItems.length} item(s) selected
              </span>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Check className="w-4 h-4" />
                  Approve All
                </Button>
                <Button variant="outline" size="sm" className="gap-2 text-destructive border-destructive/30 hover:bg-destructive-light">
                  <X className="w-4 h-4" />
                  Reject All
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Approval list */}
      <Card>
        <CardContent className="p-0">
          <div className="border-b border-border p-4 flex items-center gap-4">
            <Checkbox 
              checked={selectedItems.length === filteredApprovals.length && filteredApprovals.length > 0}
              onCheckedChange={toggleSelectAll}
            />
            <span className="text-sm text-muted-foreground">Select all</span>
          </div>
          <div className="divide-y divide-border">
            {filteredApprovals.map((item) => (
              <div 
                key={item.id} 
                className="p-4 hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <Checkbox 
                    checked={selectedItems.includes(item.id)}
                    onCheckedChange={() => toggleSelect(item.id)}
                    className="mt-1"
                  />
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={item.employee.avatar} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                      {item.employee.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-foreground">{item.employee.name}</p>
                      <Badge variant="ghost" className="text-xs">{item.employee.department}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.period}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-sm">
                        <span className="text-muted-foreground">Total:</span>{" "}
                        <span className="font-medium text-foreground">{item.totalHours}h</span>
                      </span>
                      <span className="text-sm">
                        <span className="text-muted-foreground">Billable:</span>{" "}
                        <span className="font-medium text-foreground">{item.billableHours}h</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      {item.projects.map((project, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {project}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end gap-2">
                    <Badge variant={statusConfig[item.status].variant}>
                      {statusConfig[item.status].label}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{item.submittedAt}</span>
                    {item.status === "pending" && (
                      <div className="flex items-center gap-2 mt-2">
                        <Button variant="success" size="sm" className="gap-1">
                          <Check className="w-3 h-3" />
                          Approve
                        </Button>
                        <Button variant="outline" size="sm" className="gap-1 text-destructive">
                          <X className="w-3 h-3" />
                          Reject
                        </Button>
                      </div>
                    )}
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
