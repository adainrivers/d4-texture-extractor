# Diablo 4 Texture Extractor

## What it does

It converts .tex files to png, webp or jpg. Also slices the files into separate image files when applicable.

## Known Issues

- Some of the intermediate dds files might not be valid, causing texconv to fail.

## Installation

1. Clone this repo (https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository)
2. Clone `d4data` from https://github.com/blizzhackers/d4data
3. Extract texture assets from the game using `CASCExplorer`, you can download it from https://github.com/WoW-Tools/CASCExplorer/releases. Use `CASCExplorer-v1.0.206` or newer.

You can find the texture files are in `base/payload/Texture` folder.

Alternatively you can download `CASCConsole` from the same URL and use the following command line to extract the textures:

Using your local copy of Diablo 4:
```
CASCConsole -m Pattern -e "Base\payload\Texture\*.tex" -d Texture -l All -p fenris -s "C:\Program Files (x86)\Diablo IV"
```

Using the CDN version:
```
CASCConsole -m Pattern -e "Base\payload\Texture\*.tex" -d Texture -l All -p fenris -o
```

4. **Set the correct paths by editing `config.js` file ** if you are not planning to provide them through the command line options. Prefered way is to use the command line options.
5. Run `npm install` in the app folder.


## Usage

```
Usage: node ./index.js [options]
All options are optional

Options:
  -c, --concurrency <number>   number of concurrent tasks
  -t, --textures <path>        path to folder containing textures extracted with CASCExplorer or CASCConsole
  -d, --texturedata <path>     path to 'd4data\json\base\meta\Texture' folder
  -o, --outputformat <format>  png, jpg or webp
  -p, --outputpath <path>      Full or relative path to output folder, default is './{outputformat}'
  -f, --filter <wildcard>      Wildcard to filter files to process, for example '2DUI*', no need to include .json extension, default is '*'
  -nc, --nocrop                Do not crop images to the size of the texture, useful for map textures
  -ns, --noslice               Do not slice the images, useful for map textures
  -nsf, --noslicefolders       Do not use slice folders, instead save slicers to the output folder, prefixed with the file name
  -h, --help                   display help for command               display help for command

Example:
  node .\index.js -f 2D* -c 10 -o webp -d "F:\D4\Extraction\d4data\json\base\meta\Texture" -t "F:\D4\Extraction\CASCConsole\Texture\Base\payload\Texture" 
```