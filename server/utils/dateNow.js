const dateNow = () => {
    const date = new Date();
    const day = parseInt(new Date().getDate());

    let dateNow = `${date.getFullYear()}-${date.getMonth()+1}-${day}`;

    if(date.getMonth() < 10 && day < 10){
        dateNow = `${date.getFullYear()}-0${date.getMonth()+1}-0${day}`;
    }
    else if(date.getMonth() < 10 && day > 10){
        dateNow = `${date.getFullYear()}-0${date.getMonth()+1}-${day}`;
    }
    else if(date.getMonth() > 10 && day < 10){
        dateNow = `${date.getFullYear()}-${date.getMonth()+1}-0${day}`;
    }

    return dateNow;
}

module.exports = { dateNow }