import {Resource} from "./resources";

export interface Process {
    id: string;
    name: string;
    description: string;
    minAge: number;
    maxAge: number;
    image: string;
    nationalities: string[];
    universities: string[];
    steps: Step[];
}

export interface Document {
    id: string;
    name: string;
    description: string;
    url?: string;
    image?: string;
}

export interface Step {
    id: string;
    name: string;
    description: string;
    documents: Document[];
    resources: Resource[];
}

export interface Category {
    id: string;
    name: string;
    description: string;
    image: string;
    process: string[];
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