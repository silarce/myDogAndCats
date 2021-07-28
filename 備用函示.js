// 將該資料夾所有圖片import進來，並組成物件
let images = {};
function importAllImagesWithObject(theRequireContext) {
    const requireContext = theRequireContext;
    requireContext.keys().map((item) => { images[item.replace('./', '')] = requireContext(item).default });
    return images;
}
images = importAllImagesWithObject(require.context("../../img/Mina_img", false, /^\.\/.*\.jpg$/));