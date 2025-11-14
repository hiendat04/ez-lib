import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
const footerLinks = [
  {
    title: "Quick Links",
    links: ["About Us", "Collections", "Services"],
  },
  {
    title: "Support",
    links: ["Help Center", "Contact", "FAQs"],
  },
  {
    title: "Legal",
    links: ["Privacy Policy", "Term of Service", "Cookie Policy"],
  },
];
const Footer = ({  }) => {
  return (
    <footer className="bg-foreground mx-auto flex items-start justify-center gap-10 px-8 py-12">
      <div className="mr-12">
        <div className="flex items-center gap-2">
          <LocalLibraryIcon className="text-accent" />
          <p className="font-bold text-white">Library Management</p>
        </div>
        <p className="text-primary-light mt-4 max-w-sm font-medium">
          {}
        </p>
      </div>
      <div className="flex items-start justify-between gap-60">
        {footerLinks.map((section) => (
          <div key={section.title}>
            <p className="text-white">{section.title}</p>
            <div className="text-primary-light mt-4 flex flex-col gap-2">
              {section.links.map((link) => (
                <p key={link} className="hover:text-accent">
                  {link}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </footer>
  );
};
export default Footer;
