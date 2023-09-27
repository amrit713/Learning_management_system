import Image from "next/image";

export const UnauthorizedLogo = () => {
  return (
    <Image
      width={720}
      height={720}
      className="object-covers"
      src="/unauthorized.svg"
      alt="Unauthorized"
    />
  );
};
