import Loading from "./Loading";

interface IAnswerBlock {
  isLoading: boolean;
  data: string;
  title: string;
}

const AnswerBlock = ({ isLoading, data, title }: IAnswerBlock) => {
  return (
    <div>
      <h1>{title}</h1>
      <div className="bg-gray-100 border border-gray-300 rounded-md p-4 whitespace-pre-wrap font-mono h-full">
        {isLoading ? (
          <div className="flex items-center justify-center">
            <Loading />
          </div>
        ) : (
          data
        )}
      </div>
    </div>
  );
};
export default AnswerBlock;
