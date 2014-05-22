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
    return a.filter(function(n){ return b.indexOf(n) != -1 }).length;
}

function add_recipe(recipe){
    var recipe_outer     = document.getElementById('recipe_container');
    
    var name             = document.createElement('div');
    var ingredients      = document.createElement('div');
    var directions_outer = document.createElement('div');
    
    name.id             = 'recipe_name';
    ingredients.id      = 'recipe_ingredients';
    directions_outer.id = 'recipe_directions';
    
    name.innerHTML = recipe['name'];
    ingredients.innerHTML = recipe['ingredients'].join(", ");
    
    recipe['directions'].forEach(function(element, index, array){
        var direction_line = document.createElement('div');
        direction_line.id = 'direction_line';
        direction_line.innerHTML = element;
        directions_outer.appendChild(direction_line);
    });
    
    recipe_outer.appendChild(name);
    recipe_outer.appendChild(ingredients);
    recipe_outer.appendChild(directions_outer);
}

function main(){
    var input = document.getElementById('input_ingredients');
    if (ingredients){
        return normalize(ingredients);
    } else {
        return false;
    }
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
            display contents of the first few indexes of `sorted_recipes`, these are the best recipes
        */
        sorted_recipes.slice(0,3).forEach(function(element, index, array){
            add_recipe(element);    
        });
    } else {
        document.getElementById('errormsg').style.display="inline";
    }
}
