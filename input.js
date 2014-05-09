function get_input(){
    var ingredients = document.getElementById('ingredients');
    if (ingredients){
    return to_array(ingredients.value);
    
}

/*  format the given string into an array
    these example strings will result in ['a','b','c','x','y']
        "a b c x y" 
        " a,b,c,x,y"
        "a, b, c, x, y"
        " a,  b  c x,y  "
    this function normalizes a wide range of given input, allowing the 
    user to enter their ingredients without concern of their format. 
*/
function format(string){
    return string.toLowerCase().trim().replace(/,/g," ").replace(/ +/g," ").split(" ");
}

/*
    number of common elements between two arrays
*/
function common(a, b){
    return a.filter(function(n){ return b.indexOf(n) != -1 }).length;
}

/*

*/
function compare(a,b){
    return common(x,b["ingredients"])-common(x,a["ingredients"]);
}

function main(){
    var input_text = document.getElementById("ingredients");
    if(input_text){
        // something was typed
        var 
    } else {
        // nothing was typed
    }
}
