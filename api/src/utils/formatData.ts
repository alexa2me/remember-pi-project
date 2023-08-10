function addZero(value: number): string | number {
    if (value <= 9) {
      return "0" + value;
    } else {
      return value;
    }
  }
  
  function dateWithoutTime(dateTime: Date) {
    let date = new Date(dateTime);
    const formattedDate = `${addZero(date.getDate())}/${addZero(
      date.getMonth() + 1
    )}/${date.getFullYear()}`;
  
    return formattedDate;
  }
  
  export default dateWithoutTime;