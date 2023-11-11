import {Resource} from "./resources";

export interface Procedure {
    id: string;
    title: string;
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
    title: string;
    description: string;
    requiredDocuments: Document[];
    resources: Resource[];
}

export interface SubCategory {
    name: string;
    description: string;
    procedures: Procedure[];
}

export interface Category {
    name: string;
    description: string;
    image: string;
    subCategories: SubCategory[];
}
