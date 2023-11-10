export const convertStrToNum = (str) => {
  const noSpaceStr = String(str).replace(/\s+/g, "").replace(",", ".");
  const num = parseFloat(noSpaceStr);

  if (!isNaN(num) && isFinite(num)) {
    return num;
  } else {
    return false;
  }
};

export const formatDate = (date) => {
  const [year, month, day] = date.split("-");
  return `${day.padStart(2, "0")}.${month.padStart(2, "0")}.${year}`;
};
export const typesOperation = {
  income: "доход",
  expenses: "расход",
};

// Анимация цифр старый вариант
export const animationNumbers_old = (element, number) => {
  const fps = 60; // скорость анимации
  const duration = 2000; // длительность анимации
  const frameDuration = 1000 / fps; // длительность одного "кадра"
  const totalFrames = Math.round(duration / frameDuration); // общее количество кадров
  let currentFrame = 0;

  const initialNumber = parseFloat(element.textContent.replace(/[^0-9.,-]+/g, ""));

  const increment = Math.floor((number - initialNumber) / totalFrames);

  const intervalId = setInterval(() => {
    currentFrame++;
    const newNumber = initialNumber + increment * currentFrame;
    element.textContent = `${newNumber.toLocaleString("RU-ru")} ₽`;

    if (currentFrame === totalFrames) {
      clearInterval(intervalId);
      element.textContent = `${(((number + Number.EPSILON) * 100) / 100).toLocaleString("RU-ru")} ₽`;
    }
  }, frameDuration);
};

// Анимация цифр
export const animationNumbers = (element, number) => {
  const fps = 60; // скорость анимации
  const duration = 1200; // длительность анимации
  const frameDuration = 1000 / fps; // длительность одного "кадра"
  const totalFrames = Math.round(duration / frameDuration); // общее количество кадров
  let currentFrame = 0;

  const initialNumber = parseFloat(element.textContent.replace(/[^0-9.,-]+/g, ""));

  const increment = Math.floor((number - initialNumber) / totalFrames);

  const animate = () => {
    currentFrame++;
    const newNumber = initialNumber + increment * currentFrame;
    element.textContent = `${newNumber.toLocaleString("RU-ru")} ₽`;

    if (currentFrame < totalFrames) {
      requestAnimationFrame(animate);
    } else {
      element.textContent = `${(((number + Number.EPSILON) * 100) / 100).toLocaleString("RU-ru")} ₽`;
    }
  };
  requestAnimationFrame(animate);
};
