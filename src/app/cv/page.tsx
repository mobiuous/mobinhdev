import DottedGridBackground from "../components/dotted-grid-background";
import BaseLayout from '../components/base-layout';

export default function CVPage() {

    return (
        <BaseLayout>
            <DottedGridBackground fixed={true} />

            <div className="flex flex-col items-center justify-center pt-20 md:pt-24 pb-4">
                <div className="w-full max-w-4xl aspect-[4/5] z-20">
                    <iframe 
                        src="https://drive.google.com/file/d/1YDcs1gVbVEcx5oIqFbvMNLg0W2t4K2LE/preview?embedded=true&rm=minimal" 
                        className="w-full h-full border-0 overflow-hidden"
                        title="Mobin CV"
                    />
                </div>
            </div>
        </BaseLayout>
    );
}