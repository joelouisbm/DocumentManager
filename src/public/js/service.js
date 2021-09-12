const END_POINT = '/documents'

export default class Service {
    static async getFiles() {
        try {
            const response = await fetch(END_POINT)
            const documents = await response.json()
            return documents
        } catch (error) {
            console.log(error)
        }
    }

    static async save(document) {
        try {
            return await fetch(END_POINT, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(document)
            })
        } catch (error) {
            console.log(error)
        }
    }

    static async delete(ID) {
        try {
            const res = await fetch(`${END_POINT}/${ID}`, { method: 'DELETE' })
            return res
        } catch (e) {
            throw Error('error eliminando documento')
        }
    }

    static download(id) {
        var url = `files/${id}`
        window.location.href = url
    }
}