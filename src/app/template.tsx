import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";
import { prisma } from "~/lib/prisma";
import Header from "~/components/elements/Header/Header";

export default async function Template({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <>Loading...</>;
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  return (
    <>
      <Header user={user} />
      <main className="container">{children}</main>
    </>
  );
}
