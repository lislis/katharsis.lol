export function removeByAttr(arr, attr, value) {
    var i = arr.length;
    while(i--){
      if( arr[i]
          && Object.prototype.hasOwnProperty.call(arr[i], attr)
            && (arguments.length > 2 && arr[i][attr] === value)) {
            arr.splice(i,1);
        }
    }
    return arr;
}

export function removeByIndex(arr, index) {
    return arr.splice(index, 1);
}
