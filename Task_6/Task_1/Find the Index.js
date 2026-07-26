function strStr(haystack, needle) {

    for (let i = 0; i <= haystack.length - needle.length; i++) {

        let found = true;

        for (let j = 0; j < needle.length; j++) {

            if (haystack[i + j] !== needle[j]) {
                found = false;
                break;
            }

        }

        if (found) {
            return i;
        }

    }

    return -1;
}
console.log(strStr("sadbutsad", "but"));
console.log(strStr("leetcode", "leeto"));
