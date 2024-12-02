export type SessionType = {
    id: string,
    name: string,
    email: string,
    image: string,
}

type Profile = {
    id: string;
    function: string | null;
    profession: string | null;
    hasTransport: boolean | null;
    userId: string;
  };

export type User = {
    profile?: Profile | null,
    id: string | null,
    name: string | null,
    email: string | null,
    image: string | null,
    role: string | null,
    tasks?: object | null,
}

export type Note = {
    id: string,
    content: string,
    createdAt: Date,
    updatedAt: Date,
    createdBy: {
        id: string,
        name: string,
        image: string,
    }
}