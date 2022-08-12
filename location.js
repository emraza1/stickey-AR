const { Package } = ARjsStudioBackend;

var githubButton = document.querySelector('page-footer').shadowRoot.querySelector('#github-publish');
var zipButton = document.querySelector('page-footer').shadowRoot.querySelector('#zip-publish');

window.locations = true;
window.assetParam = {
    scale: 1.0,
    size: {
        width: 1.0,
        height: 1.0,
        depth: 1.0,
    },
    locations: [
        // {
        //     latitude: 12.345678, // required for location based AR
        //     longitude: 12.345678 // required for location based AR
        // }
    ]
};

const checkUserUploadStatus = () => {
    enablePageFooter(window.assetParam.locations.length && window.assetFile);
};

// All the required components are uploaded by the user => footer will be enable
const enablePageFooter = (enable) => {
    if (enable) {
        githubButton.classList.remove('publish-disabled');
        zipButton.classList.remove('publish-disabled');
        githubButton.removeAttribute('disabled');
        zipButton.removeAttribute('disabled');
    } else {
        githubButton.classList.add('publish-disabled');
        zipButton.classList.add('publish-disabled');
        githubButton.setAttribute('disabled', '');
        zipButton.setAttribute('disabled', '');
    }
}

function base64ToBuffer(str){
    str = window.atob(str); // creates a ASCII string
    var buffer = new ArrayBuffer(str.length),
        view = new Uint8Array(buffer);
    for(var i = 0; i < str.length; i++){
        view[i] = str.charCodeAt(i);
    }
    return buffer;
}




const zip = () => {
    // TODO: replace alerts with HTML error messages.
    if (!window.assetParam.locations.length) return alert('please select a location');
    if (!window.assetType) return alert('please select the correct content type');
    if (!window.assetFile || !window.assetName) return alert('please upload a content');


    // create the package
    const package = new Package({
        arType: 'location',
        assetType: window.assetType, // image/audio/video/3d
        assetFile: window.assetFile,
        assetName: window.assetName,
        assetParam: window.assetParam
    });
    // console.log(package);

    package.serve({ packageType: 'zip' }).then((base64) => {
        const link = document.createElement('a');
        console.log(base64)
        link.href = `data:application/zip;base64,${base64}`;
        console.log(link.href)
        link.download = 'ar.zip';
        link.click();
    });


};

/**
 * Stores the session data and redirects to publish page.
 *
 * @param {event} event
 */
const publish = () => {
    // TODO: replace alerts with HTML error messages.

    if (!window.assetParam.locations.length) return alert('please select a location');
    if (!window.assetType) return alert('Please, select the correct content type.');
    if (!window.assetFile || !window.assetName) return alert('Please, upload a content.');

    window.name = JSON.stringify({
        arType: 'location',
        assetType: window.assetType, // image/audio/video/3d
        assetFile: window.assetFile,
        assetName: window.assetName,
        assetParam: window.assetParam,
    });

    window.location = 'pages/publish';

}

zipButton.addEventListener('click', zip);
githubButton.addEventListener('click', publish);
