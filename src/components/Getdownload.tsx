
export const GetMineType = (extension:any) => {
    switch (extension.toLowerCase()) {

        case "csv": return "text/csv";
        case "cur": return "application/octet-stream";
        case "cxx": return "text/plain";
        case "dat": return "application/octet-stream";
        case "datasource": return "application/xml";
        case "dbproj": return "text/plain";
        case "dcr": return "application/x-director";
        case "docx": return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
        case "dot": return "application/msword";
        case "jpb": return "application/octet-stream";
        case "jpe": return "image/jpeg";
        case "jpeg": return "image/jpeg";
        case "jpg": return "image/jpeg";
        case "pdf": return "application/pdf";
    }
}
function downloadBlob(blob:any, filename:string, ext:string) {
    // Create an object URL for the blob object
    console.info(GetMineType(ext));  
    blob=new Blob([blob.files], { type: `${GetMineType(ext)}` })
    const url = URL.createObjectURL(blob);

    // Create a new anchor element
    const a = document.createElement('a');
    // var blob = new Blob([filesdata], {type: 'application/pdf'});
    // a.href= window.URL.createObjectURL(blob)
    // $('a').attr("href", window.URL.createObjectURL(blob));
    // $('a').attr("download", "woeii.txt");
    // Set the href and download attributes for the anchor element
    // You can optionally set other attributes like `title`, etc
    // Especially, if the anchor element will be attached to the DOM
    a.href = url;
    a.download = filename || 'download.pdf';

    // Click handler that releases the object URL after the element has been clicked
    // This is required for one-off downloads of the blob content
    a.click();
    // window.location.href = url;

    // Dispatch click event on the link
    // This is necessary as link.click() does not work on the latest firefox
   
}

//for mime type you can also use any package


export default downloadBlob;