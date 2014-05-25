/*
    purpose: Get the users input. For use in the main function.
    explain: return input typed into the ingredients input box, or false if 
             nothing was typed.
    example: 'eggs, cheddar cheese' -> normalize('eggs, cheddar cheese')
             '' -> false
*/
function get_input(){
    var ingredients = document.getElementById('input_ingredients').value;
    return (ingredients ? normalize(ingredients) : false);
}
/*  
    purpose: This function normalizes a wide range of given input, allowing 
             the user to enter ingredients without concern of the format. 
    explain: Normalize the given string into an array.
    example: These example strings will result in ['a','b','c','x','y']
                " a,b,c,x,y"
                "a, b, c, x, y"
*/
function normalize(string){
    return string.toLowerCase().trim().replace(/ *, */g,",").split(",");
}
/*
    purpose: return number of common elements between two recipe lists.
    explain: filters list `a` by checking if each item in `a` exists in `b`, 
             and then returns the length of that filtered list.
    example: common([1,2,3],[2,3,4]) -> [2,3].length -> 2
             Therefore, 2 common elements.
*/
function common(a, b){
    return a.filter(function(n){ 
        return b.indexOf(n) != -1;
    }).length;
}
/*
    purpose: simplify the process of clearing all child elements from a given
             parent element. 
    explain: for each child in each parent of the list of parents passed as an 
             argument, remove each of its children until there are none left.
*/
function clear_elements(parents){
    parents.map(function(n){
        var child = document.getElementById(n);
        if (child == null){return;}
        while (child.firstChild){
            child.removeChild(child.firstChild);
        }
    });
}
/*
    purpose: generate random integer numbers
    explain: return a random integer number between min (inclusive) and max 
             (exclusive).
*/
function random_between(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
/*
    display a random recipe
*/
function test_recipe(){
    clear_elements(['recipe_outer','errors']);
    add_recipe(recipes[random_between(0,recipes.length-1)]);
}
/*
    purpose: append an error the the `errors` element
    explain: match the passed `type` argument to an error message in the 
             `error_map` object, and append the message to the `errors` div.
*/
function add_error(type) {
    var error = document.createElement('div');
    var error_map = {
        'bad_match': "No matches found, check your spelling, or maybe we need more recipes...",
        'bad_input': "Please type a list of comma separated ingredients",
    }
    error.id=type;
    error.innerHTML=error_map[type];
    document.getElementById('errors').appendChild(error);
}
/*
    purpose: append a formatted `recipe` element to the visible list of 
             recipes. 
    explain: create an object with `div` elements and their ids as keys. set 
             their `innerHTML` appropriately and append each element in the
             object to the `recipe_outer` div.
*/
function add_recipe(recipe){
    var elems = {};
    ['wrap','name','ingredients','directions'].map(function(item){
        var elem = document.createElement('div');
        elem.id = 'recipe_' + item;
        elems[item] = elem;
    });
    elems['directions'].appendChild(document.createElement('ol'));
    elems['name'].innerHTML = recipe['name'];
    elems['ingredients'].innerHTML = recipe['ingredients'].join(", ");
    recipe['directions'].map(function(item){
        var line = document.createElement('li');
        /*line.id = 'line';*/
        /*var num = recipe['directions'].indexOf(item) + 1*/
        line.innerHTML = item;
        elems['directions'].firstChild.appendChild(line);       
    });
    Object.keys(elems).slice(1).map(function(item){
        elems['wrap'].appendChild(elems[item]);
    });
    document.getElementById('recipe_outer').appendChild(elems['wrap']);
}
/*
    purpose: main function, initiate everything when the user click the 
             `Submit Ingredients` button.
    explain: get the input, clear all existing errors, sort recipes based on 
             the typed ingredients if get_input returns true, otherwise give an
             error message.
*/
function main(){
    var input = get_input();
    clear_elements(['errors','recipe_outer']);
    if(input){
        recipes.sort(function(a,b){
        /*
            return a comparison value (-,0,+) based on the commonalities between
            ingredients `a` with `recipes` and ingredients `b` with `recipes`.
                common([a,b,c,d],[a,b,c]) - common([a,b,c,d],[d,e,f]) ->
                3 - 1 ->
                2
            the return value of this function is used as the key to sort the 
            elements of the recipes.
        */
            return common(input,b['ingredients'])-common(input,a['ingredients']);
        });
        if ( common(input,recipes[0]['ingredients']) == 0 ){
            // not even the best matched
            add_error('bad_match');
        } else {
            /*
                slice the top three, filter out those that do not have more 
                than 0, and send what remains to `add_recipe`.
            */
            recipes.slice(0,3).filter(function(n){
                return common(input,n['ingredients']) > 0
            }).map(add_recipe); 
        }
    } else {
        add_error('bad_input');
    }
}
