// ...existing code...
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
const Footer = () => {
  return (
    <footer className="bg-foreground mx-auto flex items-start justify-center gap-10 px-8 py-12">
      <div className="mr-12">
        <div className="flex items-center gap-2">
          <LocalLibraryIcon className="text-accent" />
          <p className="font-bold text-white">Library Management</p>
        </div>
        <p className="text-primary-light mt-4 max-w-sm font-medium">
          Your modern digital library solution for the 21st century
        </p>
      </div>
      <div className="flex items-start justify-between gap-60">
        <div>
          <p className="text-white">Quick Links</p>
          <div className="text-primary-light mt-4 flex flex-col gap-2">
            <p className="hover:text-accent">About Us</p>
            <p className="hover:text-accent">Collections</p>
            <p className="hover:text-accent">Services</p>
          </div>
        </div>
        <div>
          <p className="text-white">Support</p>
          <div className="text-primary-light mt-4 flex flex-col gap-2">
            <p className="hover:text-accent">Help Center</p>
            <p className="hover:text-accent">Contact</p>
            <p className="hover:text-accent">FAQs</p>
          </div>
        </div>
        <div>
          <p className="text-white">Legal</p>
          <div className="text-primary-light mt-4 flex flex-col gap-2">
            <p className="hover:text-accent">Privacy Policy</p>
            <p className="hover:text-accent">Term of Service</p>
            <p className="hover:text-accent">Cookie Policy</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
// ...existing code...
