import BaseLayout from "../components/base-layout";
import DottedGridBackground from "../components/dotted-grid-background";

export default function About() {
  return (
    <BaseLayout> 
      <DottedGridBackground />

      <div className="flex flex-col items-center justify-center min-h-screen overflow-hidden">
        <div className="max-w-2xl w-full text-center z-20">
          <h1 className="text-4xl font-bold text-primary mb-8">About Me</h1>
          
          <div className="slight-accent rounded-lg p-8 shadow-lg border-themed text-left">
            <p className="text-primary mb-4">
              I do websites and cloud stuff
            </p>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}