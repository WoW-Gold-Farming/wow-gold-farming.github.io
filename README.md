# wow-gold-site

All content copyright 2023 Stratford Holdings LLC.

## Running
On Windows, this is best run in Ubuntu 22.x. Once you pull the code, follow the basic process laid out in the [Jekyll documentation](https://jekyllrb.com/docs/). To run the site, do the following:

```
bundle exec jekyll serve --livereload
```

Finding the base minima theme can be done with the following command, in case you need to override something:

```
bundle info --path minima
```



## Useful scripts
This tamper monkey script is great for getting the content from the item detail page:
```
// ==UserScript==
// @name         WoWHead Item Copier for Website
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       You
// @match        https://www.wowhead.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=wowhead.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    var name = document.querySelector(".heading-size-1").innerText;
    var id = 0;

    document.querySelectorAll("meta").forEach(el => {
       if(el.attributes["property"]?.value==="og:url") {
           let regex = /item=(\d*)\//;
           let value = el.attributes['content'].value;
           id = value.match(regex)[1];
       }
    });

    var output = "{% include wowhead-item.html itemId=\"" + id + "\" note=\"" + name +"\" %}";


    var zNode = document.createElement ('div');
zNode.innerHTML = '<button id="documentCopier" type="button">'
                + 'Copy item link for site.</button>'
                ;
zNode.setAttribute ('id', 'myContainer');
document.querySelector(".heading-size-1").nextSibling.appendChild (zNode);


    //--- Activate the newly added button.
document.getElementById ("documentCopier").addEventListener (
    "click", ButtonClickAction, false
);

function ButtonClickAction (zEvent) {
    /*--- For our dummy action, we'll just add a line of text to the top
        of the screen.
    */
navigator.clipboard.writeText(output);
    document.getElementById ("documentCopier").innerText = "Copied";
}



})();
```

This tampermonkey script is great for getting the strings from search results:

```
// ==UserScript==
// @name         WoWhead Item Search Results with Buttons
// @namespace    https://www.example.com/
// @version      1.0
// @description  Extracts item results from WoWhead search page and adds buttons next to each item in the result list
// @match        https://www.wowhead.com/search?q=*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to handle button click
    function handleButtonClick(itemId, itemName) {
        // Format the item ID and name as a JSON string
        const output =  "{% include wowhead-item.html itemId=\"" + itemId + "\" note=\"" + itemName +"\" %}";


        // Copy the JSON string to the clipboard
        navigator.clipboard.writeText(output);

                // Stop the event propagation
        event.stopPropagation();

    }

    // Get the current URL
    const currentUrl = window.location.href;

    // Extract the search query from the URL
    const regex = /https:\/\/www\.wowhead\.com\/search\?q=(.+)/;
    const match = currentUrl.match(regex);
    if (match) {
        const searchQuery = match[1];

        // Retrieve the item results table
        const table = document.querySelector('.listview');

        if (table) {
            // Retrieve all the rows in the table body
            const rows = table.querySelectorAll('tbody tr');
            console.log(rows)
            rows.forEach(row => {

                const itemNameElement = row.querySelector('.listview-cleartext');
                console.log(itemNameElement);
                const itemName = itemNameElement.textContent;

                // Extract the item ID from the item link
                const itemLink = itemNameElement.getAttribute('href');
                const itemIdRegex = /\/item=(\d+)/;
                const itemIdMatch = itemLink.match(itemIdRegex);
                const itemId = itemIdMatch ? itemIdMatch[1] : null;

                console.log(itemId);

                // Create a button element
                const button = document.createElement('button');
                button.textContent = '📋';
                button.style.marginLeft = '10px';
                button.style.fontSize = '10px';
                button.style.padding = '10px';
                button.style.cursor = 'pointer';

                // Add a click event listener to the button
                button.addEventListener('click', () => {
                    handleButtonClick(itemId, itemName);
                });

                // Append the button to the row
                const cell = row.querySelector('.listview-cleartext').parentElement;
                cell.appendChild(button);

                                // Add a click event listener to the row to prevent the event propagation
                row.addEventListener('click', event => {
                    event.stopPropagation();
                });

            });
        } else {
            console.log('Item results table not found');
        }
    } else {
        console.log('No search query found in URL');
    }
})();
```