interface AvatarProps {
  name: string;
  size?: number;
}

export const Avatar = ({ name, size = 32 }: AvatarProps) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div
      className="bg-blue-500 text-white flex items-center justify-center rounded-full font-bold"
      style={{ width: size, height: size, fontSize: size / 2 }}
    >
      {initials}
    </div>
  );
};
