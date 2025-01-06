import React from "react";
import { prisma } from "~/lib/prisma";
import UsersTable from "~/components/Users/Table/UsersTable";
import AddUserDialog from "~/components/Users/AddUserDialog";

export const metadata = {
  title: "Users",
}

const UsersPage = async () => {
  const users = await prisma.user.findMany({
    include: {
      profile: true
    }
  });

  return (
    <div className="flex flex-col items-end">
      <AddUserDialog />
      <UsersTable users={users} />
    </div>
  );
};

export default UsersPage;
