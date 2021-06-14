# JsHookScript

JsHookScript, All the hook scripts I know

## JSHook  menu(PC)

- [x] Hook Everthing of eval
- [x] Hook Everthing of btoa
- [x] Hook Everthing of cookie


## JSHook Theorem

### Hook function or object

```js
// 0.Tips A hint might be a good choice
alter("Start Hooking...")
// 1.Building replica function objects,  Prepare the hook
var func_cache = func;
// 2.rewrite function to hook;
func = function() {
	// your hook logic
	
	return func_cache;
}
// 3.Disguise the prototype

// example hook eval
(function () {
    alert('Start Hooking ...');
    function Hooker(obj, attr) {
        var func = obj[attr]
        obj[attr] = function () {
            console.log('hooked', obj, attr, arguments);
            var result = func.apply(obj, arguments);
            debugger;
            console.log('result', result);
            return result;
        }
        // Disguise the prototype
        attr.toString = function () {
            return "function eval() { [native code] }";
        };
        attr.length = 1;
    }
    Hooker(window, 'eval')
})()
```

#### Hook attribute

Object.defineProperty()

The static method `Object.defineProperty()` defines a new property directly on an object, or modifies an existing property on an object, and returns the object.

```js
// 0.Tips A hint might be a good choice
alter("Start Hooking...")
    // 1.Building replica function objects,  Prepare the hook
var func = obj[attr]
    // 2.Monitor it. Prepare the hook
Object.defineProperty(obj, 'attr', {
    set: function() {
        // your hook logic， when set attr(Commonly used)
    },
    get: function() {
        // your hook logic， when set attr(Not Commonly used)
    }
})

// example: One of the most basic
(function() {
    alert("Starting Hook")
    cookie_cache = document.cookie
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



