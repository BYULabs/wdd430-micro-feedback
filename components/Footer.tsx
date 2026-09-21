import Link from 'next/link';

const footerLinks = [
    { href: '/explore', label: 'Explore' },
    { href: '/projects', label: 'Projects' },
    { href: '/admin', label: 'Admin' },
];

export function Footer() {
    return (
        <footer className="border-t border-white/[.08] bg-[#09090b] text-sm text-zinc-500">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-7 sm:flex-row sm:items-center sm:justify-between">
                <p>&copy; 2026 ProductHub. Built for indie developers.</p>
                <nav aria-label="Footer navigation" className="flex items-center gap-4">
                    {footerLinks.map((link) => (
                        <Link key={link.href} href={link.href} className="transition-colors hover:text-zinc-200">
                            {link.label}
                        </Link>
                    ))}
                </nav>
            </div>
        </footer>
    );
}