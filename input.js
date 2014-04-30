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

// common(array1, array2);
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

// return the recipe that is most in common with the passed array
function common_best(array, recipes){
    // object that contains arrays ["ingredients"] and ["directions"]
    current = {};
    for (var recipe in recipes){
        ingr = recipe["ingredients"];
        if(common(ingr, array) > common(current["ingredients"],array){
            current = recipe;
        }
    }
    return 
}
