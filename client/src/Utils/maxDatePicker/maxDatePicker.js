export const maxDatePicker = () => {
    const date = new Date();
    const day = parseInt(new Date().getDate()) + 1;

    let maxDatePicker = `${date.getFullYear()}-${date.getMonth()+1}-${day}`;

    if(date.getMonth() < 10 && day < 10){
      maxDatePicker = `${date.getFullYear()}-0${date.getMonth()+1}-0${day}`;
    }
    else if(date.getMonth() < 10 && day > 10){
      maxDatePicker = `${date.getFullYear()}-0${date.getMonth()+1}-${day}`;
    }
    else if(date.getMonth() > 10 && day < 10){
      maxDatePicker = `${date.getFullYear()}-${date.getMonth()+1}-0${day}`;
    }

    return maxDatePicker;

}