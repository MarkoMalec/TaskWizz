import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";

export const isAdmin = async () => {
    const session = await getServerSession(authOptions);

    return session?.user.role === "admin";
}
