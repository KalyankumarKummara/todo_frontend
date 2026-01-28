function AppFooter() {
    return (
        <footer className="
      border-t border-neutral-light
      dark:border-neutral-dark/40
      bg-neutral-white
      dark:bg-neutral-dark
    ">
            <div className="
        max-w-7xl mx-auto px-6 py-4
        flex flex-col sm:flex-row
        items-center justify-between gap-3
        text-sm
        text-neutral-dark
        dark:text-neutral-light
      ">

                <p className="font-body">
                    © TodoPro. All rights reserved.
                </p>

                <div className="flex items-center gap-6 font-body">
                    <a
                        href="/privacy"
                        className="hover:text-primary transition"
                    >
                        Privacy
                    </a>
                    <a
                        href="/terms"
                        className="hover:text-primary transition"
                    >
                        Terms
                    </a>
                    <a
                        href="/support"
                        className="hover:text-primary transition"
                    >
                        Support
                    </a>
                </div>

            </div>
        </footer>
    );
}

export default AppFooter;
