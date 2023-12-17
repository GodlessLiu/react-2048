import Panel from './components/Panel';
import './styles/presets.css';

function App() {
  const level = 4;
  return (
    <div className=" flex flex-row justify-center items-center h-screen w-screen">
      <div>
        <Panel level={level} />
      </div>
    </div>
  );
}

export default App;
