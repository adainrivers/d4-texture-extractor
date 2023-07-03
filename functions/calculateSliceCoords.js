function calculateSliceCoords(ptFrame, imageWidth, imageHeight) {
    const calculatedCoordinates = [];
  
    for (let i = 0; i < ptFrame.length; i++) {
      const data = ptFrame[i];
  
      const x0 = Math.floor(data.flU0 * imageWidth);
      const y0 = Math.floor(data.flV0 * imageHeight);
      const x1 = Math.ceil(data.flU1 * imageWidth);
      const y1 = Math.ceil(data.flV1 * imageHeight);
  
      calculatedCoordinates.push({
        hImageHandle: data.hImageHandle,
        x0,
        y0,
        x1,
        y1,
      });
    }
  
    return calculatedCoordinates;
  }

    module.exports = calculateSliceCoords;