import {Resource} from "./resources";

export interface Process {
    id: string;
    name: string;
    description: string;
    minAge: number;
    maxAge: number;
    image: File;
    nationalities: string[];
    universities: string[];
    steps: Step[];
}

export interface Document {
    id: string;
    name: string;
    description: string;
    url?: string;
    image?: File;
}

export interface Step {
    id: string;
    name: string;
    description: string;
    requiredDocuments: Document[];
    resources: Resource[];
}

export interface Category {
    id: string;
    name: string;
    description: string;
    image: File;
    administrativeProcesses: string[];
    color: string;
}

export interface FileInfo {
    name: string;
    type: string;
    size: number;
    data?: any;
}

export interface Deal {
    id: string;
    name: string;
    description: string;
    image: string;
    start_date: string;
    end_date: string;
    status: string;
}