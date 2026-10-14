// Ported from kavish3D-Portofolio (MIT, (c) Rajesh Chityal)
export const setProgress = (setLoading: (value: number) => void) => {
  let percent = 0;

  const interval = window.setInterval(() => {
    if (percent < 96) {
      percent += Math.max(1, Math.round(Math.random() * 8));
      setLoading(percent);
    } else {
      window.clearInterval(interval);
      const finish = window.setInterval(() => {
        percent += 1;
        setLoading(percent);
        if (percent >= 100) {
          window.clearInterval(finish);
        }
      }, 24);
    }
  }, 90);

  function clear() {
    window.clearInterval(interval);
    setLoading(100);
  }

  function loaded() {
    return new Promise<number>((resolve) => {
      window.clearInterval(interval);
      percent = 100;
      setLoading(100);
      resolve(100);
    });
  }

  return { loaded, percent, clear };
};
