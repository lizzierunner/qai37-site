"use client";

interface MemberAvatarProps {
  src: string;
  alt: string;
  initials: string;
}

export default function MemberAvatar({ src, alt, initials }: MemberAvatarProps) {
  return (
    <div className="avatar" data-initials={initials}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onError={(e) =>
          (e.currentTarget.parentElement as HTMLElement).classList.add("noimg")
        }
      />
    </div>
  );
}
