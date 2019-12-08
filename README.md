# Interactive_Arrays
JavaScript libraries testing and learning using browser developer tools
There are plenty of posts that ask how to load Jquery, Underscore, Lodash... via console; Most offer the following handy snippet:

`var s = document.createElement('script'); 
 s.type = 'text/javascript';
 s.src = 'https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js';
 document.head.appendChild(s);`

I just copied the snippet and made it easier to load a couple of libraries admitting the set-up version I set (normally latest stable).
Another handy way, is to tell the library's name, the targeted version via URL in https://cdnjs.cloudflare.com/ , its initial variable (`_`, `jQuery` ...) and its path of version if known.

Todo:
test and improve
add feature to enrich interaction from the console to the HTML page (beautify and display console.dir for example)

On Glitch: 
https://glitch.com/~positive-save
You can point some error or improvement.
