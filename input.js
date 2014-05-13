/*
    purpose:    return input typed into the 'ingredients' input box, false if
                nothing has been typed. For use in the main function.
*/
function get_input(){
    var ingredients = document.getElementById('ingredients');
    if (ingredients){
        return to_array(ingredients.value);
    } else {
        return false;
    }
}

/*  
    purpose:    This function normalizes a wide range of given input, allowing 
                the user to enter ingredients without concern of the format. 
    procedure:  Format the given string into an array.
    example:    These example strings will result in ['a','b','c','x','y']
                    "a b c x y" 
                    " a,b,c,x,y"
                    "a, b, c, x, y"
                    " a,  b  c x,y  "
*/
function format(string){
    return string
        .toLowerCase()
        .trim()
        .replace(/,/g," ").replace(/ +/g," ")
        .split(" ");
}

/*
    purpose:    return number of common elements between two recipe lists.
    procedure:  filters list `a` by checking if each item in `a` exists in `b`, 
                and then returns the length of that filtered list.
    example:    common([1,2,3],[2,3,4]) -> [2,3].length -> 2
                Therefore, 2 common elements.
                
*/
function common(a, b){
    return a.filter(function(n){ return b.indexOf(n) != -1 }).length;
}

function main(){
    var input = get_input();
    if(input){
        var recipes_c = recipes;
        var sorted_recipes = recipes_c.sort(function(a,b){
        /*
            return a comparison value (-,0,+) based on the commonalities between
            ingredients `a` with `recipes` and ingredients `b` with `recipes`.
                common([a,b,c,d],[a,b,c]) - common([a,b,c,d],[d,e,f]) ->
                3 - 1 ->
                2
            the return value of this function is used as the key to sort the 
            elements of the recipes.
        */
            return common(input,b["ingredients"])-common(input,a["ingredients"]);
        } 
        /*
            display contents of the first few indexes of `sorted_recipes`, these
            are the best recipes
        */
    } else {
        // nothing was typed
        document.getElementById('errormsg').style.display="inline";
    }
}
