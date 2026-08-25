"use client";

export default function TeamAvatar({ img, name, initials }: { img?: string; name: string; initials: string }) {
  return (
    <div className={`bio-photo${!img ? " noimg" : ""}`} data-initials={initials}>
      {img && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={img}
          alt={name}
          onError={(e) => (e.currentTarget.parentElement as HTMLElement).classList.add("noimg")}
        />
      )}
    </div>
  );
}
