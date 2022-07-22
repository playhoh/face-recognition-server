# Face recognition based on face-api.js

Deployment note (vercel):

Set the environment variable to include the zlib shared object from the node modules directory of canvas. Will not work otherwise.

<pre>
LD_PRELOAD=/var/task/node_modules/canvas/build/Release/libz.so.1
</pre>