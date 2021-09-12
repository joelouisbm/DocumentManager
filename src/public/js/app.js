import Business from './business.js'

class UI {

    static async getParents(element, levels) {
        let parents = []
        parents[0] = element.parentElement
        for (let i = 0; i < levels; i++) {
            parents.push(parents[i].parentElement)
        }
        return parents[levels]
    }

    static addRowTable(doc, tableSelector) {
        const ext = doc.originalname.substring(doc.originalname.length - 4, doc.originalname.length)
        const table = document.querySelector(tableSelector)
        const row = document.createElement('tr')
        row.setAttribute('id', doc.id)
        const icon = ext == '.pdf' ? 'file-pdf'
            : ext == '.doc' ? 'file-text'
                : ext == '.png' || ext == '.jpg' ? 'image'
                    : ext == '.exe' ? 'thumbnails' : 'file'

        row.innerHTML = `
            <td>${doc.id}</td>
            <td>${doc.originalname}</td>
            <td>
                <span class="uk-margin-small-right" uk-icon="${icon}"></span>
                    ${ext}
            </td>          
            <td>${doc.size}</td>            
            <td>${doc.date}</td>
            <td>${doc.keywords}</td>                                       
        `
        const td = document.createElement('td')
        const a = document.createElement('a')

        a.setAttribute('uk-icon', 'download')
        a.title = 'Download document'
        a.addEventListener('click', async (e) => {
            e.preventDefault()
            const parent = await UI.getParents(e.target, 2)
            const documentID = parent.id
            Business.downloadFile(documentID)
        })

        const deleteIcon = document.createElement('a')
        deleteIcon.setAttribute('uk-icon', 'trash')
        deleteIcon.title = 'Delete document'
        deleteIcon.addEventListener('click', async (e) => {
            e.preventDefault()
            const parent = await UI.getParents(e.target, 2)
            const documentID = parent.id
            Business.deleteFile(documentID)
                .then(res => res.json())
                .then((data) => {
                    let status = 'danger'
                    if (data.status === 200) {
                        status = 'success'
                        UI.removeRow(documentID)
                    }
                    UI.showMessage(data.message, status)
                })
                .catch(err => console.log(err))
        })

        td.appendChild(a)
        td.appendChild(deleteIcon)
        row.appendChild(td)
        table.appendChild(row)
    }
    static showElement = (el) => el.removeAttribute('hidden')
    static hiddenElement = el => el.setAttribute('hidden', 'hidden')
    static showMessage(message, status) {
        setTimeout(function () {
            UIkit.notification({
                message: message,
                pos: 'bottom-right',
                status: status
            })
        }, 500);
    }
    static cleanForm() {
        document.querySelector('#keywords').value = ''
        document.querySelector('#file-id').value = ''
        document.querySelector('#input-files').value = ''
        document.querySelector('#name_document').textContent = ''
    }

    static removeRow(selector) {
        document.getElementById(selector).remove()
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    const documents = await Business.getListFiles()
    if (documents.data.length > 0)
        documents.data.forEach(doc => {            
            UI.addRowTable(doc, '#tbody')
        })
})

document.querySelector('#input-files').addEventListener('change', (e) => {
    const btn_acept = document.querySelector('#btn_acept')
    btn_acept.disabled = true
    var bar = document.getElementById('js-progressbar');
    const data = new FormData()
    for (let file of e.target.files) {
        data.append('files', file)
    }
    var status = 'danger'
    let request = new XMLHttpRequest();
    request.open('POST', '/files');
    UI.showElement(bar)
    // upload progress event
    request.upload.addEventListener('progress', function (e) {
        let percent_completed = (e.loaded / e.total) * 100;
        bar.value = percent_completed;
    });

    // request finished event
    request.addEventListener('load', async function (e) {
        const response = JSON.parse(request.response)
        var message = response.message
        if (request.status === 201) {
            status = 'success'
            const response = JSON.parse(request.response)
            document.querySelector('#file-id').value = response.files[0].id
            document.querySelector('#name_document').appendChild(document.createTextNode(response.files[0].name))
            btn_acept.disabled = false
        }
        UI.showMessage(message, status)
        UI.hiddenElement(bar)
    });

    // send POST request to server
    request.send(data);
})


document.querySelector('#form-document').addEventListener('submit', (e) => {
    e.preventDefault()
    const keywords = document.querySelector('#keywords')
    const file = document.querySelector('#file-id')
    const data = { id: file.value, keywords: keywords.value }
    Business.save(data)        
        .then((res) => {
            let status = 'danger'
            if (res.status === 201) {
                status = 'success'
                res.data.forEach(doc => {
                    UI.addRowTable(doc, '#tbody')
                })
                UI.cleanForm()
            }
            UI.showMessage(res.message, status)
        })
        .catch((err) => {
            console.log(err)
        })
})