import BaseLayout from "../components/base-layout";
import DottedGridBackground from "../components/dotted-grid-background";

export default function ProjectsPage() {
    return (
        <BaseLayout>
            <DottedGridBackground />
            
            <div className="flex flex-col items-center justify-center min-h-screen overflow-hidden">
                <h1 className="text-primary">Projects</h1>
            </div>
        </BaseLayout>
    );
}