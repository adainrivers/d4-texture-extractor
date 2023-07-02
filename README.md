# Diablo 4 Texture Extractor

## What it does

It converts .tex files to png, webp or jpg. Also slices the files into separate image files when applicable.

## Known Issues

- Only 2 texture formats are supported at this time, 47 and 49, working on the rest. If you wanna experiment, you can add more to `config.js`.

## Installation

1. Clone this repo
2. Clone `d4data` from https://github.com/blizzhackers/d4data
3. Download and extract `RawTexCmd.exe` from https://forum.xentax.com/viewtopic.php?t=16461
4. Download `texconv.exe` from https://github.com/microsoft/DirectXTex/releases
5. Extract texture assets from the game using `CascExolorer`, you can download it from https://github.com/WoW-Tools/CASCExplorer/releases. After downloading, you need to add the following line to `CascExplorer.exe.config` file:

```
    <add key="fenris" value="Diablo IV" />
```

> You can find the texture files are in `base/payload/Texture` folder.

6. Set the correct paths by either using the provided command line options or by editing `config.js` file.
7. Run `npm install` in the app folder.


## Usage

```
Usage: node ./index.js [options]

Options:
  -c, --concurrency <number>   number of concurrent tasks
  -rt, --rawtex <path>         path to RawTexCmd.exe
  -tc, --texconv <path>        path to texconv.exe
  -t, --textures <path>        path to folder containing textures extracted with CASCExplorer
  -d, --texturedata <path>     path to 'd4data\json\base\meta\Texture' folder
  -o, --outputformat <format>  png, jpg or webp
  -f, --filter <wildcard>      Wildcard to filter files to process, for example '2DUI*', no need to include .json extension, default is '*'
  -h, --help                   display help for command
```