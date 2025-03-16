import { Link } from "wouter";

export default function Nav() {
  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/">
          <a className="text-xl font-bold">AI Job Impact</a>
        </Link>
        <div className="flex gap-4">
          <Link href="/jobs">
            <a className="hover:text-primary">Browse Jobs</a>
          </Link>
        </div>
      </div>
    </nav>
  );
}
