# objection-softdelete
[![npm](https://img.shields.io/npm/v/objection-softdelete.svg)](https://www.npmjs.com/package/objection-softdelete)

Automatically handle soft-deleting with your Objection.js models.

## Installation
Install from npm:

```bash
npm install objection-softdelete
```

Register the plugin with an instance of objection:

```js
const objectionSoftDelete = require('objection-softdelete');
objectionSoftDelete.register(objection);
```


## Configuration
By default, objection-softdelete uses the `deletedAt` attribute for soft-deletes. You can optionally pass in an options object as the second argument to register to specify a custom attribute to use:

```js
objectionSoftDelete.register(objection, {
  deleteAttr: 'deletedOn'
});
```

## Usage
When soft-delete is enabled on a model, the delete timestamp will be set to `new Date()` on deletion.

### Enable soft-delete for a model
Set the `softDelete` static property on your model to true:

```js
class MyModel {
  static get softDelete() {
    return true;
  }
}
```

When softDelete is enabled, all delete queries to this model will instead update the model with a delete timestamp, and all queries to find these models will omit deleted instances.

### Include deleted records in query
```js
MyModel.query().includeDeleted();
```

### Force delete
```js
MyModel.query().forceDelete();
```
