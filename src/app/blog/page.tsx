"use client";

import BaseLayout from "../components/base-layout";
import DottedGridBackground from "../components/dotted-grid-background";
import { useEffect, useRef, useState } from "react";

const blogs = [
  {
    slug: "building-a-personal-website",
    title: "Building a Poo",
    date: "September 20, 2026",
    dateTime: "2026-09-20",
    excerpt: "A poo",
  },
  {
    slug: "lessons-from-learning-in-public",
    title: "Test Blog",
    date: "August 28, 2026",
    dateTime: "2026-08-28",
    excerpt: "A test blog post for testing",
  },
  {
    slug: "small-projects-big-lessons",
    title: "Lorem Ipsum",
    date: "July 14, 2026",
    dateTime: "2026-07-14",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipisching elit.",
  },
];

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState("");
  const hasMounted = useRef(false);
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(normalizedQuery),
  );

  useEffect(() => {
    hasMounted.current = true;
  }, []);

  return (
    <BaseLayout>
      <DottedGridBackground fixed={true}/>

      <div className="relative flex min-h-screen flex-col items-center overflow-hidden px-4 pb-20 pt-36 sm:px-6 sm:pt-44">
        <div className="z-10 w-full max-w-3xl">
          <h1 className="text-center text-3xl font-light uppercase tracking-[0.2em] text-secondary"
              style={{ animation: "fade-in 1s ease-in-out" }}>
            Blog
          </h1>

          <label className="sr-only" htmlFor="blog-search">
            Search blogs
          </label>
          <input
            id="blog-search"
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search blogs"
            className="mt-8 w-full rounded-full px-5 py-3 slight-accent text-primary outline-none placeholder:text-primary/60"
            style={{ animation: "fade-in 1s ease-in-out" }}
          />

          <div className="mt-12 space-y-4">
            {filteredBlogs.map((blog, index) => (
              <a
                key={blog.slug}
                href={`/blog/${blog.slug}`}
                className="group block rounded-2xl slight-accent p-6"
                style={hasMounted.current ? undefined : {
                  animation: "fade-in 1s ease-in-out",
                  animationDelay: `${index * 150}ms`,
                  animationFillMode: "both",
                }}
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                  <h2 className="text-xl text-primary transition-colors duration-200 group-hover:text-secondary">
                    {blog.title}
                  </h2>
                  <time className="text-sm text-primary" dateTime={blog.dateTime}>
                    {blog.date}
                  </time>
                </div>
                <p className="mt-3 text-primary">{blog.excerpt}</p>
              </a>
            ))}
            {filteredBlogs.length === 0 && (
              <p className="text-center text-xl font-light uppercase tracking-[0.2em] text-secondary">No blogs found</p>
            )}
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}