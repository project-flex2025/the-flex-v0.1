// src/app/[slug]/page.js
import fs from 'fs';
import path from 'path';

// Import your components
import DashboardComponent from '../components/DashboardComponent';


const componentMap = {
    DashboardComponent
};

export async function generateStaticParams() {
    const filePath = path.join(process.cwd(), 'public', 'main.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContents);

    return data.pages.map((page: any) => ({
        slug: page.route.replace('/', ''),
    }));
}

export default async function Page({ params }: any) {
    const filePath = path.join(process.cwd(), 'public', 'main.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContents);

    const pageData = data.pages.find(
        (page: any) => page.route === `/${params.slug}`
    );

    if (!pageData) {
        return <h1>Page not found</h1>;
    }

    const MainComponent = componentMap[pageData.mainComponent];
    console.log("page data", pageData?.route)

    return (
        <div>
            <p>{pageData.name}</p>
            {MainComponent ? (
                <MainComponent />
            ) : (
                <p>Main component not found.</p>
            )}

        </div>
    );
}
