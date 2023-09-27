import { Unauthorized } from "@/components/unauthorized/unauthorized";

const UnauthorizedPage = () => {
  return (
    <div className="flex flex-col w-full h-full  ">
      <Unauthorized />
    </div>
  );
};

export default UnauthorizedPage;
