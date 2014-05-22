/*
    purpose:    return input typed into the 'ingredients' input box, false if
                nothing has been typed. For use in the main function.
*/
function get_input(){
    var ingredients = document.getElementById('input_ingredients').value;
    if (ingredients){
        return normalize(ingredients);
    } else {
        return false;
    }
}

/*  
    purpose:    This function normalizes a wide range of given input, allowing 
                the user to enter ingredients without concern of the format. 
    procedure:  Normalize the given string into an array.
    example:    These example strings will result in ['a','b','c','x','y']
                    "a b c x y" 
                    " a,b,c,x,y"
                    "a, b, c, x, y"
                    " a,  b  c x,y  "
*/
function normalize(string){
    return string.toLowerCase().trim().replace(/, +/g,",").split(",");
}

/*
    purpose:    return number of common elements between two recipe lists.
    procedure:  filters list `a` by checking if each item in `a` exists in `b`, 
                and then returns the length of that filtered list.
    example:    common([1,2,3],[2,3,4]) -> [2,3].length -> 2
                Therefore, 2 common elements.
*/
function common(a, b){
    return a.filter(function(n){ 
        return b.indexOf(n) != -1;
    }).length;
}

function add_recipe(recipe){
    var recipe_outer     = document.getElementById('recipe_outer');

    var recipe_wrap      = document.createElement('div');    
    var name             = document.createElement('div');
    var ingredients      = document.createElement('div');
    var recipe_directions = document.createElement('div');
    
    recipe_wrap.id      = 'recipe_wrap';
    name.id             = 'recipe_name';
    ingredients.id      = 'recipe_ingredients';
    recipe_directions.id = 'recipe_directions';
    
    name.innerHTML = recipe['name'];
    ingredients.innerHTML = recipe['ingredients'].join(", ");
    
    recipe['directions'].forEach(function(element, index, array){
        var direction_line = document.createElement('div');
        direction_line.id = 'direction_line';
        direction_line.innerHTML = element;
        recipe_directions.appendChild(direction_line);
    });
    
    recipe_wrap.appendChild(name);
    recipe_wrap.appendChild(ingredients);
    recipe_wrap.appendChild(recipe_directions);
    recipe_outer.appendChild(recipe_wrap);
}
function test_append(){
    var input = get_input();
    if (input) {
    }
}

function main(){
    var input = get_input();
    if(input){
        var recipes_c = recipes;
        recipes_c.sort(function(a,b){
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
        });
        for (var recipe in recipes_c.slice(0,3)){
            add_recipe(recipe);
        }
    } else {
        document.getElementById('errormsg').style.display="inline";
    }
}
