const config = {
    debug: false,
    concurrencyLimit: 4,
    gameFolder: String.raw`F:\Diablo IV`,
    outputFormat: 'png', // png, jpg, webp
    filter: '*',
    nocrop: false,
    noslice: false,
    noslicefolders: false,
    textureFormats: {
        0: {
            dxgi: 'DXGI_FORMAT_B8G8R8A8_UNORM',
            opengl: 'GL_RGBA8',
            alignment: 64
        },
        7: {
            dxgi: 'DXGI_FORMAT_A8_UNORM',
            opengl: 'GL_R8',
            alignment: 64
        },
        9: {
            format: 'BC1',
            dxgi: 'DXGI_FORMAT_BC1_UNORM',
            opengl: 'GL_COMPRESSED_RGB_S3TC_DXT1_EXT',
            alignment: 128
        },
        10: {
            format: 'BC1',
            dxgi: 'DXGI_FORMAT_BC1_UNORM',
            opengl: 'GL_COMPRESSED_RGB_S3TC_DXT1_EXT',
            alignment: 128
        },
        12: {
            format: 'BC3',
            dxgi: 'DXGI_FORMAT_BC3_UNORM',
            opengl: 'GL_COMPRESSED_RGBA_S3TC_DXT5_EXT',
            alignment: 64
        },
        23: {
            dxgi: 'DXGI_FORMAT_A8_UNORM',
            opengl: 'GL_R8',
            alignment: 128
        },
        25: {
            dxgi: 'DXGI_FORMAT_R16G16B16A16_FLOAT',
            opengl: 'GL_RGBA16F',
            alignment: 64
        },
        41: {
            format: 'BC4',
            dxgi: 'DXGI_FORMAT_BC4_UNORM',
            opengl: 'GL_COMPRESSED_RED_RGTC1',
            alignment: 64
        },
        42: {
            format: 'BC5U',
            dxgi: 'DXGI_FORMAT_BC5_UNORM',
            opengl: 'GL_COMPRESSED_RG_RGTC2',
            alignment: 64
        },
        43: {
            format: 'BC6',
            dxgi: 'DXGI_FORMAT_BC6H_SF16',
            opengl: 'GL_COMPRESSED_RGB_BPTC_SIGNED_FLOAT_ARB',
            alignment: 64
        },
        44: {
            format: 'BC7',
            dxgi: 'DXGI_FORMAT_BC7_UNORM',
            opengl: 'GL_COMPRESSED_RGBA_BPTC_UNORM_ARB',
            alignment: 64
        },
        45: {
            dxgi: 'DXGI_FORMAT_B8G8R8A8_UNORM',
            opengl: 'GL_RGBA8',
            alignment: 64
        },
        46: {
            format: 'BC1',
            dxgi: 'DXGI_FORMAT_BC1_UNORM',
            opengl: 'GL_COMPRESSED_RGB_S3TC_DXT1_EXT',
            alignment: 64
        },
        47: {
            format: 'BC1',
            dxgi: 'DXGI_FORMAT_BC1_UNORM',
            opengl: 'GL_COMPRESSED_RGBA_S3TC_DXT1_EXT',
            alignment: 128
        },
        48: {
            format: 'BC2',
            dxgi: 'DXGI_FORMAT_BC2_UNORM',
            opengl: 'GL_COMPRESSED_RGBA_S3TC_DXT3_EXT',
            alignment: 64
        },
        49: {
            format: 'BC3',
            dxgi: 'DXGI_FORMAT_BC3_UNORM',
            opengl: 'GL_COMPRESSED_RGBA_S3TC_DXT5_EXT',
            alignment: 64
        },
        50: {
            format: 'BC7',
            dxgi: 'DXGI_FORMAT_BC7_UNORM',
            opengl: 'GL_COMPRESSED_RGBA_BPTC_UNORM_ARB',
            alignment: 64
        },
        51: {
            format: 'BC6',
            dxgi: 'DXGI_FORMAT_BC6H_UF16',
            opengl: 'GL_COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_ARB',
            alignment: 64
        }
    }
};

module.exports = config;