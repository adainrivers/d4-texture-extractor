# Diablo 4 Texture Extractor

## What it does

The Diablo 4 Texture Extractor is a tool that extracts and converts .tex files to PNG, WebP, or JPG formats. It can also slice the files into separate image files when applicable.

## Known Issues

- Some of the intermediate DDS files might not be valid, which can cause texconv to fail.

## Installation

1. Clone this repository by following the instructions in the [GitHub documentation](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository).
2. Download `CASCConsole` from [https://github.com/WoW-Tools/CASCExplorer/releases](https://github.com/WoW-Tools/CASCExplorer/releases). 
3. Extract it to the `CASCConsole` folder under `d4-texture-extractor` folder. `CASCConsole.exe` and the other files from the zip file should be in the same folder with `extract_cascconsole.exe_and_other_files_here`
4. Run `npm install` in `d4-texture-extractor` folder. You should have at least latest LTS version of [NodeJS](https://nodejs.org/en) installed.


## Usage

```
Usage: node ./index.js [options]
All options are optional

Options:
  -e, --extract                Automatically extract game files before processing (this will delete previously extracted files)
  -g, --gameFolder <path>      Path to Diablo IV folder, for example "C:\Program Files (x86)\Diablo IV\"
  -c, --concurrency <number>   number of concurrent tasks
  -o, --outputformat <format>  png, jpg or webp
  -p, --outputpath <path>      Full or relative path to output folder, default is './{outputformat}'
  -f, --filter <wildcard>      Wildcard to filter files to process, for example '2DUI*', no need to include .json extension, default is '*'
  -nc, --nocrop                Do not crop images to the size of the texture, useful for map textures
  -ns, --noslice               Do not slice the images, useful for map textures
  -nsf, --noslicefolders       Do not use slice folders, instead save slicers to the output folder, prefixed with the file name
  -h, --help                   display help for command
```

**Example 1:** Extract and convert all texture files starting with 2D into webp folder in webp format.

```
  node .\index.js -f 2D* -c 10 -o webp -g "C:\Program Files (x86)\Diablo IV" -e
```

**Example 2:** Convert previously extracted files starting with zmap in webp format without cropping and slicing.

```
  node .\index.js -f zmap* -c 10 -o webp -nc -ns
```

## Credits and thanks

- [Nishimura-Katsuo](https://github.com/Nishimura-Katsuo) for [d4data](https://github.com/blizzhackers/d4data) and all the guidance.
- WowTools Team for the beautiful [CASCExplorer](https://github.com/WoW-Tools/CASCExplorer)
- [chuanhsing](https://www.reddit.com/user/chuanhsing) of [Diablo 4 Database](https://diablo4.cc/us/) for being a early tester and valuable feedback.
- InterCeptor for providing all the texture formats.
- daemon1 for inspiring work on [Rawtex tool](https://forum.xentax.com/viewtopic.php?t=16461)
- Tspoon from [Map Genie](https://mapgenie.io/) for guiding me to start this
- DevLeon from [Diablo 4 Map](https://diablo4.th.gl/) for his crazy bash scripts

And finally to [ChatGPT](https://openai.com/blog/chatgpt) for doing half of the work for me :)
