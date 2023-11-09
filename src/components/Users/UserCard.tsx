import React from "react";
import Image from "next/image";
import Link from "next/link";

type UserCard = {
  id?: string | null;
  name?: string | null;
  key: string | null;
  image: string | undefined | null;
};

const UserCard = ({ id, name, image }: UserCard) => {
  return (
    <div className="rounded-lg bg-white/20 p-3">
      <div className="flex items-center gap-4">
        <Image
          src={`${image}`}
          alt="User's avatar"
          width="64"
          height="64"
          className="rounded-full"
        />
        <h3>{name}</h3>
      </div>
      <small>{id}</small>
      <Link href={`/users/${id}`} className="block mt-10 w-fit ml-auto mr-4">See user {`-->`}</Link>
    </div>
  );
};

export default UserCard;
