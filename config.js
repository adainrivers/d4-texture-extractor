const config = {
    concurrencyLimit: 4,
    rawTexCommandLine: String.raw `F:\D4\Extraction\Rawtex\RawtexCmd.exe`,
    texconvCommandLine: "texconv.exe",
    textureFolder: String.raw `F:\D4\Extraction\Textures\Base\payload\Texture`,
    textureDataFolder: String.raw `F:\D4\Extraction\d4data\json\base\meta\Texture`,
    outputFormat: 'webp', // png, jpg, webp
};

module.exports = config;