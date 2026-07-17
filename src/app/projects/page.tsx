"use client";

import { useState } from "react";
import BaseLayout from "../components/base-layout";
import DottedGridBackground from "../components/dotted-grid-background";

const projects = [
  {
    id: 1,
    title: "Cloudboard",
    summary: "An online whiteboard application where users can collaborate in real-time.",
    details:
      `An online whiteboard application built with Spring Boot and deployed with Azure Kubernetes Service. Leveraged web sockets and Redis pub/sub for real-time updates, achieving latencies as low as 10ms during testing.
       
       Focused on high availability by using caching with Redis. Implemented Grafana dashboards to monitor performance and identify bottlenecks, reducing avg. response latency by 20ms.`,
    tags: ["Next.js", "Tailwind", "UI"],
  },
  {
    id: 2,
    title: "Project Two",
    summary: "Another example card to show how the list will feel in practice.",
    details:
      "Expand this card to reveal more placeholder content such as architecture notes, screenshots, or links.",
    tags: ["React", "TypeScript", "Animation"],
  },
  {
    id: 3,
    title: "Project Three",
    summary: "A third item to make the vertical list feel more complete.",
    details:
      "You can swap these placeholders with real project information once you are ready.",
    tags: ["Node.js", "API", "Cloud"],
  },
];

export default function ProjectsPage() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <BaseLayout>
      <DottedGridBackground fixed={true} />

      <div className="min-h-screen overflow-hidden px-6 py-48">
        <div className="mx-auto flex max-w-4xl flex-col gap-6">
          <div className="mb-12 text-center">
            <h1 className="text-3xl font-bold text-primary">Projects</h1>
          </div>

          {projects.map((project) => {
            const isExpanded = project.id === expandedId;

            return (
              <div
                key={project.id}
                className="min-h-[180px] rounded-2xl slight-accent p-8 shadow-lg backdrop-blur-sm"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="space-y-2">
                    <h2 className="text-xl font-semibold text-primary">{project.title}</h2>
                    <p className="text-sm text-primary">{project.summary}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setExpandedId(isExpanded ? null : project.id)}
                    className="cursor-pointer rounded-full max-w-20 min-w-20 px-4 py-2 text-sm font-light text-white bg-accent"
                  >
                    {isExpanded ? "Collapse" : "Expand"}
                  </button>
                </div>

                <div className="mt-4 flex justify-center">
                  <div
                    className={`border-t border-primary opacity-20 transition-all duration-200 ease-in-out ${
                      isExpanded ? "w-full" : "w-0"
                    }`}
                  />
                </div>

                <div
                  className={`flex justify-center overflow-hidden transition-all duration-200 ease-in-out ${
                    isExpanded ? "mt-4 max-h-96 opacity-100" : "mt-0 max-h-0 opacity-0"
                  }`}
                  aria-hidden={!isExpanded}
                >
                  <div className="w-full max-w-4xl rounded-xl p-4 text-sm text-primary">
                    <p className="whitespace-pre-line">{project.details}</p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-primary px-2 py-1 text-[0.675rem] uppercase tracking-wide text-primary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </BaseLayout>
  );
}