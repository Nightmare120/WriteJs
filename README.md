# Write JS

A JavaScript library to create text typing Animanation

## Get Started

### Cdn
```html

<script src="https://cdn.jsdelivr.net/gh/Nightmare120/WriteJs@v1.0/dist/bundle.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
```
Copy the Script tag and Start using it in your project.

### Github
Nothing is better than reading the source code and manipulating it as you want. [WriteJS](https://github.com/Nightmare120/WriteJs), download the source code and use it as you want.

## Basics

### Accesing Single Element
```js
let element = document.getElementById("element")
let writter = new window.WriteJs(element)
```

### Accesing Multiple Element
```js
let elements = document.getElementsByClassName("elements")
elements.forEach(element => {
doSomeAnimantion(elements)
});
```

## Fuctions

### **Clear**

Clear can be used to clear the whole text. and you can specify the number of text to be clear.  
@params numberOfText, default = 1  
@return null

**This will delete the whole text of element**

```js
let writter = new window.WriteJs(yourElement)
writter.clear()
```

**Now, it will delete only specific number of text, which is 3**

```js
let writter = new window.WriteJs(yourElement)
writter.clear(3)
```

### **Write**

As its name says, it has a single purpose of writing text in the element.  
@params text  
@return null

**This will Write the text in element**

```js
let writter = new window.WriteJs(elements)
writter.write("Hello, World")
```

### **Times**

Times can be used to do some animation for sometimes times, like write hello three times.  
@params numberOfTimes  
@params task  
@return null

**This will do the task for 3 times.**

```js
let writter = new window.WriteJs(write) 
let task = () => {
    writter.clear() 
}
writter.times(3,task)
```

## Contribution

We are open to any contribution related to issues and features. 

### 1. Create a branch

`git checkout main` from any folder in your local writejs repository  
`git pull origin main` to ensure you have the latest main code  
`git checkout -b the-name-of-my-branch` (replacing the-name-of-my-branch with a suitable name) to create a branch  

### 2. Make the changes
Make the changes and test in browser


### 3. Push it
`git add -A && git commit -m "My message"` (replacing My message with a commit message, such as fix bugs in clear function) to stage and commit your changes

