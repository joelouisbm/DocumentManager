import Service from './service.js'
import Utilities from './utilities.js'

export default class Businness {

    static async save(document) {
        try {
            const response = await Service.save(document)
            const result = await response.json()
            result.data.forEach(async (element) => {
                element.date = await Utilities.formatDate(element.date)
            });
            return result
        } catch (error) {
            console.log(error)
        }
    }

    static async getListFiles() {
        try {
            const response = await Service.getFiles()
            response.data.forEach(async (element) => {
                element.date = await Utilities.formatDate(element.date)
            });
            return response
        } catch (error) {
            console.log(error)
        }
    }

    static async deleteFile(documentID) {
        try {
            const result = await Service.delete(documentID)
            return result
        } catch (error) {
            console.log(error)
        }
    }

    static downloadFile(id) {
        Service.download(id)
    }
}