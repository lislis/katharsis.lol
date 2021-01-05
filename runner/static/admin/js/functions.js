async function deleteSingle(input, url, message) {
  let inputElem = document.querySelector(input);

  let response = await fetch(url + inputElem.value, {
    method: 'DELETE',
  })
  let obj = await response.json();
  alert(`${message} \n${JSON.stringify(obj)}`);
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
    fetch(`${apiEndpoint}`)
      .then(r => r.json())
      .then(values =>  {
        Promise.all(
          values.map(x => {
            fetch(`${apiEndpoint}${x._id}`, {
              method: 'DELETE'
            }).then(resp => resp.json())
          })
        ).then(_ => {
          alert(message)
        })
      })
  }
}

async function changeUserProperty(formId, inputId, endpoint, message) {
  document.querySelector(formId).onsubmit = async (e) => {
    e.preventDefault();
    let inputElem = document.querySelector(inputId);

    let response = await fetch(CONFIG.SERVER + endpoint + inputElem.value, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({ userid: inputElem.value })
    })
    let obj = await response.json();
    alert(`${message} ${obj.nickname}`);
    inputElem.value = "";
  }
}


async function buildImportFunction(formId, inputId, endpoint) {
  document.querySelector(formId).onsubmit = async (e) => {
    e.preventDefault();
    const inputElem = document.querySelector(inputId);

    let response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({ csvUrl: inputElem.value })
    });
    let result = await response.json();

    alert(result.message);
    inputElem.value = "";
  };
}
