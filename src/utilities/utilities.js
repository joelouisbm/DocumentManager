const getCurrentDate = () => {
    const date = new Date()
    const year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    if (month.toString().length < 10) month = `${0}${month}`
    if (day.toString().length < 10) day = `${0}${day}`
    return `${year}/${month}/${day}`
}

module.exports = {
    getCurrentDate
}