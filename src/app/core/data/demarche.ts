interface Demarche {
    id: string;
    titre: string;
    description: string;
    type: string;
    listeDeDoc: Document[];
    etapes: Etape[];
}

interface Document {
    id: string;
    titre: string;
    description: string;
    type: string;
    url?: string;
}

interface Etape {
    id: string;
    titre: string;
    description: string;
    type: string;
    docs: Document[];
}
