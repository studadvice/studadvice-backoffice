import {Resource} from "./resources";

export interface Process {
    id: string;
    name: string;
    description: string;
    steps: Step[];
}

export interface Document {
    id: string;
    name: string;
    description: string;
    link?: string;
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