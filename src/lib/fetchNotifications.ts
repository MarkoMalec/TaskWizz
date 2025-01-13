import { prisma } from "~/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";

export async function fetchNotifications() {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;
  return await prisma.notification.findMany({
    where: {
      userId,
    },
  });
}
