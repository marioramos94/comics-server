const fillZeros = (text,length) => {
    if(text.length<length){
        return `0${text}`
    }else{
        return text
    }
}
const parse = (comic) =>{
    let { day, month, year, transcript } = comic
    let date = `${year}/${fillZeros(month,2)}/${fillZeros(day,2)}`
    return {
       ...comic,
       date
    }
}

module.exports = { fillZeros, parse }