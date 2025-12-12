export default function StatusBadge({ status }) {
  const styles = {
    Pass: "bg-green-100 text-green-700",
    Fail: "bg-red-100 text-red-700",
    Partial: "bg-yellow-100 text-yellow-800",
    NR: "bg-gray-200 text-gray-700",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm ${styles[status]}`}>
      {status}
    </span>
  );
}
