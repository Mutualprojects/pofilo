"use client";

import { motion, type PanInfo } from "framer-motion";
import type React from "react";
import { useRef, useState, useEffect } from "react";
import { flushSync } from "react-dom";
import { cn } from "@/lib/utils";

import {
  ArrowRight,
  Database,
  Mail,
  Plus,
  Zap,
  Cpu,
  Globe,
  GitBranch,
  Layers,
  Sparkles,
  Code2,
} from "lucide-react";

// Interfaces
interface WorkflowNode {
  id: string;
  type: "trigger" | "action" | "condition";
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  position: { x: number; y: number };
}

interface WorkflowConnection {
  from: string;
  to: string;
}

// Simple custom inline UI components to match Balaji's premium aesthetic
const Badge = ({ children, className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
  <span className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-[9px] sm:text-[10px] font-black uppercase tracking-widest transition-colors duration-300", className)} {...props}>
    {children}
  </span>
);

const Button = ({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button className={cn("inline-flex items-center justify-center rounded-lg text-xs font-black uppercase tracking-widest transition-all duration-300 border border-zinc-300 dark:border-zinc-800 bg-[#f5f1e8] dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 px-4 py-2 hover:scale-[1.02] active:scale-[0.98]", className)} {...props}>
    {children}
  </button>
);

const Card = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-950/70 text-zinc-950 dark:text-zinc-50 shadow-sm backdrop-blur-md transition-all duration-300", className)} {...props}>
    {children}
  </div>
);

// Constants
const NODE_WIDTH = 220;
const NODE_HEIGHT = 110;

const nodeTemplates: Omit<WorkflowNode, "id" | "position">[] = [
  {
    type: "action",
    title: "Post-Launch Scaling",
    description: "I monitor query latency, optimize databases, and configure caching for smooth user scaling.",
    icon: Layers,
    color: "blue",
  },
  {
    type: "action",
    title: "CI/CD Pipeline",
    description: "I set up Git-triggered automated deployments to deliver features securely and instantly.",
    icon: GitBranch,
    color: "emerald",
  },
  {
    type: "action",
    title: "Status Updates",
    description: "I integrate automated webhooks and Slack notifications to keep stakeholders fully aligned.",
    icon: Mail,
    color: "purple",
  },
];

const initialNodes: WorkflowNode[] = [
  {
    id: "node-1",
    type: "trigger",
    title: "1. Client Discovery",
    description: "I jump on a call with you to absorb your product vision, define scope, and map key goals.",
    icon: Zap,
    color: "emerald",
    position: { x: 50, y: 120 },
  },
  {
    id: "node-2",
    type: "action",
    title: "2. Architecture Design",
    description: "I sketch database schemas (Postgres/Supabase) and blueprint highly secure API contracts.",
    icon: Database,
    color: "blue",
    position: { x: 320, y: 120 },
  },
  {
    id: "node-3",
    type: "action",
    title: "3. Full-Stack Coding",
    description: "I handcraft a premium Next.js frontend paired with high-performance microservices.",
    icon: Code2,
    color: "amber",
    position: { x: 590, y: 120 },
  },
  {
    id: "node-4",
    type: "condition",
    title: "4. AI & QA Integration",
    description: "I plug in advanced AI pipelines (FaceNet/LLMs) and run strict automated test suites.",
    icon: Cpu,
    color: "purple",
    position: { x: 860, y: 120 },
  },
  {
    id: "node-5",
    type: "action",
    title: "5. Production Launch",
    description: "I containerize the system with Docker and orchestrate safe hosting on Vercel or AWS.",
    icon: Globe,
    color: "indigo",
    position: { x: 1130, y: 120 },
  },
];

const initialConnections: WorkflowConnection[] = [
  { from: "node-1", to: "node-2" },
  { from: "node-2", to: "node-3" },
  { from: "node-3", to: "node-4" },
  { from: "node-4", to: "node-5" },
];

const colorClasses: Record<string, string> = {
  emerald: "border-emerald-500/30 dark:border-emerald-400/20 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400",
  blue: "border-blue-500/30 dark:border-blue-400/20 bg-blue-500/5 text-blue-600 dark:text-blue-400",
  amber: "border-amber-500/30 dark:border-amber-400/20 bg-amber-500/5 text-amber-600 dark:text-amber-400",
  purple: "border-purple-500/30 dark:border-purple-400/20 bg-purple-500/5 text-purple-600 dark:text-purple-400",
  indigo: "border-indigo-500/30 dark:border-indigo-400/20 bg-indigo-500/5 text-indigo-600 dark:text-indigo-400",
};

// Connection Line Component
function WorkflowConnectionLine({
  from,
  to,
  nodes,
}: {
  from: string;
  to: string;
  nodes: WorkflowNode[];
}) {
  const fromNode = nodes.find((n) => n.id === from);
  const toNode = nodes.find((n) => n.id === to);
  if (!fromNode || !toNode) return null;

  const startX = fromNode.position.x + NODE_WIDTH;
  const startY = fromNode.position.y + NODE_HEIGHT / 2;
  const endX = toNode.position.x;
  const endY = toNode.position.y + NODE_HEIGHT / 2;

  const cp1X = startX + (endX - startX) * 0.5;
  const cp2X = endX - (endX - startX) * 0.5;

  const path = `M${startX},${startY} C${cp1X},${startY} ${cp2X},${endY} ${endX},${endY}`;

  return (
    <path
      d={path}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeDasharray="8,6"
      strokeLinecap="round"
      opacity={0.35}
      className="text-orange-600 dark:text-orange-500"
    />
  );
}

// Main Component
export function ProcessWorkflowSection() {
  const [nodes, setNodes] = useState<WorkflowNode[]>(initialNodes);
  const [connections, setConnections] =
    useState<WorkflowConnection[]>(initialConnections);
  const canvasRef = useRef<HTMLDivElement>(null);
  const dragStartPosition = useRef<{ x: number; y: number } | null>(null);
  const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null);
  const [contentSize, setContentSize] = useState({ width: 900, height: 400 });

  useEffect(() => {
    const maxX = Math.max(...nodes.map((n) => n.position.x + NODE_WIDTH));
    const maxY = Math.max(...nodes.map((n) => n.position.y + NODE_HEIGHT));
    setContentSize({
      width: Math.max(maxX + 100, 1000),
      height: Math.max(maxY + 100, 420),
    });
  }, [nodes]);

  // Drag Handlers
  const handleDragStart = (nodeId: string) => {
    setDraggingNodeId(nodeId);
    const node = nodes.find((n) => n.id === nodeId);
    if (node) {
      dragStartPosition.current = { x: node.position.x, y: node.position.y };
    }
  };

  const handleDrag = (nodeId: string, { offset }: PanInfo) => {
    if (draggingNodeId !== nodeId || !dragStartPosition.current) return;

    const newX = dragStartPosition.current.x + offset.x;
    const newY = dragStartPosition.current.y + offset.y;

    const constrainedX = Math.max(0, newX);
    const constrainedY = Math.max(0, newY);

    flushSync(() => {
      setNodes((prev) =>
          prev.map((node) =>
            node.id === nodeId
              ? { ...node, position: { x: constrainedX, y: constrainedY } }
              : node
          )
      );
    });
  };

  const handleDragEnd = () => {
    setDraggingNodeId(null);
    dragStartPosition.current = null;
  };

  // Add Node Handler
  const addNode = () => {
    const template =
      nodeTemplates[Math.floor(Math.random() * nodeTemplates.length)];
    const lastNode = nodes[nodes.length - 1];
    const newPosition = lastNode
      ? { x: lastNode.position.x + 270, y: lastNode.position.y }
      : { x: 50, y: 120 };

    const newNode: WorkflowNode = {
      id: `node-${Date.now()}`,
      ...template,
      position: newPosition,
    };

    flushSync(() => {
      setNodes((prev) => [...prev, newNode]);
      if (lastNode) {
        setConnections((prev) => [
          ...prev,
          { from: lastNode.id, to: newNode.id },
        ]);
      }
    });

    // Scroll to new node
    const canvas = canvasRef.current;
    if (canvas) {
      setTimeout(() => {
        canvas.scrollTo({
          left: newPosition.x + NODE_WIDTH - canvas.clientWidth + 150,
          behavior: "smooth",
        });
      }, 50);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-20 relative z-10 border-t border-zinc-200/50 dark:border-zinc-900/50">
      {/* Background aesthetics */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 80% 20%, rgba(234,88,12,0.03) 0%, transparent 60%)",
        }}
      />

      {/* Title / Eyebrow */}
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-orange-600" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-600">
              Interactive Blueprint
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none text-zinc-900 dark:text-white">
            My Engineering <span className="text-orange-600 italic">Process.</span>
          </h2>
          <p className="mt-4 text-zinc-500 dark:text-zinc-400 font-medium max-w-xl text-sm leading-relaxed">
            Drag nodes, explore pipeline connections, or append automated steps to visualize my full-stack & AI solutions architecture.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          <Badge
            className="border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-3 py-1 font-black"
          >
            ● Live Simulator
          </Badge>
          <Button
            onClick={addNode}
            className="flex items-center gap-2 h-9 px-4 rounded-xl border border-zinc-300 dark:border-zinc-800 text-[10px] font-black uppercase tracking-widest text-zinc-700 dark:text-zinc-300 bg-white/50 dark:bg-zinc-950/50 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all duration-300"
          >
            <Plus className="h-3.5 w-3.5" />
            Append Step
          </Button>
        </div>
      </div>

      {/* Canvas */}
      <div
        ref={canvasRef}
        className="relative h-[420px] w-full overflow-auto rounded-3xl border border-zinc-200 dark:border-zinc-900 bg-zinc-100/30 dark:bg-zinc-950/20 backdrop-blur-sm"
        role="region"
        aria-label="Workflow canvas"
        tabIndex={0}
      >
        {/* Canvas background dot grid */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20"
          style={{
            backgroundImage: "radial-gradient(#ea580c 0.75px, transparent 0.75px)",
            backgroundSize: "20px 20px"
          }}
        />

        {/* Content Wrapper */}
        <div
          className="relative"
          style={{
            minWidth: contentSize.width,
            minHeight: contentSize.height,
          }}
        >
          {/* SVG Connections */}
          <svg
            className="absolute top-0 left-0 pointer-events-none"
            width={contentSize.width}
            height={contentSize.height}
            style={{ overflow: "visible" }}
            aria-hidden="true"
          >
            {connections.map((c) => (
              <WorkflowConnectionLine
                key={`${c.from}-${c.to}`}
                from={c.from}
                to={c.to}
                nodes={nodes}
              />
            ))}
          </svg>

          {/* Nodes */}
          {nodes.map((node) => {
            const Icon = node.icon;
            const isDragging = draggingNodeId === node.id;

            return (
              <motion.div
                key={node.id}
                drag
                dragMomentum={false}
                dragConstraints={{
                  left: 10,
                  top: 10,
                  right: contentSize.width - NODE_WIDTH - 10,
                  bottom: contentSize.height - NODE_HEIGHT - 10,
                }}
                onDragStart={() => handleDragStart(node.id)}
                onDrag={(_, info) => handleDrag(node.id, info)}
                onDragEnd={handleDragEnd}
                style={{
                  x: node.position.x,
                  y: node.position.y,
                  width: NODE_WIDTH,
                  transformOrigin: "0 0",
                }}
                className="absolute cursor-grab active:cursor-grabbing"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                whileHover={{ scale: 1.02 }}
                whileDrag={{ scale: 1.04, zIndex: 50 }}
                aria-grabbed={isDragging}
              >
                <Card
                  className={cn(
                    "group/node relative w-full overflow-hidden rounded-2xl border bg-white/80 dark:bg-[#0c0c0c]/80 p-4 transition-all duration-300",
                    isDragging ? "shadow-2xl ring-2 ring-orange-500/50 scale-[1.04]" : "shadow-md hover:shadow-xl",
                    colorClasses[node.color]
                  )}
                  role="article"
                  aria-label={`${node.type} node: ${node.title}`}
                >
                  {/* Glass highlight effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover/node:opacity-100" />

                  <div className="relative space-y-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border bg-white dark:bg-zinc-900 shadow-sm",
                          colorClasses[node.color]
                        )}
                        aria-hidden="true"
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <Badge
                          className="mb-1 rounded-full border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 px-2 py-0 text-[8px] font-black uppercase tracking-[0.15em] text-zinc-400 dark:text-zinc-500"
                        >
                          {node.type}
                        </Badge>
                        <h3 className="truncate text-xs font-black uppercase tracking-tight text-zinc-800 dark:text-zinc-100">
                          {node.title}
                        </h3>
                      </div>
                    </div>
                    <p className="line-clamp-2 text-[10px] leading-relaxed font-semibold text-zinc-500 dark:text-zinc-400">
                      {node.description}
                    </p>
                    <div className="flex items-center gap-1.5 text-[9px] font-bold text-zinc-400 dark:text-zinc-500">
                      <ArrowRight className="h-3 w-3 text-orange-500" aria-hidden="true" />
                      <span className="uppercase tracking-widest">
                        Node Locked
                      </span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Footer Stats / Legend */}
      <div
        className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-zinc-200/50 dark:border-zinc-900/50 bg-white/40 dark:bg-zinc-950/20 px-6 py-4 backdrop-blur-sm"
        role="status"
        aria-live="polite"
      >
        <div className="flex flex-wrap items-center gap-6 text-[10px] font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
          <div className="flex items-center gap-2">
            <div
              className="h-2 w-2 rounded-full bg-emerald-500"
              aria-hidden="true"
            />
            <span>
              {nodes.length} Active {nodes.length === 1 ? "Node" : "Nodes"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="h-2 w-2 rounded-full bg-orange-500"
              aria-hidden="true"
            />
            <span>
              {connections.length} Stable {connections.length === 1 ? "Link" : "Links"}
            </span>
          </div>
        </div>
        <p className="text-[9px] font-black uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-500">
          💡 DRAG ANY CARD TO EXPERIMENT & PAN THE PIPELINE
        </p>
      </div>
    </section>
  );
}
