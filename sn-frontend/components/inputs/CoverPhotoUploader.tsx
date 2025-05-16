'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import styles from './CoverPhotoUploader.module.css';
import { LuImage, LuTrash } from 'react-icons/lu';

interface Props {
  image: File | null;
  setImage: (file: File | null) => void;
}

const CoverPhotoUploader: React.FC<Props> = ({ setImage }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImage(null);
    setPreviewUrl(null);
  };

  return (
    <div className={styles.wrapper} onClick={() => inputRef.current?.click()}>
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className={styles.hiddenInput}
      />

      {!previewUrl ? (
        <div className={styles.placeholder}>
          <LuImage size={64} className={styles.icon} />
          <p className={styles.title}>Add Cover Photo</p>
        </div>
      ) : (
        <div className={styles.previewWrapper}>
          <Image
            src={previewUrl}
            alt="Cover Preview"
            fill
            className={styles.image}
            unoptimized
          />
          <button className={styles.removeButton} onClick={removeImage} type="button">
            <LuTrash size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default CoverPhotoUploader;
