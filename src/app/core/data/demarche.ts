import {Resource} from "./resources";

export interface Procedure {
    id: string;
    name: string;
    description: string;
    steps: Step[];
}

export interface Document {
    id: string;
    title: string;
    description: string;
    type: string;
    url?: string;
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
    procedures: string[];
}

export interface FileInfo {
    name: string;
    type: string;
    size: number;
    data?: any;
}