"use client";

import { useParams } from "next/navigation";
import BaseLayout from "@/app/components/base-layout";
import DottedGridBackground from "@/app/components/dotted-grid-background";

export default function BlogPost() {
  const router = useParams();
  const slug = router.slug;

  return (
    <BaseLayout> 
      <DottedGridBackground />

      <div className="relative flex flex-col items-center min-h-screen overflow-hidden pt-64">
        <p> {slug} </p>
      </div>
    </BaseLayout>
  );
}