/**
 * Global Refresh Rate Controller
 * Enforces a target refresh rate across the entire application by modifying
 * how the browser handles animation frames and rendering cycles.
 */

export const applyGlobalRefreshRate = (minFps = 60, maxFps = 120) => {
  const maxInterval = 1000 / minFps;
  const minInterval = 1000 / maxFps;
  
  let lastTime = performance.now();
  
  // Store the original browser function
  const originalRAF = window.requestAnimationFrame;
  
  // Override the native requestAnimationFrame to enforce our custom frame rate
  window.requestAnimationFrame = (callback) => {
    return originalRAF((time) => {
      const delta = time - lastTime;
      
      // If the browser is trying to refresh faster than maxFps, we throttle it
      if (delta < minInterval) {
        window.setTimeout(() => {
          window.requestAnimationFrame(callback);
        }, minInterval - delta);
        return;
      }
      
      lastTime = time;
      callback(time);
    });
  };

  console.log(`Global Refresh Rate applied: Min ${minFps}fps | Max ${maxFps}fps`);
};
