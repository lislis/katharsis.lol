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
        ).then(() => {
          alert(message)
        })
      })
  }
}

async function buildBulkDeleteFunction(formId, apiEndpoint, message) {
  document.querySelector(formId).onsubmit = async (e) => {
    e.preventDefault();

    fetch(`${apiEndpoint}`, {
      method: 'POST'
    }).then(() => alert(message))
  }
}

async function changeUserProperty(formId, inputId, endpoint, message, method) {
  document.querySelector(formId).onsubmit = async (e) => {
    e.preventDefault();
    let inputElem = document.querySelector(inputId);

    let response = await fetch(CONFIG.SERVER + endpoint + inputElem.value, {
      method: method,
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


let CONFIG = {};
async function init() {
  let resp = await fetch('env.txt');
  let text = await resp.text();
  text.split('\n').forEach(x => {
    if (x !== '') {
      let parts = x.split("=");
      CONFIG[parts[0]] = parts[1];
    }
  });


  [...document.querySelectorAll('.js-servername')].map(x => {
    x.href = CONFIG.SERVER + x.href.replace(window.location.origin, "");
  });

  [...document.querySelectorAll('.js-botname')].map(x => {
    x.href = CONFIG.BOTBRAIN + x.href.replace(window.location.origin, "");
  });

  buildDeleteFunction('#deleteRoomForm', '#deleteroomid', `${CONFIG.SERVER}/api/room/`, 'Raum gelöscht:');
  buildDeleteFunction('#deleteChatForm', '#deletechatid', `${CONFIG.SERVER}/api/chat/`, 'Chat gelöscht:');
  buildDeleteFunction('#deleteUserForm', '#deleteuserid', `${CONFIG.SERVER}/api/user/`, 'User gelöscht:');
  buildDeleteFunction('#deleteWordForm', '#deletewordid', `${CONFIG.BOTBRAIN}/api/word/`, 'Wort gelöscht:');
  buildDeleteFunction('#deleteDirectionForm', '#deletedirectionid', `${CONFIG.BOTBRAIN}/api/direction/`, 'Ticketcode gelöscht:');
  buildDeleteFunction('#deleteCodeForm', '#deletecodeid', `${CONFIG.SERVER}/api/ticketcode/`, 'Anweisung gelöscht:');
  buildDeleteFunction('#deletePlayForm', '#deleteplayid', `${CONFIG.SERVER}/api/play/`, 'Stück gelöscht:');

  buildDeleteAllFunction('#deleteAllRoomsForm', `${CONFIG.SERVER}/api/room/`, 'Alle Räume gelöscht!');
  buildDeleteAllFunction('#deleteAllChatsForm', `${CONFIG.SERVER}/api/chat/`, 'Alle Chats gelöscht!');
  buildDeleteAllFunction('#deleteAllUsersForm', `${CONFIG.SERVER}/api/user/`, 'Alle User gelöscht!');
  buildDeleteAllFunction('#deleteAllCodesForm', `${CONFIG.SERVER}/api/ticketcode/`, 'Alle Ticketcodes gelöscht!');

  buildBulkDeleteFunction('#deleteAllWordsForm', `${CONFIG.BOTBRAIN}/api/word/bulkdelete`, 'Alle Wörter gelöscht!');
  buildBulkDeleteFunction('#deleteAllDirectionsForm', `${CONFIG.BOTBRAIN}/api/direction/bulkdelete`, 'Alle Anweisungen gelöscht!');

  changeUserProperty('#user2ModForm', '#user2modid', '/api/user/user2mod/', 'User ist Moderator:', 'POST');
  changeUserProperty('#mod2UserForm', '#mod2userid', '/api/user/mod2user/', 'Moderator ist User:', 'POST');
  changeUserProperty('#user2stageForm', '#user2stageid', '/api/user/on/', 'Auf die Bühne:', 'POST');
  changeUserProperty('#userOffstageForm', '#useroffstageid', '/api/user/off/', 'Runter von der Bühne:', 'POST');

  buildImportFunction('#importWordsForm', '#wordcsvurl', `${CONFIG.BOTBRAIN}/api/word/bulkimport`);
  buildImportFunction('#importDirectionsForm', '#directioncsvurl', `${CONFIG.BOTBRAIN}/api/direction/bulkimport`);


  document.querySelector('#startScheduleForm').onsubmit = async (e) => {
    e.preventDefault();

    let formElem = document.querySelector('#scheduleUrl');
    let formObj = {};
    formObj[formElem.name] = formElem.value;

    let response = await fetch(`${CONFIG.RUNNER}/api/runschedule`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(formObj)
    });
    let result = await response.json();

    alert(result.message);
    formElem.value = "";
  };

  document.querySelector('#exportStageForm').onsubmit = async (e) => {
    e.preventDefault();

    let response = await fetch(`${CONFIG.SERVER}/api/room/main`);
    let rooms = await response.json();
    let mainstage = rooms.filter(x => x.locked == true);
    console.log(mainstage)

    let chatResponse = await fetch(`${CONFIG.SERVER}/api/chat/${mainstage[0]._id}`);
    let blob = await chatResponse.blob();
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    const d = new Date();
    a.download = `katharsislol-download-${ d.getTime() }`;

    const clickHandler = () => {
      setTimeout(() => {
        URL.revokeObjectURL(url);
        this.removeEventListener('click', clickHandler);
      }, 150);
    };
    a.addEventListener('click', clickHandler, false);
    a.click();
  }

  document.querySelector('#gen1CodeForm').onsubmit = async (e) => {
    e.preventDefault();

    let formElem = document.querySelector('#gencode');
    let formObj = {};
    formObj.code = formElem.value;

    let response = await fetch(`${CONFIG.SERVER}/api/ticketcode`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(formObj)
    });
    await response.json();

    alert(`Code erstellt!`);
    formElem.value = "";

  };

  document.querySelector('#genMultCodeForm').onsubmit = async (e) => {
    e.preventDefault();

    let formElem = document.querySelector('#numcode');
    let formObj = {};
    formObj.num = formElem.value;

    let response = await fetch(`${CONFIG.SERVER}/api/ticketcode/bulkcreate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(formObj)
    });
    let result = await response.json();

    alert(`Codes erstellt! Siehe Outputfenster`);
    formElem.value = "";
    let outElem = document.querySelector('#numCodeOutput');
    outElem.innerHTML = `${Array.from(result, x => x.code).join('<br>')}`;
    outElem.style.display = 'block';
  };

  document.querySelector('#fillMainRoomForm').onsubmit = async (e) => {
    e.preventDefault();

    let mainStage = document.querySelector('#mainstagename')
    let backStage = document.querySelector('#backstagename')

    Promise.all([
      fetch(`${CONFIG.SERVER}/api/room`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({room_name: mainStage.value,
                              main: true,
                              'private': false,
                              locked: true})
      }),
      fetch(`${CONFIG.SERVER}/api/room`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({room_name: backStage.value,
                              main: true,
                              'private': false,
                              locked: false})
      })
    ]).then(() => {
      alert("Räume angelegt!")
      mainStage.value = ''
      backStage.value = ''
    })
  }

  document.querySelector('#deleteMainRoomForm').onsubmit = async (e) => {
    e.preventDefault();

    let response = await fetch(`${CONFIG.SERVER}/api/room/main`);
    let mainrooms = await response.json();

    mainrooms.forEach(x => {
      fetch(`${CONFIG.SERVER}/api/room/${x._id}`, {
        method: 'DELETE'
      })
    })
    alert("Räume gelöscht!")
  }


  document.querySelector('#deleteChatsForRoomForm').onsubmit = async (e) => {
    e.preventDefault();
    let elem = document.querySelector('#deletechatforroomid');

    fetch(`${CONFIG.SERVER}/api/chat/${elem.value}`)
      .then(r => r.json())
      .then(values => {
        Promise.all(values.map(x => {
          fetch(`${CONFIG.SERVER}/api/chat/${x._id}`, {
            method: 'DELETE'
          }).then(resp => resp.json())
        })
                   ).then(() => {
                     alert(`Alle Chats in Raum ${elem.value} gelöscht!`);
                     elem.value = '';
                   })
      })
  }


  document.querySelector('#deleteIntroTextForm').onsubmit = async (e) => {
    e.preventDefault();
    const settingsKey = 'introTextUrl';
    const resp = await fetch(`${CONFIG.SERVER}/api/setting/bykey/${settingsKey}`);
    const setting = await resp.json();

    if (setting.length == 0) { alert('Nichts gesetzt!'); return false  }

    const resp2 = await fetch(`${CONFIG.SERVER}/api/setting/${setting[0]._id}`, {
      method: 'DELETE'
    });
    const data = await resp2.json();
    alert(`Gelöscht ${data}`);
  }

  document.querySelector('#setIntroTextForm').onsubmit = async (e) => {
    e.preventDefault();
    const key = 'introTextUrl';
    const value = document.querySelector('#introTextUrl').value;

    const re = await fetch(`${CONFIG.SERVER}/api/setting`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({key, value})
    });
    const data = await re.json();
    alert(`Introtext ${data}`);
    document.querySelector('#introTextUrl').value = "";
  };

  document.querySelector('#importPlayForm').onsubmit = async (e) => {
    e.preventDefault();

    const title = document.querySelector('#importplaytitleid');
    const comment = document.querySelector('#importplaycommentid');
    const took_place = document.querySelector('#importplaydateid');
    const json = document.querySelector('#importplayplayid');

    if (json.files[0]) {
      const reader = new FileReader();
      reader.onload = async function (evt) {
        //document.getElementById("fileContents").innerHTML = JSON.stringify(evt.target.result);
        //console.log(evt)

        const re = await fetch(`${CONFIG.SERVER}/api/play`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify({ title: title.value,
                                 comment: comment.value,
                                 took_place: took_place.value,
                                 the_play: evt.target.result
          })
        });
        let result = await re.json();

        alert(`Stück importiert ${result.title}`);
        title.value = "";
        comment.value = "";
        took_place.value = "";
      }
      reader.onerror = function() {
        document.getElementById("fileContents").innerHTML = "error reading file";
      }
      reader.readAsText(json.files[0], "UTF-8");
    } else {
      alert("Wähle ein JSON aus!");
      return false;
    }
  };
}

init();
