function isValid(s) {
    let stack = [];

    for (let i = 0; i < s.length; i++) {
        let ch = s[i];

        // Opening brackets
        if (ch === "(" || ch === "[" || ch === "{") {
            stack.push(ch);
        }
        // Closing brackets
        else {
            if (stack.length === 0) {
                return false;
            }

            let top = stack.pop();

            if (
                (ch === ")" && top !== "(") ||
                (ch === "]" && top !== "[") ||
                (ch === "}" && top !== "{")
            ) {
                return false;
            }
        }
    }

    return stack.length === 0;
}
console.log(isValid("()"));      
console.log(isValid("()[]{}"));  
console.log(isValid("(]"));      
console.log(isValid("([])"));    
console.log(isValid("([)]"));    