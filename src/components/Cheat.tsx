import React from 'react';

let timer: number | undefined = undefined;

function cheatStart() {
  const r = document.getElementsByClassName('right')[0] as HTMLButtonElement;
  const d = document.getElementsByClassName('down')[0] as HTMLButtonElement;
  const l = document.getElementsByClassName('left')[0] as HTMLButtonElement;
  const u = document.getElementsByClassName('up')[0] as HTMLButtonElement;
  timer = setInterval(() => {
    Math.random() > 0.5 ? r.click() : null;
    Math.random() > 0.5 ? d.click() : null;
    Math.random() > 0.5 ? l.click() : null;
    Math.random() > 0.5 ? u.click() : null;
    console.log('timer run');
  }, 200);
}

function cheatStop() {
  clearInterval(timer);
  timer = undefined;
}

interface CheatProps {
  gameOverFlag: boolean;
}
const Cheat: React.FC<CheatProps> = ({ gameOverFlag }) => {
  if (gameOverFlag) {
    clearInterval(timer);
  }
  return (
    <>
      <button
        onClick={() => cheatStart()}
        className=" p-2 rounded bg-red-500 text-white mr-2"
      >
        原神启动！！
      </button>
      <button
        onClick={() => cheatStop()}
        className="p-2 rounded bg-red-500 text-white"
      >
        暂停
      </button>
    </>
  );
};

export default Cheat;
