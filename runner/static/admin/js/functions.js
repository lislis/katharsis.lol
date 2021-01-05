async function deleteSingle(input, url, message) {
    let inputElem = document.querySelector(input);

    let response = await fetch(CONFIG.SERVER + url + inputElem.value, {
        method: 'DELETE',
    })
    let obj = await response.json();
    alert(message);
    inputElem.value = "";
}

function buildDeleteFunction(formid, inputid, url, message) {
    document.querySelector(formid).onsubmit = async (e) => {
        e.preventDefault();
        deleteSingle(inputid, url, message);
    }
}

async function buildDeleteAllFunction(formId, apiEndpoint, message) {
    document.querySelector(formId).onsubmit = async (e) => {
        e.preventDefault();
        fetch(`${CONFIG.SERVER}${apiEndpoint}`)
            .then(r => r.json())
            .then(values =>  {
                Promise.all(
                    values.map(x => {
                        fetch(`${CONFIG.SERVER}${apiEndpoint}/${x._id}`, {
                            method: 'DELETE'
                        }).then(resp => resp.json())
                    })
                ).then(_ => {
                    alert(message)
                })
            })
    }
}
