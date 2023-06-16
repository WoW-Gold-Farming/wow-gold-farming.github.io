// ==UserScript==
// @name         WoWhead Item Search Results with Buttons
// @namespace    https://www.example.com/
// @version      1.0
// @description  Extracts item results from WoWhead search page and adds buttons next to each item in the result list
// @match        https://www.wowhead.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to handle button click
    function handleButtonClick(itemId, itemName) {
        // Format the item ID and name as a JSON string
        const output =  "- {% include wowhead-item.html itemId=\"" + itemId + "\" note=\"" + itemName +"\" %}";


        // Copy the JSON string to the clipboard
        navigator.clipboard.writeText(output);

                // Stop the event propagation
        event.stopPropagation();

    }

   function processCurrentTable() {
     // Get the current URL
    const currentUrl = window.location.href;

    // Extract the search query from the URL
    const regex = /https:\/\/www\.wowhead\.com\/search\?q=(.+)/;
    const match = true;
    if (match) {
        const searchQuery = match[1];

        // Retrieve the item results table
        const table = document.querySelector('.listview-mode-default');

        if (table) {
            // Retrieve all the rows in the table body
            const rows = table.querySelectorAll('tbody tr');

            let output = "";

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

                output +=  "- {% include wowhead-item.html itemId=\"" + itemId + "\" note=\"" + itemName +"\" %}\r\n";

                                // Add a click event listener to the row to prevent the event propagation
                row.addEventListener('click', event => {
                    event.stopPropagation();
                });

            });

        // Copy the JSON string to the clipboard
        navigator.clipboard.writeText(output);
        } else {
            console.log('Item results table not found');
        }
    } else {
        console.log('No search query found in URL');
    }
   }

    const table = document.querySelector('.listview-mode-default');

    if (table) {
                        const button = document.createElement('button');
                button.textContent = 'Add 📋';
                button.style.marginLeft = '10px';
                button.style.fontSize = '10px';
                button.style.padding = '10px';
                button.style.cursor = 'pointer';

                // Add a click event listener to the button
                button.addEventListener('click', () => {
                    processCurrentTable();
                });

        table.parentElement.insertBefore(button,table);

    }

})();