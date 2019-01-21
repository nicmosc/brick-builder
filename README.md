# Brick builder

Demo: https://nicmosc.github.io/brick-builder/

![screenshot](/examples/screenshot.png "Screenshot")

## What is this?
Brick Builder is a simple web app to create brick objects (heavily inspired by Lego in fact). You can also import and export models from the menu! To get started you can download the example models in the `examples` folder and import them in the demo.

### Usage
Install with
```
npm install
```

Develop with
```
npm start
```

Build for production
```
npm run build
```

Since this is built as a static SPA, to run it in production use any method you want, though the simplest is to run a python server locally:
```
python -m SimpleHTTPServer
```
which will serve the files. By default they will be at `http://localhost:8000`.


### To do
- [x] Paint mode
- [x] Export/import
- [ ] Undo
- [x] Reset scene (delete all)
- [x] Different brick sizes (shapes)
- [x] Show/hide grid
- [ ] Control UI (rotate, drag)
- [ ] Save image
- [ ] Generate public link to AR app (in the works)
