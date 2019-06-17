export default function counter(state = [], action) {
    switch (action.type) {
        case "ADD":
            let c = [...state, action.payload];
            return c;
        case "REMOVE":
            return removeByAttr([...state], "pid", action.payload.pid);
        default:
            return state;
    }
}

let removeByAttr = function(arr, attr, value) {
    var i = arr.length;
    while (i--) {
        if (
            arr[i] &&
            arr[i].hasOwnProperty(attr) &&
            (arguments.length > 2 && arr[i][attr] === value)
        ) {
            arr.splice(i, 1);
        }
    }
    return arr;
};
