This is the style guide for group E (Data, Winter)
We will use two seperate style guides, one for D3 and one for Javascript.
We will be using CamelCase throughout our code, so if we write two words after each other we will write it as twoWords.
The double Quotation mark will be used, so if it is needed we will use "".   

## D3 Style guide:
- Put each new method on its own indented line.
- If your code breaks, look for a wayward semicolon.
- The methods depend on how the operand was created.
- Create only one new element (or element set) per block.
- Assign each block to a logical variable (the block’s ‘name’).
- Assign each new element a class name identical to the block name.
- Always pass the block’s name as a class selector to the .selectAll method, even when creating an empty selection.
- Assign static or default styles using a CSS stylesheet.
- For dynamic inline style rules, use .style instead of .attr.
- Make sure the data are the correct type for the operations using them.

We found these rules on (https://northlandia.wordpress.com/2014/10/23/ten-best-practices-for-coding-with-d3/), which gives examples about what everything means. The examples are clear and easy to use.


## Javascript Style guide:
This guide is based upon (https://google.github.io/styleguide/jsguide.html).
When looking at this guide, some useful examples were found and converted into our own style guide!


File names 
Must be all lowercase and may include underscores ( _ ) or dashes (-), but no additional punctuation. Follow the convention that your project uses. Filenames’ extension must be .js

File Extensions

HTML files should have a .html extension (not .htm).
CSS files should have a .css extension.
JavaScript files should have a .js extension.


Block indentation: 

+2 spaces
Each time a new block or block-like construct is opened, the indent increases by two spaces. When the block ends, the indent returns to the previous indent level. The indent level applies to both code and comments throughout the block.


Block comment style

Block comments are indented at the same level as the surrounding code. They may be in /* … / or //-style. For multi-line / … * / comments, subsequent lines must start with * aligned with the * on the previous line, to make comments obvious with no extra context. “Parameter name” comments should appear after values whenever the value and method name do not sufficiently convey the meaning.

Variable Names

At W3schools we use camelCase for identifier names (variables and functions).
All names start with a letter.

Spaces Around Operators

Always put spaces around operators ( = + - * / ), and after commas:

Code Indentation

Always use 2 spaces for indentation of code blocks:

Statement Rules

General rules for simple statements:
Always end a simple statement with a semicolon.
General rules for complex (compound) statements:
Put the opening bracket at the end of the first line.
Use one space before the opening bracket.
Put the closing bracket on a new line, without leading spaces.
Do not end a complex statement with a semicolon.


General rules for object definitions:
Place the opening bracket on the same line as the object name.
Use colon plus one space between each property and its value.
Use quotes around string values, not around numeric values.
Do not add a comma after the last property-value pair.
Place the closing bracket on a new line, without leading spaces.
Always end an object definition with a semicolon.
Short objects can be written compressed, on one line, using spaces only between properties, like this

Line Length < 80
For readability, avoid lines longer than 80 characters.
If a JavaScript statement does not fit on one line, the best place to break it, is after an operator or a comma.

Naming Conventions
Always use the same naming convention for all your code. For example:
Variable and function names written as camelCase
Global variables written in UPPERCASE (We don't, but it's quite common)
Constants (like PI) written in UPPERCASE
