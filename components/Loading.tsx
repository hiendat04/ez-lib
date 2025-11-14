import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";

const Loading = ({ text }: { text: string }) => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <LocalLibraryIcon
          className="text-primary mx-auto animate-pulse"
          sx={{ fontSize: "80px" }}
        />
        <h2 className="mt-4 text-2xl font-semibold text-gray-900">EzLib</h2>
        <p className="mt-2 text-gray-600">{text}</p>
        <div className="mt-6 flex justify-center">
          <div className="border-primary h-8 w-8 animate-spin rounded-full border-b-2"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
