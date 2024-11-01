'use client'

import { useRouter } from 'next/router';

export default function ErrorPage() {
  const router = useRouter();
  const { error } = router.query;

  return (
    <div>
      {error === 'CredentialsSignin' && (
        <p>Invalid login credentials. Please try again.</p>
      )}
      {/* Handle other error types as needed */}
    </div>
  );
}
