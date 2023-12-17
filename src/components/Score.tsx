interface ScoreProps {
  score: number;
}
const Score: React.FC<ScoreProps> = ({ score }) => {
  return <span className=" text-6xl text-red-200">{score}</span>;
};

export default Score;
