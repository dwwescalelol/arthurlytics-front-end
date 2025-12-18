export function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-400 px-6 py-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between text-sm text-muted-foreground">
        <div>© {new Date().getFullYear()} DJAZE Inc. All rights reserved.</div>

        <div className="flex gap-4">
          <a href="/contact" className="hover:text-foreground">
            Contact
          </a>
          <a href="/privacy" className="hover:text-foreground">
            Privacy
          </a>
          <a href="/terms" className="hover:text-foreground">
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
}
