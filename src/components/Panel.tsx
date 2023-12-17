import { useReducer, useEffect } from 'react';
import {
  initGame,
  computedSocre,
  gameOver,
  Action,
  GameBox,
  addACeil,
  isArrayLike,
  saveGame,
} from '../utils/game';
import Ceil from './Ceil';
import Cheat from './Cheat';
import Score from './Score';
import swipeDetect from '../utils/mobileEvent';
function gameReducer(box: GameBox, action: GameRducerAction) {
  if (action.type === 'undo') {
    return Action['undo']();
  }
  saveGame(box);
  let temp = Action[action.type](box);
  if (isArrayLike(temp, box)) {
    return box;
  } else {
    temp = addACeil(temp);
    return temp;
  }
}

export interface GameRducerAction {
  type: 'up' | 'left' | 'down' | 'right' | 'undo';
}

interface PanelProps {
  level: number;
}
const Panel: React.FC<PanelProps> = ({ level }) => {
  const [game, dispatch] = useReducer(gameReducer, initGame(level));
  function handlerClick(action: GameRducerAction['type']) {
    dispatch({
      type: action,
    });
  }
  const socre = computedSocre(game);
  const gameOverFlag = gameOver(game);

  useEffect(() => {
    const handlerKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          handlerClick('up');
          break;
        case 'ArrowDown':
          handlerClick('down');
          break;
        case 'ArrowLeft':
          handlerClick('left');
          break;
        case 'ArrowRight':
          handlerClick('right');
          break;
      }
    };
    window.addEventListener('keydown', handlerKeyDown);
    swipeDetect(document, (dir) =>
      dispatch({
        type: dir,
      })
    );
    return () => {
      window.removeEventListener('keydown', handlerKeyDown);
    };
  }, []);

  return (
    <>
      <Cheat gameOverFlag={gameOverFlag} />
      <button
        onClick={() => handlerClick('undo')}
        className=" p-2 mx-2 rounded bg-blue-300 text-white"
      >
        Undo
      </button>
      <br />
      <Score score={socre} />
      <div className={`game w-80 gap-2 grid grid-cols-${level}`}>
        {game.map((row) => {
          return row.map((ceil, index) => {
            return <Ceil value={ceil} key={index} />;
          });
        })}
      </div>
      <div className=" flex flex-row justify-center pt-10">
        <button
          onClick={() => handlerClick('up')}
          className=" mx-2 bg-gray-200 p-2 up"
        >
          ↑
        </button>
        <button
          className=" mx-2 bg-gray-200 p-2 left"
          onClick={() => handlerClick('left')}
        >
          ←
        </button>
        <button
          className=" mx-2 bg-gray-200 p-2 down"
          onClick={() => handlerClick('down')}
        >
          ↓
        </button>
        <button
          className=" mx-2 bg-gray-200 p-2 right"
          onClick={() => handlerClick('right')}
        >
          →
        </button>
      </div>
    </>
  );
};

export default Panel;
