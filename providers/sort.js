export function sortAlpha(array = []){
    return array.sort(function(a, b) {
        var textA = a.name.toUpperCase();
        var textB = b.name.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
}


export function sortNum(array = []){
    return array.sort(function(a, b) {
        var textA = a.episode_id;
        var textB = b.episode_id;
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
}

