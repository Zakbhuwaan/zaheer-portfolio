export interface Project {
    id: string;
    title: string;
    description: string;
    category: 'ai' | 'fullstack';
    status: 'Completed' | 'In Progress';
    techStack: string[];
    image?: string;
    url?: string;
}