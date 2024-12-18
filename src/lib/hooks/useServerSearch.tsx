import { prisma } from "../prisma";

const useServerSearch = async (inputSearch: string) => {
    const tasks = await prisma.task.findMany({
        where: {
            OR: [
                { name: { contains: inputSearch } },
                { priority: { contains: inputSearch } },
                { status: { contains: inputSearch } },
                { address: { contains: inputSearch } },
                { city: { contains: inputSearch } },
                // { TaskNote: { some: { note: { contains: inputSearch } } } }
            ]
        },
        orderBy: { dateCreated: "desc" },
        take: 5,
        select: {
            id: true,
            name: true,
            priority: true,
            status: true,
            deadline: true,
            address: true,
            city: true,
            TaskNote: true,
        },
    });

    console.log(tasks, 'hehe');

    return tasks;
};

export default useServerSearch;