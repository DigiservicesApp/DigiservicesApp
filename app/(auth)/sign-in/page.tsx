import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[color:var(--md-sys-color-surface)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <SignIn
          appearance={{
            elements: {
              formButtonPrimary:
                'bg-[color:var(--md-sys-color-primary)] hover:bg-[color:color-mix(in_srgb,var(--md-sys-color-primary)_90%,transparent)] text-[color:var(--md-sys-color-on-primary)]',
              footerActionLink:
                'text-[color:var(--md-sys-color-primary)] hover:text-[color:color-mix(in_srgb,var(--md-sys-color-primary)_90%,transparent)]',
            },
          }}
          afterSignInUrl="/dashboard"
          signUpUrl="/sign-up"
        />
      </div>
    </div>
  );
}
