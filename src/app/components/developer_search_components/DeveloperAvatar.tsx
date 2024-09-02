import React, { useState } from 'react';
import Image from 'next/image';

interface DeveloperAvatarProps {
  login: string;
  avatarUrl: string;
}

const DeveloperAvatar: React.FC<DeveloperAvatarProps> = ({ login, avatarUrl }) => {
  const [imgSrc, setImgSrc] = useState(avatarUrl);
  const [isError, setIsError] = useState(false);

  const handleError = () => {
    if (!isError) {
      setIsError(true);
      setImgSrc(`https://ui-avatars.com/api/?name=${encodeURIComponent(login)}&size=64&background=random`);
    }
  };

  return (
    <div className="w-16 h-16 relative">
      <Image
        src={imgSrc}
        alt={`${login}'s avatar`}
        layout="fill"
        objectFit="cover"
        className="rounded-full"
        onError={handleError}
      />
    </div>
  );
};

export default DeveloperAvatar;