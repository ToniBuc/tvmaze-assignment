export interface Show {
    score: number;
    show: ShowDetails;
}

export interface ShowDetails {
    id: number;
    name: string;
    runtime: number;
    averageRuntime: number;
    type: string;
    genres: string[];
    summary: string;
    status: string;
    rating: Rating;
    network: Network;
    webChannel: WebChannel;
    language: string;
    image: Image;
    premiered: string;
}

export interface Rating {
    average: number;
}

export interface Network {
    name: string;
    // ...
}

export interface WebChannel {
    name: string;
    // ...
}

export interface Image {
    medium: string;
    original: string;
}

// cast 

export interface CastMember {
    character: Character;
    person: Person;
}

export interface Character {
    name: string;
    // ...
}

export interface Person {
    name: string;
    image: Image;
}