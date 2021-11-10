export function findNextIdent(ident, data) {
  let done = data.characterProgress[ident.length];
  let currentProgressLength = Object.keys(data.characterProgress[ident.length]).length;

  let { level, neededLength } = getLevelAndLength(ident, data.characterTree);

  if (currentProgressLength < neededLength) {
    return traverseLevel(done, level);
  } else {
    return checkIfDone(ident, data);
  }
}

function checkIfDone(ident, store) {
  if (ident.length == 1) {
    let s = Object.keys(store.characterTree);
    let savedInLevel = store.characterProgress[ident.length];

    if (s.length == savedInLevel.length) {
      console.log("we are done!")
      return undefined
    } else {
      let next = s.filter(x => !savedInLevel.find(y => y.key == x))
      return next[0];
    }

  } else if (ident.length == 3) {
    let s = figureOutNeededLength(store.characterTree[ident[0]]);
    let savedInLevel = store.characterProgress[ident.length];
    if (!s || s.length == savedInLevel.length) {
      return checkIfDone(ident.slice(0, -2), store);
    } else {
      console.log('we should not hit this')
    }
  } else if (ident.length == 5) {
    let s = figureOutNeededLength(store.characterTree[ident[0]].options[ident[1]].next);
    let savedInLevel = store.characterProgress[ident.length];
    if (!s || s.length == savedInLevel.length) {
      return checkIfDone(ident.slice(0, -2), store);
    } else {
      console.log('we should not hit this')
    }
  } else {
    console.log('we should not hit this')
  }
}

function getLevelAndLength(ident, tree) {
  let level, neededLength;
  if (ident.length == 1) {
    level = tree;
    neededLength = Object.keys(tree).length;
  } else if (ident.length == 3) {
    level = tree[ident[0]].options[ident[1]].next;
    neededLength = figureOutNeededLength(tree[ident[0]]);
  } else if (ident.length == 5) {
    level = tree[ident[0]].options[ident[1]].next.options[ident[3]].next;
    neededLength = figureOutNeededLength(tree[ident[0]].options[ident[1]].next);
  } else {
    console.log('what is else here?');
    level = null;
    neededLength = null;
  }
  return { level, neededLength };
}

function figureOutNeededLength(question) {
  let s = new Set();
  let possibleOptions = question.options;
  Object.keys(possibleOptions)
    .forEach(x => {
      s.add(possibleOptions[x]?.next?.id);
    });
  return s.length;
}


function traverseLevel(done, level) {
  let tbd = Object.entries(level)
      .filter(x => {
        let f = Object.entries(done)
            .find(y => y[1].key == x[1].id);
        return f?.length ? false : true;
      });
  return tbd.length ? tbd[0][1].ident : false;
}
