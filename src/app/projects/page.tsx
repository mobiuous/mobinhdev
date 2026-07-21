"use client";

import { useState } from "react";
import BaseLayout from "../components/base-layout";
import DottedGridBackground from "../components/dotted-grid-background";
import { inter } from "../components/fonts";

const projects = [
  {
    id: 1,
    title: "Cloudboard",
    summary: "An online whiteboard application where users can collaborate in real-time, built with scalability in mind.",
    details:
      `An online whiteboard application built with Spring Boot and deployed with Azure Kubernetes Service. Leveraged web sockets and Redis pub/sub for real-time updates, achieving latencies as low as 10ms during testing.
       
       Focused on high availability by using caching with Redis. Implemented Grafana dashboards to monitor performance and identify bottlenecks, reducing avg. response latency by 20ms.`,
    tags: ["Next.js", "Tailwind", "UI"],
    externalLinks: [
      {link: "https://www.github.com/mobiuous/cloudboard", label: "GitHub Repo"},
      {link: "https://www.github.com/mobiuous/cloudboard", label: "Live Demo"},
    ]
  },
  {
    id: 2,
    title: "Project Two",
    summary: "Another example card to show how the list will feel in practice.",
    details:
      "Expand this card to reveal more placeholder content such as architecture notes, screenshots, or links.",
    tags: ["React", "TypeScript", "Animation"],
    externalLinks: [
      {link: "https://www.github.com/mobiuous/cloudboard", label: "GitHub Repo"},
      {link: "https://www.github.com/mobiuous/cloudboard", label: "Live Demo"},
    ]
  },
  {
    id: 3,
    title: "Project Three",
    summary: "A third item to make the vertical list feel more complete.",
    details:
      "You can swap these placeholders with real project information once you are ready.",
    tags: ["Node.js", "API", "Cloud"],
    externalLinks: [
      {link: "https://www.github.com/mobiuous/cloudboard", label: "GitHub Repo"},
      {link: "https://www.github.com/mobiuous/cloudboard", label: "Live Demo"},
    ]
  },
];

export default function ProjectsPage() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <BaseLayout>
      <DottedGridBackground fixed={true} />

      <div className="min-h-screen overflow-hidden px-6 py-48">
        <div className="mx-auto flex max-w-4xl flex-col gap-6">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-primary"
                style={{ animation: "fade-in 1s ease-in-out" }}>Projects</h1>
            <p className={`text-xs text-primary mt-2 ${inter.className}`}
                style={{ animation: "fade-in 1s ease-in-out" }}>These are some projects I've worked on, click on the orange buttons to learn more about each project!</p>
          </div>

          {projects.map((project, index) => {
            const isExpanded = project.id === expandedId;
            const animationDelay = `${index * 250}ms`;

            return (
              <div
                key={project.id}
                className="min-h-[180px] rounded-2xl slight-accent p-8 shadow-lg backdrop-blur-sm"
                style={{
                  animation: "fade-in 1s ease-in-out",
                  animationDelay,
                  animationFillMode: "both",
                }}
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="space-y-2">
                    <h2 className="text-xl font-semibold text-primary">{project.title}</h2>
                    <p className="text-sm text-primary">{project.summary}</p>
                    <div className={`flex mt-4 flex-wrap gap-3`}>
                      {project.externalLinks?.map((link) => (
                        <a
                          key={link.label}
                          href={link.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[0.675rem] uppercase tracking-wide text-blue-600 hover:underline extern-link-icon"
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setExpandedId(isExpanded ? null : project.id)}
                    className="cursor-pointer rounded-full max-w-8 min-w-8 max-h-8 min-h-8 px-1 py-1 text-sm font-light text-white bg-accent hover:bg-[#a14939] transition-colors duration-100"
                  >
                    {isExpanded ? "▲" : "▼"}
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

                    <div className="flex flex-row justify-between">
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
              </div>
            );
          })}
        </div>
      </div>
    </BaseLayout>
  );
}