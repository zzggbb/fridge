function get_input(){
    var input = document.getElementById('ingredients'),
        ingredients_string = input.value;
    if (ingredients_string){
        return to_array(ingredients_string);
    } else {
        error_div = document.getElementById('error');
        error_div.style.visibility = 'visible';
        setTimeout(function() {
            error_div.style.visibility = 'hidden';
        }, 3000);
    }
}

function to_array(string){
    return string.replace(/,/g,'').split(' ');
}

function common(array1, array2){
    common = 0;
    for (var a=0; a<array1.length; a++){
        for (var b=0; b<array2.length; b++){
            if (array1[a] === array2[b]){
                common++;     
            } 
        } 
    }
    return common
}

function(ingrs1, ingrs2){
    if(common(ingrs1, input_list) < common(ingrs2, input_list))
        return -1;
    ja
}
