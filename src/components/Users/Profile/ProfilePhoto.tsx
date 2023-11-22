import React, { useState } from "react";
import { useMutatingFetch } from "~/lib/hooks/useMutatingFetch";
import { useEdgeStore } from "~/lib/edgestore";
import { SingleImageDropzone } from "~/components/ui/SingleImageDropzone";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { ImagePlus } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "~/components/ui/avatar";
import { toast } from "react-hot-toast";
import { Button } from "~/components/ui/button";
import { Progress } from "~/components/ui/progress";

type ProfilePhotoProps = {
  userId: string;
  photo: string | undefined;
};

const ProfilePhoto = ({ userId, photo }: ProfilePhotoProps) => {
  const [file, setFile] = useState<File>();
  const [fileUrl, setFileUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const { edgestore } = useEdgeStore();
  const { doFetch } = useMutatingFetch();

  return (
    <Dialog>
      <DialogTrigger>
        <Avatar
          className={`${
            !photo ? "" : "avatar-edit-hover"
          } relative h-[90px] w-[90px]`}
        >
          <AvatarImage src={photo ? photo : ""} />
          <AvatarFallback>
            <ImagePlus />
          </AvatarFallback>
        </Avatar>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit profile photo</DialogTitle>
          <DialogDescription>Upload a photo.</DialogDescription>
        </DialogHeader>
        <SingleImageDropzone
          height={360}
          value={file ? file : photo}
          onChange={(file) => {
            setFile(file);
          }}
        />
        <Button
          onClick={async () => {
            try {
              let uploadedImageUrl = fileUrl;
              if (file) {
                const replaceTargetUrl = photo ? photo : null;
                const res = await edgestore.publicFiles.upload({
                  file,
                  options: replaceTargetUrl ? { replaceTargetUrl } : {},
                  onProgressChange: (progress) => {
                    setProgress(progress);
                  },
                });
                uploadedImageUrl = res.url;
              }

              if (uploadedImageUrl) {
                await doFetch(
                  "/api/user/edit",
                  {
                    method: "PATCH",
                    body: JSON.stringify({
                      id: userId,
                      fileUrl: uploadedImageUrl,
                    }),
                    headers: {
                      "Content-Type": "application/json",
                    },
                  },
                  () => {
                    toast.success(`Profile photo successfully edited`);
                  },
                );
              }
            } catch (error) {
              console.error("Error updating profile photo:", error);
              toast.error("Failed to update profile photo");
            }
          }}
        >
          Save
        </Button>
        {progress > 0 && progress < 100 ? <Progress value={progress} /> : null}
      </DialogContent>
    </Dialog>
  );
};

export default ProfilePhoto;
