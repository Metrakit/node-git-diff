## Example :

```
var git_diff = require('node-git-diff');

git_diff({
	commits: {
		from: "hash-example",
		to: "master"
	},
	deploy_path: '/deploy'
});
```