import { 
  Search, 
  BookOpen, 
  MessageCircle, 
  Mail, 
  ChevronRight,
  Clock,
  Calendar,
  CheckSquare,
  BarChart3,
  FileText,
  Users,
  HelpCircle,
  ExternalLink
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useState } from "react";

const quickLinks = [
  { 
    icon: Clock, 
    title: "Time Entry", 
    description: "Learn how to log your daily hours",
    color: "bg-primary/10 text-primary"
  },
  { 
    icon: Calendar, 
    title: "Weekly Timesheets", 
    description: "Submit and manage weekly timesheets",
    color: "bg-success/10 text-success"
  },
  { 
    icon: CheckSquare, 
    title: "Approvals", 
    description: "Approve or reject team timesheets",
    color: "bg-warning/10 text-warning"
  },
  { 
    icon: BarChart3, 
    title: "Reports", 
    description: "Generate and export reports",
    color: "bg-info/10 text-info"
  },
];

const faqs = [
  {
    question: "How do I submit my daily time entry?",
    answer: "Navigate to the Daily Entry page from the sidebar. Select your project and task, enter your hours, and click 'Add Entry'. Your entries are automatically saved and can be edited until the timesheet is submitted for approval."
  },
  {
    question: "Can I edit a timesheet after submission?",
    answer: "Once a timesheet is submitted for approval, you cannot edit it directly. If changes are needed, contact your manager to reject the timesheet, which will allow you to make modifications and resubmit."
  },
  {
    question: "How do I view my weekly summary?",
    answer: "Go to the Weekly Entry page to see a comprehensive view of all your time entries for the week. The page shows daily breakdowns by project and task, with automatic totals calculated for each day and the week."
  },
  {
    question: "What happens when my timesheet is approved?",
    answer: "Approved timesheets are locked and sent to payroll processing. You'll receive a notification confirming the approval. The hours will appear in your Reports section and count toward your monthly and yearly totals."
  },
  {
    question: "How do I generate a report?",
    answer: "Navigate to the Reports page and select your desired date range, projects, and report type. Click 'Generate Report' to view the data. You can export reports as PDF or Excel files for sharing or record-keeping."
  },
  {
    question: "Can I track time for multiple projects in one day?",
    answer: "Yes! You can add multiple time entries for different projects and tasks within the same day. The system will automatically calculate totals and ensure your entries don't exceed the maximum daily hours configured by your organization."
  },
];

const Help = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <HelpCircle className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-2xl font-semibold text-foreground tracking-tight">How can we help?</h1>
        <p className="text-muted-foreground mt-2">
          Search our knowledge base or browse topics below
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-xl mx-auto">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="Search for help..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 h-12 text-base"
        />
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickLinks.map((link) => (
          <Card 
            key={link.title} 
            className="cursor-pointer hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
          >
            <CardContent className="p-4">
              <div className={`w-10 h-10 rounded-xl ${link.color} flex items-center justify-center mb-3`}>
                <link.icon className="w-5 h-5" />
              </div>
              <h3 className="font-medium text-foreground">{link.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{link.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* FAQ Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-foreground" />
            </div>
            <div>
              <CardTitle className="text-lg">Frequently Asked Questions</CardTitle>
              <CardDescription>Find answers to common questions</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredFaqs.length > 0 ? (
            <Accordion type="single" collapsible className="w-full">
              {filteredFaqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-sm font-medium hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No results found for "{searchQuery}"</p>
              <p className="text-sm mt-1">Try different keywords</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Contact Support */}
      <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center shrink-0">
              <MessageCircle className="w-7 h-7 text-primary" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="font-semibold text-foreground text-lg">Still need help?</h3>
              <p className="text-muted-foreground mt-1">
                Our support team is available Monday to Friday, 9am - 6pm EST
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="outline" className="gap-2">
                <Mail className="w-4 h-4" />
                Email Support
              </Button>
              <Button className="gap-2">
                <MessageCircle className="w-4 h-4" />
                Live Chat
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resources */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
              <Users className="w-5 h-5 text-foreground" />
            </div>
            <div>
              <CardTitle className="text-lg">Additional Resources</CardTitle>
              <CardDescription>Guides and documentation</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {[
            { title: "Getting Started Guide", description: "New to TimeFlow? Start here" },
            { title: "Video Tutorials", description: "Watch step-by-step walkthroughs" },
            { title: "API Documentation", description: "For developers and integrations" },
            { title: "Release Notes", description: "See what's new in TimeFlow" },
          ].map((resource) => (
            <div
              key={resource.title}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer group"
            >
              <div>
                <p className="font-medium text-foreground">{resource.title}</p>
                <p className="text-sm text-muted-foreground">{resource.description}</p>
              </div>
              <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default Help;