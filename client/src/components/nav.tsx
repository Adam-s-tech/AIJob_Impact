import { Link } from "wouter";
import { Brain } from "lucide-react";

export default function Nav() {
  return (
    <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/">
          <a className="flex items-center gap-2 text-xl font-bold text-violet-600">
            <Brain className="h-6 w-6" />
            Next Gen AI
          </a>
        </Link>
        <div className="flex gap-6">
          <Link href="/jobs">
            <a className="hover:text-violet-600 transition-colors">Impacts IA</a>
          </Link>
          <a href="#services" className="hover:text-violet-600 transition-colors">Services</a>
          <a href="#about" className="hover:text-violet-600 transition-colors">À propos</a>
          <a href="#contact" className="hover:text-violet-600 transition-colors">Contact</a>
        </div>
      </div>
    </nav>
  );
}