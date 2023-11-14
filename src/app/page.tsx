import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/signin');
  }

  if (session && session.user.role === 'admin') {
    redirect('/admin');
  }

  if (session && session.user.role !== 'admin') {
    redirect('/dashboard');
  }

  return (
    <div>How did you even get here?</div>
  );
}
