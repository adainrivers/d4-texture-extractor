const config = {
    debug: false,
    concurrencyLimit: 4,
    rawTexCommandLine: String.raw`F:\D4\Extraction\Rawtex\RawtexCmd.exe`,
    texconvCommandLine: "texconv.exe",
    textureFolder: String.raw`F:\D4\Extraction\Textures\Base\payload\Texture`,
    textureDataFolder: String.raw`F:\D4\Extraction\d4data\json\base\meta\Texture`,
    outputFormat: 'png', // png, jpg, webp
    filter: '*',
    nocrop: false,
    textureFormats: {
        0: {
            format: 'B8G8R8A8_UNORM',
            dxgi: 'DXGI_FORMAT_B8G8R8A8_UNORM',
            opengl: 'GL_RGBA8',
            alignment: 64
        },
        7: {
            format: 'A8_UNORM',
            dxgi: 'DXGI_FORMAT_A8_UNORM',
            opengl: 'GL_R8',
            alignment: 64
        },
        9: {
            rawtexFormat: 'BC1',
            format: 'BC1_UNORM',
            dxgi: 'DXGI_FORMAT_BC1_UNORM',
            opengl: 'GL_COMPRESSED_RGB_S3TC_DXT1_EXT',
            alignment: 128
        },
        10: {
            rawtexFormat: 'BC1',
            format: 'BC1_UNORM',
            dxgi: 'DXGI_FORMAT_BC1_UNORM',
            opengl: 'GL_COMPRESSED_RGB_S3TC_DXT1_EXT',
            alignment: 128
        },
        12: {
            rawtexFormat: 'BC3',
            format: 'BC3_UNORM',
            dxgi: 'DXGI_FORMAT_BC3_UNORM',
            opengl: 'GL_COMPRESSED_RGBA_S3TC_DXT5_EXT',
            alignment: 64
        },
        23: {
            format: 'A8_UNORM',
            dxgi: 'DXGI_FORMAT_A8_UNORM',
            opengl: 'GL_R8',
            alignment: 128
        },
        25: {
            format: 'R16G16B16A16_FLOAT',
            dxgi: 'DXGI_FORMAT_R16G16B16A16_FLOAT',
            opengl: 'GL_RGBA16F',
            alignment: 64
        },
        41: {
            rawtexFormat: 'BC4',
            format: 'BC4_UNORM',
            dxgi: 'DXGI_FORMAT_BC4_UNORM',
            opengl: 'GL_COMPRESSED_RED_RGTC1',
            alignment: 64
        },
        42: {
            rawtexFormat: 'BC5U',
            format: 'BC5_UNORM',
            dxgi: 'DXGI_FORMAT_BC5_UNORM',
            opengl: 'GL_COMPRESSED_RG_RGTC2',
            alignment: 64
        },
        43: {
            rawtexFormat: 'BC6',
            format: 'BC6H_SF16',
            dxgi: 'DXGI_FORMAT_BC6H_SF16',
            opengl: 'GL_COMPRESSED_RGB_BPTC_SIGNED_FLOAT_ARB',
            alignment: 64
        },
        44: {
            rawtexFormat: 'BC7',
            format: 'BC7_UNORM',
            dxgi: 'DXGI_FORMAT_BC7_UNORM',
            opengl: 'GL_COMPRESSED_RGBA_BPTC_UNORM_ARB',
            alignment: 64
        },
        45: {
            format: 'B8G8R8A8_UNORM',
            dxgi: 'DXGI_FORMAT_B8G8R8A8_UNORM',
            opengl: 'GL_RGBA8',
            alignment: 64
        },
        46: {
            rawtexFormat: 'BC1',
            format: 'BC1_UNORM',
            dxgi: 'DXGI_FORMAT_BC1_UNORM',
            opengl: 'GL_COMPRESSED_RGB_S3TC_DXT1_EXT',
            alignment: 128
        },
        47: {
            rawtexFormat: 'BC1',
            format: 'BC1_UNORM',
            dxgi: 'DXGI_FORMAT_BC1_UNORM',
            opengl: 'GL_COMPRESSED_RGBA_S3TC_DXT1_EXT',
            alignment: 128
        },
        48: {
            rawtexFormat: 'BC2',
            format: 'BC2_UNORM',
            dxgi: 'DXGI_FORMAT_BC2_UNORM',
            opengl: 'GL_COMPRESSED_RGBA_S3TC_DXT3_EXT',
            alignment: 64
        },
        49: {
            rawtexFormat: 'BC3',
            format: 'BC3_UNORM',
            dxgi: 'DXGI_FORMAT_BC3_UNORM',
            opengl: 'GL_COMPRESSED_RGBA_S3TC_DXT5_EXT',
            alignment: 64
        },
        50: {
            rawtexFormat: 'BC7',
            format: 'BC7_UNORM',
            dxgi: 'DXGI_FORMAT_BC7_UNORM',
            opengl: 'GL_COMPRESSED_RGBA_BPTC_UNORM_ARB',
            alignment: 64
        },
        51: {
            rawtexFormat: 'BC6',
            format: 'BC6H_UF16',
            dxgi: 'DXGI_FORMAT_BC6H_UF16',
            opengl: 'GL_COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_ARB',
            alignment: 64
        }
    }
};

module.exports = config;