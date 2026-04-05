import React, { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { FlaskConical, FileText, ShoppingCart, Search, PlusCircle, Activity, BadgeCheck } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

type Sample = {
  id: number;
  customer: string;
  fabricType: string;
  tests: string[];
  status: "New" | "In Progress" | "Completed";
  createdAt: string;
  results?: Record<string, string | number>;
};

const initialSamples: Sample[] = [
  {
    id: 1,
    customer: "Zara Supplier",
    fabricType: "Cotton Knit",
    tests: ["pH", "Color Fastness"],
    status: "Completed",
    createdAt: "2026-04-05",
    results: { pH: 6.5, "Color Fastness": "4-5" },
  },
  {
    id: 2,
    customer: "Denim Export Lab",
    fabricType: "Denim",
    tests: ["Tensile Strength", "Tear Strength"],
    status: "In Progress",
    createdAt: "2026-04-05",
  },
  {
    id: 3,
    customer: "Home Textile QA",
    fabricType: "Woven Polyester",
    tests: ["pH"],
    status: "New",
    createdAt: "2026-04-04",
  },
];

const deviceMap: Record<string, { device: string; pitch: string }> = {
  pH: {
    device: "TexLab pH Core Device",
    pitch: "Minutes instead of hours. Ideal as the lead product for fast decision-making.",
  },
  "Color Fastness": {
    device: "TexLab Fastness Tester",
    pitch: "Improves lab speed and standard consistency.",
  },
  "Tensile Strength": {
    device: "TexLab Tensile Tester",
    pitch: "Supports core textile strength testing workflows.",
  },
  "Tear Strength": {
    device: "TexLab Tear Tester",
    pitch: "Useful for woven and denim quality evaluation.",
  },
};

export default function TexLabDashboard() {
  const [samples, setSamples] = useState<Sample[]>(initialSamples);
  const [query, setQuery] = useState("");
  const [customer, setCustomer] = useState("");
  const [fabricType, setFabricType] = useState("");
  const [tests, setTests] = useState("");

  const filteredSamples = useMemo(() => {
    const q = query.toLowerCase();
    return samples.filter(
      (s) =>
        s.customer.toLowerCase().includes(q) ||
        s.fabricType.toLowerCase().includes(q) ||
        s.tests.join(" ").toLowerCase().includes(q)
    );
  }, [samples, query]);

  const stats = useMemo(() => {
    const completed = samples.filter((s) => s.status === "Completed").length;
    const inProgress = samples.filter((s) => s.status === "In Progress").length;
    const newCount = samples.filter((s) => s.status === "New").length;
    const leads = samples.reduce((acc, sample) => {
      return acc + sample.tests.filter((test) => Boolean(deviceMap[test])).length;
    }, 0);

    return { completed, inProgress, newCount, leads };
  }, [samples]);

  const salesSuggestions = useMemo(() => {
    return samples.map((sample) => ({
      id: sample.id,
      customer: sample.customer,
      suggestions: sample.tests.map((test) => deviceMap[test]).filter(Boolean),
    }));
  }, [samples]);

  const chartData = [
    { name: "New", value: stats.newCount },
    { name: "In Progress", value: stats.inProgress },
    { name: "Completed", value: stats.completed },
    { name: "Sales Leads", value: stats.leads },
  ];

  const addSample = () => {
    if (!customer || !fabricType || !tests) return;

    const newSample: Sample = {
      id: samples.length ? Math.max(...samples.map((s) => s.id)) + 1 : 1,
      customer,
      fabricType,
      tests: tests.split(",").map((t) => t.trim()).filter(Boolean),
      status: "New",
      createdAt: new Date().toISOString().slice(0, 10),
    };

    setSamples([newSample, ...samples]);
    setCustomer("");
    setFabricType("");
    setTests("");
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">TexLab 17025 Dashboard</h1>
            <p className="mt-1 text-sm text-slate-600">
              Sample tracking, report flow, and device sales opportunities in one screen.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                className="pl-9"
                placeholder="Search customer, fabric, test..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="gap-2 rounded-2xl">
                  <PlusCircle className="h-4 w-4" />
                  New Sample
                </Button>
              </DialogTrigger>
              <DialogContent className="rounded-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Sample</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-2">
                  <div className="space-y-2">
                    <Label>Customer</Label>
                    <Input value={customer} onChange={(e) => setCustomer(e.target.value)} placeholder="Customer name" />
                  </div>
                  <div className="space-y-2">
                    <Label>Fabric Type</Label>
                    <Input value={fabricType} onChange={(e) => setFabricType(e.target.value)} placeholder="Cotton, Denim, Polyester..." />
                  </div>
                  <div className="space-y-2">
                    <Label>Tests</Label>
                    <Input value={tests} onChange={(e) => setTests(e.target.value)} placeholder="pH, Color Fastness, Tensile Strength" />
                  </div>
                  <Button onClick={addSample} className="w-full rounded-2xl">Create Sample</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard title="New Samples" value={stats.newCount} icon={<FlaskConical className="h-5 w-5" />} />
          <StatCard title="In Progress" value={stats.inProgress} icon={<Activity className="h-5 w-5" />} />
          <StatCard title="Completed Reports" value={stats.completed} icon={<FileText className="h-5 w-5" />} />
          <StatCard title="Sales Leads" value={stats.leads} icon={<ShoppingCart className="h-5 w-5" />} />
        </div>

        <div className="grid gap-6 xl:grid-cols-3">
          <Card className="rounded-3xl shadow-sm xl:col-span-2">
            <CardHeader>
              <CardTitle>Pipeline Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" radius={[10, 10, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl shadow-sm">
            <CardHeader>
              <CardTitle>System Readiness</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <ReadinessRow label="Sample workflow" value={85} />
              <ReadinessRow label="Report flow" value={72} />
              <ReadinessRow label="Sales mapping" value={78} />
              <ReadinessRow label="17025 alignment" value={64} />
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="samples" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 rounded-2xl md:w-[560px]">
            <TabsTrigger value="samples">Samples</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="sales">Sales Engine</TabsTrigger>
          </TabsList>

          <TabsContent value="samples">
            <Card className="rounded-3xl shadow-sm">
              <CardHeader>
                <CardTitle>Sample List</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Fabric</TableHead>
                      <TableHead>Tests</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSamples.map((sample) => (
                      <TableRow key={sample.id}>
                        <TableCell className="font-medium">#{sample.id}</TableCell>
                        <TableCell>{sample.customer}</TableCell>
                        <TableCell>{sample.fabricType}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-2">
                            {sample.tests.map((test) => (
                              <Badge key={test} variant="secondary" className="rounded-xl">{test}</Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className="rounded-xl" variant={sample.status === "Completed" ? "default" : "secondary"}>
                            {sample.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{sample.createdAt}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filteredSamples.map((sample) => (
                <Card key={sample.id} className="rounded-3xl shadow-sm">
                  <CardHeader>
                    <div className="flex items-center justify-between gap-3">
                      <CardTitle className="text-lg">Report #{sample.id}</CardTitle>
                      <Badge className="rounded-xl">{sample.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div><span className="font-semibold">Customer:</span> {sample.customer}</div>
                    <div><span className="font-semibold">Fabric:</span> {sample.fabricType}</div>
                    <div><span className="font-semibold">Tests:</span> {sample.tests.join(", ")}</div>
                    <div>
                      <span className="font-semibold">Results:</span>
                      <pre className="mt-2 whitespace-pre-wrap rounded-2xl bg-slate-100 p-3 text-xs">
                        {JSON.stringify(sample.results ?? { note: "Pending result entry" }, null, 2)}
                      </pre>
                    </div>
                    <Button className="w-full rounded-2xl">Export PDF</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="sales">
            <div className="grid gap-4 xl:grid-cols-2">
              {salesSuggestions.map((row) => (
                <Card key={row.id} className="rounded-3xl shadow-sm">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Lead from Sample #{row.id}</CardTitle>
                      <Badge className="rounded-xl">{row.customer}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {row.suggestions.length ? row.suggestions.map((item, index) => (
                      <div key={`${item.device}-${index}`} className="rounded-2xl border p-4">
                        <div className="flex items-center gap-2 font-semibold">
                          <BadgeCheck className="h-4 w-4" />
                          {item.device}
                        </div>
                        <p className="mt-2 text-sm text-slate-600">{item.pitch}</p>
                        <div className="mt-3 flex gap-2">
                          <Button size="sm" className="rounded-xl">Create Offer</Button>
                          <Button size="sm" variant="outline" className="rounded-xl">Send Brochure</Button>
                        </div>
                      </div>
                    )) : (
                      <div className="rounded-2xl border p-4 text-sm text-slate-600">
                        No mapped product yet for this sample.
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon }: { title: string; value: number; icon: React.ReactNode }) {
  return (
    <Card className="rounded-3xl shadow-sm">
      <CardContent className="flex items-center justify-between p-6">
        <div>
          <p className="text-sm text-slate-500">{title}</p>
          <p className="mt-2 text-3xl font-bold">{value}</p>
        </div>
        <div className="rounded-2xl bg-slate-100 p-3">{icon}</div>
      </CardContent>
    </Card>
  );
}

function ReadinessRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span>{label}</span>
        <span className="font-medium">{value}%</span>
      </div>
      <Progress value={value} className="h-2" />
    </div>
  );
}
