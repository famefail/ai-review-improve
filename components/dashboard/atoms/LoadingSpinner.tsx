export default function LoadingSpinner() {
  return (
    <div className="flex flex-col justify-center items-center h-64">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-purple-600 rounded-full animate-ping opacity-20" />
      </div>
      <p className="mt-4 text-gray-600 animate-pulse">กำลังโหลดข้อมูล...</p>
    </div>
  );
}
