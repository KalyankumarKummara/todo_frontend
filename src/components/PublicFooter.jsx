const PublicFooter = () => {
    return (
        <footer className="bg-neutral-white border-t border-neutral-light">
            <div className="max-w-7xl mx-auto px-6 py-16 lg:py-20">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
                    {/* Brand - Takes more space on large screens */}
                    <div className="lg:col-span-4">
                        <a href="/" className="inline-flex items-center gap-3 group mb-5">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-sm transition-shadow group-hover:shadow-md">
                                <svg
                                    className="w-6 h-6 text-neutral-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>

                            <span className="font-heading font-semibold text-xl text-neutral-darkest">
                                TodoPro
                            </span>
                        </a>

                        <p className="text-sm font-body text-neutral-dark leading-relaxed max-w-xs">
                            A modern task management platform to plan, track and complete your
                            work efficiently.
                        </p>
                    </div>

                    {/* Product */}
                    <div className="lg:col-span-2 lg:col-start-6">
                        <h4 className="font-heading font-semibold text-sm uppercase tracking-wide text-neutral-darkest mb-5">
                            Product
                        </h4>
                        <ul className="space-y-3.5">
                            <li>
                                <a 
                                    href="#" 
                                    className="text-sm font-body text-neutral-dark hover:text-primary transition-colors duration-200 inline-block"
                                >
                                    Features
                                </a>
                            </li>
                            <li>
                                <a 
                                    href="#" 
                                    className="text-sm font-body text-neutral-dark hover:text-primary transition-colors duration-200 inline-block"
                                >
                                    Pricing
                                </a>
                            </li>
                            <li>
                                <a 
                                    href="#" 
                                    className="text-sm font-body text-neutral-dark hover:text-primary transition-colors duration-200 inline-block"
                                >
                                    Integrations
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div className="lg:col-span-2">
                        <h4 className="font-heading font-semibold text-sm uppercase tracking-wide text-neutral-darkest mb-5">
                            Resources
                        </h4>
                        <ul className="space-y-3.5">
                            <li>
                                <a 
                                    href="#" 
                                    className="text-sm font-body text-neutral-dark hover:text-primary transition-colors duration-200 inline-block"
                                >
                                    Documentation
                                </a>
                            </li>
                            <li>
                                <a 
                                    href="#" 
                                    className="text-sm font-body text-neutral-dark hover:text-primary transition-colors duration-200 inline-block"
                                >
                                    FAQS
                                </a>
                            </li>
                            <li>
                                <a 
                                    href="#" 
                                    className="text-sm font-body text-neutral-dark hover:text-primary transition-colors duration-200 inline-block"
                                >
                                    Support
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div className="lg:col-span-2">
                        <h4 className="font-heading font-semibold text-sm uppercase tracking-wide text-neutral-darkest mb-5">
                            Legal
                        </h4>
                        <ul className="space-y-3.5">
                            <li>
                                <a 
                                    href="#" 
                                    className="text-sm font-body text-neutral-dark hover:text-primary transition-colors duration-200 inline-block"
                                >
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a 
                                    href="#" 
                                    className="text-sm font-body text-neutral-dark hover:text-primary transition-colors duration-200 inline-block"
                                >
                                    Terms of Service
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-neutral-light/60">
                <div className="max-w-7xl mx-auto px-6 py-7">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-xs font-body text-neutral-dark/80">
                            © TodoPro. All rights reserved.
                        </p>

                        <div className="flex gap-6">
                            <a 
                                href="#" 
                                className="text-xs font-body text-neutral-dark/80 hover:text-primary transition-colors duration-200"
                            >
                                Privacy
                            </a>
                            <a 
                                href="#" 
                                className="text-xs font-body text-neutral-dark/80 hover:text-primary transition-colors duration-200"
                            >
                                Terms
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default PublicFooter;