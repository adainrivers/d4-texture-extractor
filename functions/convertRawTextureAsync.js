const fs = require('fs');
const { promisify } = require('util');
const writeFile = promisify(fs.writeFile);
const logger = require('./logger');

const textureFormats = {
    0: { DXGI: 'DXGI_FORMAT_B8G8R8A8_UNORM', OpenGL: 'GL_RGBA8', Alignment: 64 },
    7: { DXGI: 'DXGI_FORMAT_A8_UNORM', OpenGL: 'GL_R8', Alignment: 64 },
    9: { DXGI: 'DXGI_FORMAT_BC1_UNORM', OpenGL: 'GL_COMPRESSED_RGB_S3TC_DXT1_EXT', Alignment: 128 },
    10: { DXGI: 'DXGI_FORMAT_BC1_UNORM', OpenGL: 'GL_COMPRESSED_RGB_S3TC_DXT1_EXT', Alignment: 128 },
    12: { DXGI: 'DXGI_FORMAT_BC3_UNORM', OpenGL: 'GL_COMPRESSED_RGBA_S3TC_DXT5_EXT', Alignment: 64 },
    23: { DXGI: 'DXGI_FORMAT_A8_UNORM', OpenGL: 'GL_R8', Alignment: 128 },
    25: { DXGI: 'DXGI_FORMAT_R16G16B16A16_FLOAT', OpenGL: 'GL_RGBA16F', Alignment: 64 },
    41: { DXGI: 'DXGI_FORMAT_BC4_UNORM', OpenGL: 'GL_COMPRESSED_RED_RGTC1', Alignment: 64 },
    42: { DXGI: 'DXGI_FORMAT_BC5_UNORM', OpenGL: 'GL_COMPRESSED_RG_RGTC2', Alignment: 64 },
    43: { DXGI: 'DXGI_FORMAT_BC6H_SF16', OpenGL: 'GL_COMPRESSED_RGB_BPTC_SIGNED_FLOAT_ARB', Alignment: 64 },
    44: { DXGI: 'DXGI_FORMAT_BC7_UNORM', OpenGL: 'GL_COMPRESSED_RGBA_BPTC_UNORM_ARB', Alignment: 64 },
    45: { DXGI: 'DXGI_FORMAT_B8G8R8A8_UNORM', OpenGL: 'GL_RGBA8', Alignment: 64 },
    46: { DXGI: 'DXGI_FORMAT_BC1_UNORM', OpenGL: 'GL_COMPRESSED_RGB_S3TC_DXT1_EXT', Alignment: 128 },
    47: { DXGI: 'DXGI_FORMAT_BC1_UNORM', OpenGL: 'GL_COMPRESSED_RGBA_S3TC_DXT1_EXT', Alignment: 128 },
    48: { DXGI: 'DXGI_FORMAT_BC2_UNORM', OpenGL: 'GL_COMPRESSED_RGBA_S3TC_DXT3_EXT', Alignment: 64 },
    49: { DXGI: 'DXGI_FORMAT_BC3_UNORM', OpenGL: 'GL_COMPRESSED_RGBA_S3TC_DXT5_EXT', Alignment: 64 },
    50: { DXGI: 'DXGI_FORMAT_BC7_UNORM', OpenGL: 'GL_COMPRESSED_RGBA_BPTC_UNORM_ARB', Alignment: 64 },
    51: { DXGI: 'DXGI_FORMAT_BC6H_UF16', OpenGL: 'GL_COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_ARB', Alignment: 64 },
};

const ddDXGI = [
    'DXGI_FORMAT_UNKNOWN',
    'DXGI_FORMAT_R32G32B32A32_TYPELESS',
    'DXGI_FORMAT_R32G32B32A32_FLOAT',
    'DXGI_FORMAT_R32G32B32A32_UINT',
    'DXGI_FORMAT_R32G32B32A32_SINT',
    'DXGI_FORMAT_R32G32B32_TYPELESS',
    'DXGI_FORMAT_R32G32B32_FLOAT',
    'DXGI_FORMAT_R32G32B32_UINT',
    'DXGI_FORMAT_R32G32B32_SINT',
    'DXGI_FORMAT_R16G16B16A16_TYPELESS',
    'DXGI_FORMAT_R16G16B16A16_FLOAT',
    'DXGI_FORMAT_R16G16B16A16_UNORM',
    'DXGI_FORMAT_R16G16B16A16_UINT',
    'DXGI_FORMAT_R16G16B16A16_SNORM',
    'DXGI_FORMAT_R16G16B16A16_SINT',
    'DXGI_FORMAT_R32G32_TYPELESS',
    'DXGI_FORMAT_R32G32_FLOAT',
    'DXGI_FORMAT_R32G32_UINT',
    'DXGI_FORMAT_R32G32_SINT',
    'DXGI_FORMAT_R32G8X24_TYPELESS',
    'DXGI_FORMAT_D32_FLOAT_S8X24_UINT',
    'DXGI_FORMAT_R32_FLOAT_X8X24_TYPELESS',
    'DXGI_FORMAT_X32_TYPELESS_G8X24_UINT',
    'DXGI_FORMAT_R10G10B10A2_TYPELESS',
    'DXGI_FORMAT_R10G10B10A2_UNORM',
    'DXGI_FORMAT_R10G10B10A2_UINT',
    'DXGI_FORMAT_R11G11B10_FLOAT',
    'DXGI_FORMAT_R8G8B8A8_TYPELESS',
    'DXGI_FORMAT_R8G8B8A8_UNORM',
    'DXGI_FORMAT_R8G8B8A8_UNORM_SRGB',
    'DXGI_FORMAT_R8G8B8A8_UINT',
    'DXGI_FORMAT_R8G8B8A8_SNORM',
    'DXGI_FORMAT_R8G8B8A8_SINT',
    'DXGI_FORMAT_R16G16_TYPELESS',
    'DXGI_FORMAT_R16G16_FLOAT',
    'DXGI_FORMAT_R16G16_UNORM',
    'DXGI_FORMAT_R16G16_UINT',
    'DXGI_FORMAT_R16G16_SNORM',
    'DXGI_FORMAT_R16G16_SINT',
    'DXGI_FORMAT_R32_TYPELESS',
    'DXGI_FORMAT_D32_FLOAT',
    'DXGI_FORMAT_R32_FLOAT',
    'DXGI_FORMAT_R32_UINT',
    'DXGI_FORMAT_R32_SINT',
    'DXGI_FORMAT_R24G8_TYPELESS',
    'DXGI_FORMAT_D24_UNORM_S8_UINT',
    'DXGI_FORMAT_R24_UNORM_X8_TYPELESS',
    'DXGI_FORMAT_X24_TYPELESS_G8_UINT',
    'DXGI_FORMAT_R8G8_TYPELESS',
    'DXGI_FORMAT_R8G8_UNORM',
    'DXGI_FORMAT_R8G8_UINT',
    'DXGI_FORMAT_R8G8_SNORM',
    'DXGI_FORMAT_R8G8_SINT',
    'DXGI_FORMAT_R16_TYPELESS',
    'DXGI_FORMAT_R16_FLOAT',
    'DXGI_FORMAT_D16_UNORM',
    'DXGI_FORMAT_R16_UNORM',
    'DXGI_FORMAT_R16_UINT',
    'DXGI_FORMAT_R16_SNORM',
    'DXGI_FORMAT_R16_SINT',
    'DXGI_FORMAT_R8_TYPELESS',
    'DXGI_FORMAT_R8_UNORM',
    'DXGI_FORMAT_R8_UINT',
    'DXGI_FORMAT_R8_SNORM',
    'DXGI_FORMAT_R8_SINT',
    'DXGI_FORMAT_A8_UNORM',
    'DXGI_FORMAT_R1_UNORM',
    'DXGI_FORMAT_R9G9B9E5_SHAREDEXP',
    'DXGI_FORMAT_R8G8_B8G8_UNORM',
    'DXGI_FORMAT_G8R8_G8B8_UNORM',
    'DXGI_FORMAT_BC1_TYPELESS',
    'DXGI_FORMAT_BC1_UNORM',
    'DXGI_FORMAT_BC1_UNORM_SRGB',
    'DXGI_FORMAT_BC2_TYPELESS',
    'DXGI_FORMAT_BC2_UNORM',
    'DXGI_FORMAT_BC2_UNORM_SRGB',
    'DXGI_FORMAT_BC3_TYPELESS',
    'DXGI_FORMAT_BC3_UNORM',
    'DXGI_FORMAT_BC3_UNORM_SRGB',
    'DXGI_FORMAT_BC4_TYPELESS',
    'DXGI_FORMAT_BC4_UNORM',
    'DXGI_FORMAT_BC4_SNORM',
    'DXGI_FORMAT_BC5_TYPELESS',
    'DXGI_FORMAT_BC5_UNORM',
    'DXGI_FORMAT_BC5_SNORM',
    'DXGI_FORMAT_B5G6R5_UNORM',
    'DXGI_FORMAT_B5G5R5A1_UNORM',
    'DXGI_FORMAT_B8G8R8A8_UNORM',
    'DXGI_FORMAT_B8G8R8X8_UNORM',
    'DXGI_FORMAT_R10G10B10_XR_BIAS_A2_UNORM',
    'DXGI_FORMAT_B8G8R8A8_TYPELESS',
    'DXGI_FORMAT_B8G8R8A8_UNORM_SRGB',
    'DXGI_FORMAT_B8G8R8X8_TYPELESS',
    'DXGI_FORMAT_B8G8R8X8_UNORM_SRGB',
    'DXGI_FORMAT_BC6H_TYPELESS',
    'DXGI_FORMAT_BC6H_UF16',
    'DXGI_FORMAT_BC6H_SF16',
    'DXGI_FORMAT_BC7_TYPELESS',
    'DXGI_FORMAT_BC7_UNORM',
    'DXGI_FORMAT_BC7_UNORM_SRGB',
    'DXGI_FORMAT_AYUV',
    'DXGI_FORMAT_Y410',
    'DXGI_FORMAT_Y416',
    'DXGI_FORMAT_NV12',
    'DXGI_FORMAT_P010',
    'DXGI_FORMAT_P016',
    'DXGI_FORMAT_420_OPAQUE',
    'DXGI_FORMAT_YUY2',
    'DXGI_FORMAT_Y210',
    'DXGI_FORMAT_Y216',
    'DXGI_FORMAT_NV11',
    'DXGI_FORMAT_AI44',
    'DXGI_FORMAT_IA44',
    'DXGI_FORMAT_P8',
    'DXGI_FORMAT_A8P8',
    'DXGI_FORMAT_B4G4R4A4_UNORM',
    'DXGI_FORMAT_P208',
    'DXGI_FORMAT_V208',
    'DXGI_FORMAT_V408',
];

const bpp = [
    0, 128, 128, 128, 128, 96, 96, 96, 96, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64,
    64, 64, 64, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32,
    32, 32, 32, 32, 32, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 8, 8, 8, 8, 8, 8, 1,
    32, 32, 32, 4, 4, 4, 8, 8, 8, 8, 8, 8, 4, 4, 4, 8, 8, 8, 16, 16, 32, 32, 32, 32, 32, 32,
    32, 8, 8, 8, 8, 8, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16
];

function align(number, alignment) {
    const remainder = number % alignment;
    if (remainder === 0) {
        return number; // Already divisible by alignment
    }
    const difference = alignment - remainder;
    const aligned = number + difference;
    return aligned;
}

async function convertRawTextureAsync(textureFilePath, ddsFilePath, textureData) {
    const textureFormat = textureFormats[textureData.eTexFormat];
    if (!textureFormat) {
        logger.error(`Unknown texture format ${textureData.eTexFormat}`);
        return;
    }

    const index = ddDXGI.indexOf(textureFormat.DXGI);
    if (index === -1) {
        logger.error(`Unknown texture DXGI ${textureData.eTexFormat}`);
        return;
    }

    const width = align(textureData.dwWidth, textureFormat.Alignment);
    const height = textureData.dwHeight;

    const input = fs.readFileSync(textureFilePath);

    let fourCC = 808540228; // DX10

    if (index === 71) {
        fourCC = 827611204; // DXT1
    }
    if (index === 74) {
        fourCC = 861165636; // DXT3
    }
    if (index === 77) {
        fourCC = 894720068; // DXT5
    }
    if (index === 80) {
        fourCC = 826889281; // ATI1
    }
    if (index === 83) {
        fourCC = 843666497; // ATI2
    }

    const count = (width * height * bpp[index]) / 8;

    const header = Buffer.alloc(fourCC === 808540228 ? 148 : 128); // DX10 uses an extended header

    header.write('DDS ', 0, 4, 'ascii'); // magic

    header.writeUInt32LE(124, 4); // size
    header.writeUInt32LE(0x1 | 0x2 | 0x4 | 0x1000, 8); // flags
    header.writeUInt32LE(height, 12); // height
    header.writeUInt32LE(width, 16); // width
    header.writeUInt32LE(count, 20); // pitch or linear size

    // rest of header structure...

    header.writeUInt32LE(32, 76); // ddspf size
    header.writeUInt32LE(4, 80); // ddspf flags
    header.writeUInt32LE(fourCC, 84); // ddspf fourCC

    if (fourCC === 808540228) { // DX10 header
        header.writeUInt32LE(index, 128); // DXGI
        header.writeUInt32LE(3, 132); // resource dimension
        header.writeUInt32LE(0, 136); // misc flag
        header.writeUInt32LE(1, 140); // array size
        header.writeUInt32LE(0, 144); // misc flag 2
    }

    const outputFileBuffer = Buffer.concat([header, input]);

    await writeFile(ddsFilePath, outputFileBuffer);
}


module.exports = convertRawTextureAsync;