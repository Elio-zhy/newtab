/**
 * convert url to dataurl
 * @param {String} url url to fetch
 */
export const urlToDataUrl = async function (url) {
    let blob = await fetch(url).then(r => r.blob());
    let dataUrl = await new Promise(resolve => {
        let reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(blob);
    });
    return dataUrl;
};