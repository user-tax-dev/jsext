```
ni -D @u6x/jsext
```

Node.js 19 has removed the --experimental-specifier-resolution flag. Its functionality can now be achieved via custom loaders.

use this instead

USE :

```
#!/usr/bin/env -S node --loader=@u6x/jsext

import split from 'utax/split'
```
