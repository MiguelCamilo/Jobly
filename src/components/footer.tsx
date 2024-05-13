import Link from "next/link";

const Footer = () => {
  const links = [
    {
      href: "/about",
      label: "About Jobly",
    },
    // {
    //   href: "/terms",
    //   label: "Terms of Service",
    // },
    // {
    //   href: "/privacy",
    //   label: "Privacy Policy",
    // },
  ];
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-5xl space-y-5 px-3 py-5">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Jobly</h3>
            <p className="text-sm text-muted-foreground">
              Connecting talents with opportunities
            </p>
          </div>
          <div className="flex flex-wrap gap-5 text-sm text-muted-foreground">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:cursor-pointer hover:underline"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Jobly, Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
