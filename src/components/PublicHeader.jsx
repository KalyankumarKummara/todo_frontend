import { Link, NavLink } from "react-router-dom";

const PublicHeader = () => {
    return (
        <header className="sticky top-0 z-50 bg-neutral-white/80 backdrop-blur-xl border-b border-neutral-light/60 shadow-sm">
            
            <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-3 group transition-opacity hover:opacity-90">
                    
                    <div className="w-11 h-11 bg-gradient-to-br from-primary via-primary to-accent rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-primary/30 group-hover:scale-105">
                        <svg
                            className="w-6 h-6 text-neutral-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2.5}
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </div>

                    <span className="font-heading font-semibold text-xl text-neutral-darkest tracking-tight">
                        TodoPro
                    </span>
                </Link>
                <nav className="hidden md:flex items-center gap-2">
                    {["Features", "Pricing", "About", "Contact"].map((item) => (
                        <a
                            key={item}
                            href="#"
                            className="relative px-4 py-2 text-sm font-body font-medium text-neutral-dark hover:text-primary transition-colors duration-200 group"
                        >
                            {item}
                            
                            <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary scale-x-0 transition-transform duration-300 ease-out origin-left group-hover:scale-x-100" />
                        </a>
                    ))}
                </nav>

                <div className="flex items-center gap-3">
                    <NavLink
                        to="/login"
                        className="px-5 py-2.5 text-sm font-body font-medium text-neutral-dark hover:text-primary transition-colors duration-200"
                    >
                        Login
                    </NavLink>

                    <NavLink
                        to="/signup"
                        className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-primary to-accent text-neutral-white text-sm font-body font-semibold shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/35 hover:from-primary-hover hover:to-accent-hover transition-all duration-200 hover:-translate-y-0.5"
                    >
                        Get Started
                    </NavLink>
                </div>
            </div>
        </header>
    );
};

export default PublicHeader;