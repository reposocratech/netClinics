export const maxDatePicker = () => {
    const date = new Date();

    let maxDatePicker = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;

    if(date.getMonth() < 10 && date.getDate() < 10){
      maxDatePicker = `${date.getFullYear()}-0${date.getMonth()+1}-0${date.getDate()}`;
    }
    else if(date.getMonth() < 10 && date.getDate() > 10){
      maxDatePicker = `${date.getFullYear()}-0${date.getMonth()+1}-${date.getDate()}`;
    }
    else if(date.getMonth() > 10 && date.getDate() < 10){
      maxDatePicker = `${date.getFullYear()}-${date.getMonth()+1}-0${date.getDate()}`;
    }

    return maxDatePicker;

}