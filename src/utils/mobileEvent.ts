type CallbackFn = (swipeDir: Arrow) => void;

type Arrow = 'left' | 'right' | 'up' | 'down';

export default function swipeDetect(el: Document, callback: CallbackFn) {
  let swipeDir: Arrow;
  let startX: number;
  let startY: number;
  let distX;
  let distY;
  // required min distance traveled to be considered swipe
  const threshold = 75;
  // maximum distance allowed at the same time in perpendicular direction
  const restraint = 50;
  // maximum time allowed to travel that distance
  const allowedTime = 300;
  let elapsedTime;
  let startTime: number;

  el.addEventListener(
    'touchstart',
    (e: TouchEvent) => {
      const touchobj = e.changedTouches[0];
      startX = touchobj.pageX;
      startY = touchobj.pageY;
      // record time when finger makes first touch with surface
      startTime = new Date().getTime();
      e.preventDefault();
    },
    false
  );

  el.addEventListener(
    'touchmove',
    (e) => {
      // prevent scrolling when inside DIV
      e.preventDefault();
    },
    false
  );

  el.addEventListener(
    'touchend',
    (e: TouchEvent) => {
      const touchobj = e.changedTouches[0];
      // get horizontal dist traveled by finger while in contact with surface
      distX = touchobj.pageX - startX;
      // get vertical dist traveled by finger while in contact with surface
      distY = touchobj.pageY - startY;
      // get elapsed time
      elapsedTime = new Date().getTime() - startTime;
      // first condition for swipe met
      if (elapsedTime <= allowedTime) {
        // 2nd condition for horizontal swipe met
        if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
          // if dist traveled is negative, it indicates left swipe
          swipeDir = distX < 0 ? 'left' : 'right';
          // 2nd condition for vertical swipe met
        } else if (
          Math.abs(distY) >= threshold &&
          Math.abs(distX) <= restraint
        ) {
          // if dist traveled is negative, it indicates up swipe
          swipeDir = distY < 0 ? 'up' : 'down';
        }
      }
      callback(swipeDir);
      e.preventDefault();
    },
    false
  );
}
