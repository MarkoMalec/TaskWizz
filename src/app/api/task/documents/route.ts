import { prisma, handlePrismaError } from "~/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

async function getUniqueFileName(baseFileName: string): Promise<string> {
  // Function to extract the name and extension
  const getNameAndExtension = (fileName: string) => {
    const lastDotIndex = fileName.lastIndexOf('.');
    if (lastDotIndex === -1) return [fileName, ''];
    return [fileName.slice(0, lastDotIndex), fileName.slice(lastDotIndex)];
  };

  const [baseName, extension] = getNameAndExtension(baseFileName);
  
  // Check if file exists
  const existingFiles = await prisma.taskFiles.findMany({
    where: {
      url: {
        startsWith: `/pdfs/${baseName}`,
        endsWith: extension
      }
    }
  });

  if (existingFiles.length === 0) {
    return baseFileName;
  }

  // Find the highest number in parentheses
  let highestNum = 0;
  existingFiles.forEach(file => {
    const match = file.url.match(/\((\d+)\)\.[^.]+$/);
    if (match) {
      const num = parseInt(match[1]);
      if (num > highestNum) highestNum = num;
    }
  });

  // Return new filename with incremented number
  return `${baseName}(${highestNum + 1})${extension}`;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { taskId, fileNames } = await req.json();
    
    // Process each filename to ensure uniqueness
    const uniqueFileNames = await Promise.all(
      fileNames.map(async (fileName: string) => {
        const uniqueName = await getUniqueFileName(fileName);
        return {
          taskId: taskId,
          url: `/pdfs/${uniqueName}`,
        };
      })
    );

    const newFiles = await prisma.taskFiles.createMany({
      data: uniqueFileNames,
    });

    return NextResponse.json({
      status: 200,
      json: {
        files: newFiles,
        message: `Files uploaded successfully! ${newFiles}`,
      },
    });
  } catch (error) {
    handlePrismaError(error);
    return NextResponse.json({
      status: 500,
      json: {
        error: "Error uploading the files",
      },
    });
  }
}