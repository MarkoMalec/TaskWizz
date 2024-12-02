// "use client";

// import { useState, useEffect } from "react";
// import dynamic from "next/dynamic";
// import Uppy, { Body, Meta, UppyFile } from "@uppy/core";
// import Xhr from "@uppy/xhr-upload";
// import { useMutatingFetch } from "~/lib/hooks/useMutatingFetch";
// import "@uppy/core/dist/style.min.css";
// import "@uppy/dashboard/dist/style.min.css";

// // Dynamically import Dashboard with client-side rendering
// const Dashboard = dynamic(
//   () => import("@uppy/react").then((mod) => mod.Dashboard),
//   {
//     ssr: false,
//   },
// );

// const PdfUploader = ({ taskId }: { taskId: string }) => {
//   const { doFetch } = useMutatingFetch();

//   function createUppy() {
//     return new Uppy<Meta, Body>({
//       restrictions: {
//         maxNumberOfFiles: 4,
//         allowedFileTypes: [".pdf", ".docx"],
//       },
//       autoProceed: false,
//     }).use(Xhr, {
//       endpoint: "http://malec.ddns.net:1234/multiple-upload/pdfs",
//       fieldName: "files[]",
//       bundle: true,
//     });
//   }

//   const [uppy] = useState(createUppy);
//   const [stateFiles, setStateFiles] = useState({});

//   useEffect(() => {
//     const filesAddedHandler = (files: any) => {
//       console.log("File uploading", files);
//       setStateFiles(uppy.getState().files);
//     };

//     const uploadSuccessHandler = async () => {
//       const fileUrls = Object.values(stateFiles)
//         .map((file: any) => `/pdfs/${file.name}`)
//         .join("|||");

//       await doFetch("/api/task/edit", {
//         method: "PATCH",
//         body: JSON.stringify({
//           id: taskId,
//           contractFileUrl: fileUrls,
//         }),
//       });
//     };

//     // Event listeners
//     uppy.on("files-added", filesAddedHandler);
//     uppy.on("upload-success", uploadSuccessHandler);

//     // Cleanup function
//     return () => {
//       // Remove event listeners
//       uppy.off("files-added", filesAddedHandler);
//       uppy.off("upload-success", uploadSuccessHandler);
//     };
//   }, [uppy, taskId, stateFiles]);

//   return (
//     <Dashboard
//       theme="dark"
//       uppy={uppy}
//       width={200}
//       height={280}
//       proudlyDisplayPoweredByUppy={false}
//     />
//   );
// };

// export default PdfUploader;

"use client";
import { useState, useEffect } from "react";
import Uppy, { Body, Meta } from "@uppy/core";
import Xhr from "@uppy/xhr-upload";
import { useMutatingFetch } from "~/lib/hooks/useMutatingFetch";
import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";
import { Card, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { FileUp, FileText, Trash2 } from "lucide-react";

const PdfUploader = ({ taskId }: { taskId: string }) => {
  const { doFetch } = useMutatingFetch();
  
  function createUppy() {
    return new Uppy<Meta, Body>({
      restrictions: {
        maxNumberOfFiles: 4,
        allowedFileTypes: [".pdf", ".docx"],
      },
      autoProceed: false,
    }).use(Xhr, {
      endpoint: "http://malec.ddns.net:1234/multiple-upload/pdfs",
      fieldName: "files[]",
      bundle: true,
    });
  }
  
  const [uppy] = useState(createUppy);
  const [stateFiles, setStateFiles] = useState<Record<string, any>>({});
  
  useEffect(() => {
    const filesAddedHandler = (files: any) => {
      console.log("File uploading", files);
      setStateFiles(uppy.getState().files);
    };
    
    const uploadSuccessHandler = async () => {
      const fileUrls = Object.values(stateFiles)
        .map((file: any) => `/pdfs/${file.name}`)
        .join("|||");
      
      await doFetch("/api/task/edit", {
        method: "PATCH",
        body: JSON.stringify({
          id: taskId,
          contractFileUrl: fileUrls,
        }),
      });
    };
    
    // Event listeners
    uppy.on("files-added", filesAddedHandler);
    uppy.on("upload-success", uploadSuccessHandler);
    
    // Cleanup function
    return () => {
      // Remove event listeners
      uppy.off("files-added", filesAddedHandler);
      uppy.off("upload-success", uploadSuccessHandler);
    };
  }, [uppy, taskId, stateFiles]);
  
  const handleFileSelect = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.docx';
    input.multiple = true;
    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files) {
        Array.from(files).forEach(file => {
          uppy.addFile({
            source: 'Local',
            name: file.name,
            type: file.type,
            data: file
          });
        });
      }
    };
    input.click();
  };
  
  const handleUpload = () => {
    uppy.upload();
  };
  
  const handleRemoveFile = (fileId: string) => {
    uppy.removeFile(fileId);
    const newFiles = { ...stateFiles };
    delete newFiles[fileId];
    setStateFiles(newFiles);
  };
  
  return (
    <Card className="w-full max-w-md mt-4">
      <CardContent className="p-0 shadow-none space-y-4">
        <div className="border border-dashed border-gray-300 rounded-lg p-4 text-center">
          {Object.keys(stateFiles).length === 0 ? (
            <div className="flex flex-col items-center justify-center space-y-2">
              <FileUp className="h-12 w-12 text-gray-400" />
              <p className="text-sm text-gray-600">
                Drag and drop your PDFs or DOCX files here
              </p>
              <Button 
                variant="outline" 
                onClick={handleFileSelect}
                className="mt-2"
              >
                Select Files
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              {Object.values(stateFiles).map((file: any) => (
                <div 
                  key={file.id} 
                  className="flex items-center justify-between bg-secondary p-2 rounded"
                >
                  <div className="flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <span className="text-sm line-clamp-1 text-left">{file.name}</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleRemoveFile(file.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              ))}
              <div className="flex justify-between mt-2">
                <Button 
                  variant="outline" 
                  onClick={handleFileSelect}
                >
                  Add More
                </Button>
                <Button 
                  onClick={handleUpload}
                  disabled={Object.keys(stateFiles).length === 0}
                >
                  Upload Files
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PdfUploader;
