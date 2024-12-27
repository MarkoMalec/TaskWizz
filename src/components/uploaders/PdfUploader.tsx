"use client";
import { useState, useEffect } from "react";
import Uppy, { Body, Meta } from "@uppy/core";
import Xhr from "@uppy/xhr-upload";
import { useMutatingFetch } from "~/lib/hooks/useMutatingFetch";
import { Card, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { FileUp, FileText, Trash2 } from "lucide-react";

import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";
import toast from "react-hot-toast";

const PdfUploader = ({ taskId }: { taskId: string }) => {
  const { doFetch } = useMutatingFetch();

  function createUppy() {
    return new Uppy<Meta, Body>({
      restrictions: {
        maxNumberOfFiles: 12,
        allowedFileTypes: [".pdf", ".docx"],
      },
      autoProceed: false,
    }).use(Xhr, {
      endpoint: "https://malec.ddns.net/multiple-upload/pdfs",
      fieldName: "files[]",
      bundle: true,
    });
  }

  const [uppy] = useState(createUppy);
  const [stateFiles, setStateFiles] = useState<Record<string, any>>({});
  const [progress, setProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState(false);
  const [theToast, setTheToast] = useState<any>();

  useEffect(() => {
    const filesAddedHandler = (files: any) => {
      console.log("Files uploading", files);
      setStateFiles(uppy.getState().files);
    };

    const uploadStartHandler = () => {
      setIsUploading(true);
      const loadingToast = toast.loading(
        <div className="h1 w-full rounded border">
          <div
            className="h-1 rounded bg-white transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>,
        {
          duration: 5000,
        },
      );
      setTheToast(loadingToast);
    };

    const uploadCompleteHandler = async (result: any) => {
      // Only proceed if we haven't already processed this upload
      if (!isUploading) return;

      const fileNames = Object.values(stateFiles).map((file: any) => file.name);

      doFetch("/api/task/documents", {
        method: "POST",
        body: JSON.stringify({
          taskId,
          fileNames,
        }),
      });

      toast.success("Files uploaded successfully!", { id: theToast });

      setProgress(0);
      setIsUploading(false);
    };

    // Event listeners
    uppy.on("files-added", filesAddedHandler);
    uppy.on("upload-start", uploadStartHandler);
    uppy.on("complete", uploadCompleteHandler);
    uppy.on("progress", (progress) => {
      setProgress(progress);
    });

    // Cleanup function
    return () => {
      uppy.off("files-added", filesAddedHandler);
      uppy.off("upload-start", uploadStartHandler);
      uppy.off("complete", uploadCompleteHandler);
    };
  }, [uppy, taskId, stateFiles, isUploading]);

  const handleFileSelect = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".pdf,.docx";
    input.multiple = true;
    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files) {
        Array.from(files).forEach((file) => {
          uppy.addFile({
            source: "Local",
            name: file.name,
            type: file.type,
            data: file,
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
    <Card className="mt-4 w-full max-w-md">
      <CardContent className="space-y-4 p-0 shadow-none">
        <div className="rounded-lg border border-dashed border-gray-300 p-4 text-center">
          {Object.keys(stateFiles).length === 0 ? (
            <div className="flex flex-col items-center justify-center space-y-2">
              <FileUp className="h-16 w-16 text-blue-600" />
              <span className="text-sm text-gray-600">
                Drag and drop your files here
              </span>
              <Button onClick={handleFileSelect}>Select Files</Button>
            </div>
          ) : (
            <div className="space-y-2">
              {Object.values(stateFiles).map((file: any) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between rounded bg-secondary p-2"
                >
                  <div className="flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <span className="line-clamp-1 text-left text-sm">
                      {file.name}
                    </span>
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
              {progress > 0 && (
                <div className="h1 w-full rounded border">
                  <div
                    className="h-1 rounded bg-white transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              )}
              <div className="mt-2 flex justify-between">
                <Button variant="outline" onClick={handleFileSelect}>
                  Add More
                </Button>
                <Button
                  onClick={handleUpload}
                  disabled={Object.keys(stateFiles).length === 0 || isUploading}
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
