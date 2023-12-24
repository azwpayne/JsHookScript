# JsHookScript

We know that JS reverse analysis is very slow and difficult, so how to simplify this process.
Hook will benefit you and me a lot

JsHoook Script is Js Hook axiom。it want tell you how to use js to hook

## JSHook  menu(PC)

### Hook function

- [x] Hook Everthing of eval
- [x] Hook Everthing of Base64

### Hook Attributes

- [x] Hook Everthing of cookie

### Hook Prototype chain

- [x] Hook String of split
- [x] Hook Everthing of Function

## JSHook Theorem

### Hook function or object

#### Theorem

0. Tips A hint might be a good choice

   ```js
   alter("Start Hooking...")
   ```

1. Building replica function objects,  Prepare the hook

   ```js
   var func_cache = func;
   ```

2. rewrite function to hook;

   ```js
   func = function() {
    // your hook logic
    
    return func_cache;
   }
   ```

3. Disguise the prototype

#### Sample code

```js
// example hook eval
(function () {
    // 0.Tips A hint might be a good choice
    alert('Start Hooking ...');
   // 1.Building replica function objects,  Prepare the hook
    function Hooker(obj, attr) {
       // 2. rewrite function to hook;
        var func = obj[attr]
        obj[attr] = function () {
            console.log('hooked', obj, attr, arguments);
            var result = func.apply(obj, arguments);
            debugger;
            console.log('result', result);
            return result;
        }
        //3.Disguise the prototype
        attr.toString = function () {
            return "function eval() { [native code] }";
        };
        attr.length = 1;
    }
    Hooker(window, 'eval')
})()
```

### Hook attribute

> Object.defineProperty()
>
> The static method `Object.defineProperty()` defines a new property directly on an object, or modifies an existing property on an object, and returns the object.

#### Theorem

0. Tips A hint might be a good choice

   ```js
   alter("Start Hooking...")
   ```

1. Building replica function objects,  Prepare the hook

   ```js
   var func = obj[attr]
   ```

2. Bind monitor function to hook;

   ```js
   Object.defineProperty(obj, 'attr', {
       set: function() {
           // your hook logic， when set attr(Commonly used)
       },
       get: function() {
           // your hook logic， when set attr(Not Commonly used)
       }
   })
   ```

> note：
>
> When all objects are bound before binding, it becomes invalid

#### Sample code

```js
(function() {
   // 0.Tips A hint might be a good choice
    alert("Starting Hook")
    // 1. Building replica function objects,  Prepare the hook
    cookie_cache = document.cookie
   // 2. Bind monitor function to hook;
    Object.defineProperty(document, 'cookie', {
        get: function() {
            debugger;
            return cookie_cache;
        },
        set: function() {
            debugger;
            return cookie_cache;
        }
    })
}())
```

### Hook according to the prototype chain

> Sometimes we want to hook the method of a function, but the above method is difficult to satisfy. According to the prototype chain, it can be done easily

#### Theorem

0. Tips A hint might be a good choice

   ```js
   alter("Start Hooking...")
   ```

1. Building replica function Prototype chain objects,  Prepare the hook

   ```js
   let function.prototype.func_cache = function.prototype.func;
   ```

2. rewrite function to hook;

   ```js
   func = function() {
    // your hook logic
    
    return func_cache;
   }
   ```

3. Disguise the prototype

   ```js
   1.Disguise toString
   attr.toString = function () {
     return "function func() { [native code] }";
   };
   2. Disguise length
   attr.length = 1;
   3.remove cache
   function.prototype.func_cache = undefined
   ```

Sample code

```js
(function () {
   // 0.Tips A hint might be a good choice
    alert('Start Hook');
    function hook() {
        // 1.Building replica function Prototype chain objects,  Prepare the hook
        XMLHttpRequest.prototype.setRequestHeader_cache = XMLHttpRequest.prototype.setRequestHeader;
        // 2.rewrite function to hook;
        XMLHttpRequest.prototype.setRequestHeader = function (val) {
            console.log("Hook val", val);
            debugger;
            return XMLHttpRequest.prototype.setRequestHeader_cache(val);
        }
        // Disguise the prototype
        XMLHttpRequest.toString = function (){
            return "function XMLHttpRequest() { [native code] }";
        };
        XMLHttpRequest.prototype.setRequestHeader_cache = undefined;
        XMLHttpRequest.length = 1;
    }
    hook()
}());
```


## AST-Hook

[ast-hook-for-js-RE](https://github.com/JSREI/ast-hook-for-js-RE)