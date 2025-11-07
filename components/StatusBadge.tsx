const StatusBadge = ({ isAvailable }: { isAvailable: boolean }) => {
  return (
    <>
      {isAvailable ? (
        <p className="rounded-full bg-green-600 px-3 py-1 text-sm font-medium text-white">
          Available
        </p>
      ) : (
        <p className="rounded-full bg-red-600 px-3 py-1 text-sm font-medium text-white">
          Unavailable
        </p>
      )}
    </>
  );
};
export default StatusBadge;
