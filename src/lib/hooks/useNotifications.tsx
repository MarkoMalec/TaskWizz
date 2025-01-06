import { prisma } from "../prisma";

const useNotifications = async (userId: string) => {
    const notifications = await prisma.notification.findMany({
        where: {
            userId: userId,
        },
    });

    // console.log(notifications);

    return notifications ;
}

export { useNotifications };