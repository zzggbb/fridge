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
                    " a,b,c,x,y"
                    "a, b, c, x, y"
*/
function normalize(string){
    return string.toLowerCase().trim().replace(/ *, */g,",").split(",");
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
function clear_elements(element_names){
    element_names.map(function(x){
        var element = document.getElementById(x);
        if (element == null){return;}
        while (element.firstChild){
            element.removeChild(element.firstChild);
        }
    });
}

function add_error(type) {
    var error = document.createElement('div');
    var error_map = {
        'bad_match': "No matches found for the provided ingredients, we're working on it!",
        'bad_input': "Please type a list of comma separated ingredients",
    }
    error.id=type;
    error.innerHTML=error_map[type];
    document.getElementById('errors').appendChild(error);
    
}

function add_recipe(recipe){
    var recipe_wrap       = document.createElement('div');    
    var name              = document.createElement('div');
    var ingredients       = document.createElement('div');
    var recipe_directions = document.createElement('div');
    
    recipe_wrap.id       = 'recipe_wrap';
    name.id              = 'recipe_name';
    ingredients.id       = 'recipe_ingredients';
    recipe_directions.id = 'recipe_directions';
    
    name.innerHTML = recipe['name'];
    ingredients.innerHTML = recipe['ingredients'].join(", ");
    
    recipe['directions'].map(function(item){
        var direction_line = document.createElement('div');
        direction_line.id = 'direction_line';
        direction_line.innerHTML = item;
        recipe_directions.appendChild(direction_line);       
    });
    
    [name,ingredients,recipe_directions].map(function(item){
        recipe_wrap.appendChild(item);
    });

    document.getElementById('recipe_outer').appendChild(recipe_wrap);
}

function main(){
    var input = get_input();
    if(input){
        clear_elements(['errors','recipe_outer']);
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
            return common(input,b["ingredients"])-common(input,a["ingredients"]);
        });
        if ( common(input,recipes[0]['ingredients']) == 0 ){
            // not even the best matched
            add_error('bad_match');
        } else {
            recipes.slice(0,3).filter(function(n){
                return common(input,n['ingredients']) > 0
            }).map(add_recipe); 
        }
    } else {
        add_error('bad_input');
    }
}
