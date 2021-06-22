/** 当前年 */
export const currentYear = new Date().getFullYear().toString();

const lastMonth = new Date().getMonth(); // 当前月，从0开始

const getYearAndMonth = () => {
  if (lastMonth > 9) {
    return currentYear + "-" + lastMonth;
  } else {
    return currentYear + "-" + "0" + lastMonth;
  }
};
/** 当前年中的上个月 */
export const yearAndMonth = getYearAndMonth();
