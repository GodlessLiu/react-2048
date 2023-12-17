interface CeilProps {
  value: number;
}

const valueColorMap: Record<string, string> = {
  0: '303030',
  2: '2196F3',
  4: '4CAF50',
  8: 'FFC107',
  16: 'FF9800',
  32: 'FF5722',
  64: '795548',
  128: '607D8B',
  256: '9C27B0',
  512: '673AB7',
  1024: '3F51B5',
  2048: 'E91E63',
};

const Ceil: React.FC<CeilProps> = ({ value }) => {
  return (
    <li
      className={`aspect-square bg-${
        valueColorMap[value + '']
      }  flex justify-center items-center list-none  rounded-lg text-white`}
    >
      {value ? value : ''}
    </li>
  );
};

export default Ceil;
