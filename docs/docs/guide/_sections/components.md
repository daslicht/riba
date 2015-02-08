Components let you define reusable views that can be injected into any of your templates. For some perspective on where components fit into your templates; binders define custom attributes, while components define custom elements.

The components API is quite simple, but provides alot of flexibility. A component object must define a `template` function, which returns an HTML string or the template element itself, and it must define an `initialize` function, which returns the scope object to bind with (this will likely be a controller / viewmodel / presenter).

```javascript
rivets.components['todo-item'] = {
  // Return the template for the component.
  template: function() {
    return JST['todos/todo-item']
  },

  // Takes the original element and the data that was passed into the
  // component (either from rivets.init or the attributes on the component
  // element in the template).
  initialize: function(el, data) {
    return new ItemController({
      item: data.item
    })
  }
}
```

And to use the component in your templates, add an element with the same name as the component's key. All attributes here will be evaluated as keypaths before getting passed to the component's `initialize` function.

```html
<todo-item item="myItem"></todo-item>
```

These keypaths will also be observed in both directions so that the component will update if the value changes from the outside and it will set the value if the component changes it from the inside.