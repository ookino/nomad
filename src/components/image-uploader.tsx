"use client";

import React, { useEffect, useRef, useState } from "react";
import * as LR from "@uploadcare/blocks";
import { PACKAGE_VERSION } from "@uploadcare/blocks";
import { OutputFileEntry } from "@uploadcare/blocks";

LR.registerBlocks(LR);

interface Props {
  onChange: (value: string[]) => void;
  value: string[];
}
function ImageUploader({ onChange, value }: Props) {
  const [files, setFiles] = useState<OutputFileEntry<"success">[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ctxProviderRef = useRef<any | null>(null);

  const urls = files.map((file) => file.cdnUrl);

  useEffect(() => {
    const ctxProvider = ctxProviderRef.current;
    if (!ctxProvider) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleChangeEvent = (event: any) => {
      const array = [
        ...event.detail.allEntries.filter(
          (file: { status: string }) => file.status === "success"
        ),
      ];
      setFiles(array);
      const urls = array.map((file) => file.cdnUrl);

      onChange(urls as string[]);
    };

    ctxProvider.addEventListener("change", handleChangeEvent);

    return () => {
      ctxProvider.removeEventListener("change", handleChangeEvent);
    };
  }, [value, files, onChange]);

  return (
    <div>
      {/* @ts-expect-error --  error from upload care */}

      <lr-config
        ctx-name="my-uploader"
        pubkey={"6fa58c210368c1da0581"}
        imgOnly={true}
        maxLocalFileSizeBytes={10000000}
        multiple-max="4"
      />
      {/* @ts-expect-error --  error from upload care */}
      <lr-file-uploader-minimal
        ctx-name="my-uploader"
        css-src={`https://cdn.jsdelivr.net/npm/@uploadcare/blocks@${PACKAGE_VERSION}/web/lr-file-uploader-minimal.min.css`}
      />
      {/* @ts-expect-error --  error from upload care */}
      <lr-upload-ctx-provider ctx-name="my-uploader" ref={ctxProviderRef} />
    </div>
  );
}

export default ImageUploader;
