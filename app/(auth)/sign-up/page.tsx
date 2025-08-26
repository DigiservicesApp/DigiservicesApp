import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[color:var(--md-sys-color-surface)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <SignUp
          appearance={{
            elements: {
              formButtonPrimary:
                'bg-[color:var(--md-sys-color-primary)] hover:bg-[color:color-mix(in_srgb,var(--md-sys-color-primary)_90%,transparent)] text-[color:var(--md-sys-color-on-primary)]',
              footerActionLink:
                'text-[color:var(--md-sys-color-primary)] hover:text-[color:color-mix(in_srgb,var(--md-sys-color-primary)_90%,transparent)]',
            },
          }}
          afterSignUpUrl="/dashboard"
          signInUrl="/sign-in"
        />
      </div>
    </div>
  );
}
