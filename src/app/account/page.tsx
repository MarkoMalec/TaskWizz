import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";
import UserAccountForm from "~/components/forms/UserAccountForm";

const Account = async () => {
  const session = await getServerSession(authOptions);

  const user = await prisma.user.findUnique({
    where: { id: session?.user.id },
  });

  return <UserAccountForm userData={user} />;
};

export default Account;
