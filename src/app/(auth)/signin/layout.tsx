
export const metadata = {
  title: "SkillSync | Sign In",
};


export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen text-white flex items-center justify-center p-6">
      {children}
    </main>
  );
}

