const months = [
    "Jan", "Feb", "Mar", "Abr",
    "May", "Jun", "Jul", "Agt",
    "Sep", "Oct", "Nov", "Dec",
]

export default class Utilities {

    static formatDate = async (date) => {
        const date_format = new Date(date)
        return months[(parseInt(date_format.getMonth()) + 1) - 1]
            + ' ' + date_format.getDate()
            + ' ' + date_format.getFullYear()
    }

}