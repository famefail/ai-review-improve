import Loading from "@/components/general/Loading";

interface IAnswerBlock {
  isLoading: boolean;
  data: string;
  title: string;
}

const AnswerBlock = ({ isLoading, data, title }: IAnswerBlock) => {
  return (
    <div className="w-full ">
      {title && (
        <h3 className="text-lg text-black font-medium mb-2">{title}</h3>
      )}

      <div className="bg-gray-50 border border-gray-200 rounded-lg shadow-sm p-4 min-h-[180px] h-full">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <Loading />
          </div>
        ) : (
          <div className="whitespace-pre-wrap text-black font-mono overflow-auto">
            {data}
          </div>
        )}
      </div>
    </div>
  );
};

export default AnswerBlock;
