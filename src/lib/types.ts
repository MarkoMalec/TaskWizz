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
    profile: Profile | null,
    id: string,
    name: string | null,
    email: string | null,
    image: string | null,
    role: string,
    tasks?: object | null,
}